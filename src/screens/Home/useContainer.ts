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

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load]),
  );

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

  return {
    handleNavigateToDetail,
    handleDelete,
    onSearchChange,
    navigation,
    search,
    data,
    loading,
    load,
  };
};
