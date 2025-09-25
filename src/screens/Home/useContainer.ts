import { useCallback, useState } from 'react';
import { HomeNavigation, IHomeProps } from './types';
import {
  deleteExpenseById,
  ExpenseItem,
  getExpenses,
} from '../../services/data';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { compareExpenseByCodeThenDate, normalizeStr } from '../../utils/format';

export const useContainer = (_: IHomeProps) => {
  const navigation = useNavigation<HomeNavigation>();
  const [loading, setLoading] = useState(false);
  const [allData, setAllData] = useState<ExpenseItem[]>([]);
  const [data, setData] = useState<ExpenseItem[]>([]);
  const [search, setSearch] = useState('');
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [pendingId, setPendingId] = useState<string>('');
  const [pendingItem, setPendingItem] = useState<ExpenseItem | null>(null);

  const onCancel = () => {
    setConfirmVisible(false);
  };

  const openConfirm = useCallback(
    (id: string) => {
      setPendingId(id);

      const found =
        data.find(i => i.id === id) ?? allData.find(i => i.id === id) ?? null;
      setPendingItem(found);
      setConfirmVisible(true);
    },
    [allData, data],
  );

  const onConfirm = useCallback(async () => {
    if (!pendingId) return;
    setLoading(true);
    try {
      await deleteExpenseById(pendingId);
      setAllData(prev => prev.filter(item => item.id !== pendingId));
      setData(prev => prev.filter(item => item.id !== pendingId));
    } finally {
      setLoading(false);
      setConfirmVisible(false);
      setPendingId('');
    }
  }, [pendingId]);

  const applyFilter = useCallback((list: ExpenseItem[], query: string) => {
    const q = normalizeStr(query);
    if (!q) return list;
    return list.filter(item => {
      const byCode = normalizeStr(item.code).includes(q);
      const byName = normalizeStr(item.name).includes(q);
      return byCode || byName;
    });
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const list = await getExpenses();
      const sorted = [...list].sort(compareExpenseByCodeThenDate);
      setAllData(sorted);
      setData(applyFilter(sorted, search));
    } finally {
      setLoading(false);
    }
  }, [applyFilter, search]);

  const onSearchChange = useCallback(
    (text: string) => {
      setSearch(text);
      setData(() => {
        return applyFilter(allData, text);
      });
    },
    [allData, applyFilter],
  );

  const handleDelete = useCallback(async (id: string) => {
    setLoading(true);
    try {
      await deleteExpenseById(id);
      setAllData(prev => prev.filter(item => item.id !== id));
      setData(prev => prev.filter(item => item.id !== id));
    } finally {
      setLoading(false);
    }
  }, []);

  const handleNavigateToDetail = (expense: ExpenseItem) => {
    navigation.navigate('DetailExpense', { expense });
  };

  const pendingLabel = pendingItem
    ? `${pendingItem.code} - ${pendingItem.name}?`
    : '';

  useFocusEffect(
    useCallback(() => {
      load();
      return () => {};
    }, [load]),
  );

  return {
    handleNavigateToDetail,
    handleDelete,
    onSearchChange,
    navigation,
    search,
    data,
    loading,
    load,
    onCancel,
    confirmVisible,
    onConfirm,
    openConfirm,
    pendingLabel,
  };
};
