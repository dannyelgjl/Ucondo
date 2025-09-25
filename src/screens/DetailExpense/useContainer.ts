import { IDetailExpenseProps, DetailExpenseRoute } from './types';
import { useNavigation, useRoute } from '@react-navigation/native';

export const useContainer = (_: IDetailExpenseProps) => {
  const navigation = useNavigation();
  const route = useRoute<DetailExpenseRoute>();
  const expense = route.params?.expense;

  return { navigation, expense };
};
