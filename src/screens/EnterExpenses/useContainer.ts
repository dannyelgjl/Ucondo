import { useCallback, useMemo, useState } from 'react';
import { IEnterExpensesProps, EnterExpensesNavigation } from './types';
import { ACCOUNTS, addExpense, ExpenseItem } from '../../services/data';
import {
  SEG_MAX,
  suggestNextChildWithBubble,
  toSegments,
} from '../../utils/chartOfAccounts';
import { useNavigation } from '@react-navigation/native';

import { normalizeCode } from '../../utils/format';
import { Alert } from 'react-native';

export const useContainer = (_: IEnterExpensesProps) => {
  const OPTIONS = [
    { label: 'Sim', value: 'sim' },
    { label: 'Não', value: 'nao' },
  ];

  const OPTIONS_TYPE = [
    { label: 'Receita', value: 'receita' },
    { label: 'Despesa', value: 'despesa' },
  ];

  const navigation = useNavigation<EnterExpensesNavigation>();

  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);
  const [selectType, setSelectType] = useState<string>('');
  const [selectReleases, setSelectReleases] = useState<string>('');
  const [selectedCode, setSelectedCode] = useState<string>('');
  const [selectedParent, setSelectedParent] = useState<string>('');
  const [typedCode, setTypedCode] = useState<string>('');
  const [typedName, setTypedName] = useState('');
  const [codeTouched, setCodeTouched] = useState<boolean>(false);
  const [codeError, setCodeError] = useState('');
  const [parentError, setParentError] = useState('');

  const getSegmentOverflowError = (code: string) => {
    if (!code) return '';
    const segs = toSegments(code);
    if (segs.some(n => !Number.isFinite(n))) return 'Código inválido.';
    if (segs.some(n => n > SEG_MAX))
      return `Cada segmento deve ser ≤ ${SEG_MAX}.`;
    return '';
  };

  const allCodesSet = useMemo(() => {
    const s = new Set<string>();
    ACCOUNTS.forEach(a => s.add(a.code));
    expenses.forEach(e => s.add(e.code));
    return s;
  }, [expenses]);

  const parentAcceptsReleases = useCallback(
    (code: string): boolean => {
      const found = expenses.find(e => e.code === code);
      return found?.acceptsReleases === 'sim';
    },
    [expenses],
  );

  const resolveParentType = useCallback(
    (parentCode: string, expenses: ExpenseItem[]) => {
      const created = expenses.find(e => e.code === parentCode);
      return (created?.type ?? inferTypeFromTopLevel(parentCode)) as
        | 'receita'
        | 'despesa'
        | '';
    },
    [],
  );

  const inferTypeFromTopLevel = (code: string): 'receita' | 'despesa' | '' => {
    const top = Number((code || '').split('.')[0]);
    if ([1, 4].includes(top)) return 'receita';
    if ([2, 3].includes(top)) return 'despesa';
    return '';
  };

  const handleSelectParent = useCallback(
    (parentCode: string) => {
      if (parentAcceptsReleases(parentCode)) {
        Alert.alert(
          'Atenção',
          'Esta conta aceita lançamentos e não pode ter filhas.',
        );
        setParentError('Esta conta aceita lançamentos e não pode ter filhas.'); // +++
        setSelectedParent('');
        setTypedCode('');
        return;
      }

      setParentError('');

      const result = suggestNextChildWithBubble(parentCode, allCodesSet);
      if (!result) {
        Alert.alert(
          'Sem espaço disponível',
          'Não há mais códigos disponíveis para este plano (segmento 999 atingido na raiz).',
        );
        setSelectedParent('');
        setTypedCode('');
        return;
      }

      const { parent, bubbled } = result;
      if (bubbled && parent !== parentCode) {
        Alert.alert(
          'Pai ajustado',
          `O pai foi ajustado para “${parent}” para sugerir um código válido.`,
        );
      }

      const parentType = resolveParentType(parentCode, expenses);
      setSelectType(parentType);
      setSelectedParent(result.parent);
      setTypedCode(result.suggestion);

      if (!codeTouched) setCodeTouched(true);

      const acc = ACCOUNTS.find(a => a.code === parentCode);
      setTypedName(acc?.name ?? '');
    },
    [
      allCodesSet,
      codeTouched,
      parentAcceptsReleases,
      expenses,
      resolveParentType,
    ],
  );

  const isDuplicateCode = useMemo(
    () => codeTouched && !!typedCode && allCodesSet.has(typedCode),
    [codeTouched, typedCode, allCodesSet],
  );

  const validate = useCallback(() => {
    if (!selectedParent) return 'Selecione a conta pai.';
    if (parentAcceptsReleases(selectedParent))
      return 'O pai selecionado aceita lançamentos e não pode ter filhas.';
    if (!typedCode) return 'Informe o código.';
    if (!typedName.trim()) return 'Informe o nome.';
    if (!selectType) return 'Selecione o tipo.';
    if (!selectReleases) return 'Informe se aceita lançamentos.';

    if (allCodesSet.has(typedCode))
      return 'Este código já existe. Escolha outro.';

    const segErr = getSegmentOverflowError(typedCode);
    if (segErr) return segErr;

    return '';
  }, [
    selectedParent,
    typedCode,
    typedName,
    selectType,
    selectReleases,
    parentAcceptsReleases,
    allCodesSet,
  ]);

  const onChangeName = useCallback((text: string) => {
    setTypedName(text);
  }, []);

  const handleSaveAndNavigate = useCallback(async () => {
    const error = validate();
    if (error) {
      Alert.alert('Atenção', error);
      return;
    }

    const item: ExpenseItem = {
      id: String(Date.now()),
      code: typedCode,
      name: typedName.trim(),
      type: selectType as 'receita' | 'despesa',
      acceptsReleases: selectReleases as 'sim' | 'nao',
      createdAt: new Date().toISOString(),
    };

    try {
      await addExpense(item);
      navigation.navigate('Home');
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível salvar. Tente novamente.');
    }
  }, [validate, typedCode, typedName, selectType, selectReleases, navigation]);

  const onChangeCode = useCallback(
    (text: string) => {
      const normalized = normalizeCode(text);
      setTypedCode(normalized);
      if (!codeTouched) setCodeTouched(true);

      const segErr = getSegmentOverflowError(normalized);
      setCodeError(segErr);
    },
    [codeTouched],
  );

  const optionsAccounts = useMemo(() => {
    const created = expenses.map(e => ({ code: e.code, name: e.name }));
    const map = new Map<string, string>();
    [...ACCOUNTS, ...created].forEach(acc => map.set(acc.code, acc.name));
    return Array.from(map.entries())
      .map(([code, name]) => ({ code, name }))
      .sort((a, b) => {
        const A = toSegments(a.code),
          B = toSegments(b.code);
        const len = Math.max(A.length, B.length);
        for (let i = 0; i < len; i++) {
          const ai = A[i] ?? -1,
            bi = B[i] ?? -1;
          if (ai !== bi) return ai - bi;
        }
        return 0;
      })
      .map(acc => ({ label: `${acc.code} - ${acc.name}`, value: acc.code }));
  }, [expenses]);

  return {
    OPTIONS,
    OPTIONS_TYPE,
    navigation,
    optionsAccounts,
    onChangeCode,
    handleSaveAndNavigate,
    onChangeName,
    isDuplicateCode,
    handleSelectParent,
    selectedParent,
    typedCode,
    codeTouched,
    codeError,
    typedName,
    selectType,
    setSelectType,
    selectReleases,
    setSelectReleases,
  };
};
