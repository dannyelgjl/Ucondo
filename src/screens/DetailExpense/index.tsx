import React from 'react';
import { Header } from '../../components';
import * as S from './styles';
import { formatPtBrFortaleza } from '../../utils/format';
import { useContainer } from './useContainer';
import { IDetailExpenseProps } from './types';

const DetailExpense = (props: IDetailExpenseProps) => {
  const { expense, navigation } = useContainer(props);

  if (!expense) {
    return (
      <S.Container>
        <Header title="Detalhas da Conta" onPress={() => navigation.goBack()} />
        <S.Content>
          <S.Title>Conta não encontrada.</S.Title>
        </S.Content>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <Header title="Detalhas da Conta" onPress={() => navigation.goBack()} />
      <S.Content>
        <S.Title>Detalhes</S.Title>

        <S.Label>
          <S.LabelBold>ID:</S.LabelBold>
          {expense.id}
        </S.Label>

        <S.Label>
          <S.LabelBold>Conta Pai:</S.LabelBold> {expense.code} - {expense.name}
        </S.Label>

        <S.Label>
          <S.LabelBold>Nome: </S.LabelBold>
          {expense.name}
        </S.Label>

        <S.Label>
          <S.LabelBold>Tipo:</S.LabelBold> {expense.type}
        </S.Label>

        <S.Label>
          <S.LabelBold>Aceita lançamentos:</S.LabelBold>{' '}
          {expense.acceptsReleases}
        </S.Label>

        <S.Label>
          <S.LabelBold>Hora/Data:</S.LabelBold>{' '}
          {formatPtBrFortaleza(expense.createdAt)}
        </S.Label>
      </S.Content>
    </S.Container>
  );
};

export default DetailExpense;
