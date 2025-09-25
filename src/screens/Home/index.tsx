import React from 'react';
import { FlatList, RefreshControl } from 'react-native';

import { ExpenseList, Header, Modal } from '../../components';
import * as S from './styles';
import { ETypeIcon } from '../../components/Icon/types';
import { useContainer } from './useContainer';
import { IHomeProps } from './types';

const Home = (props: IHomeProps) => {
  const {
    handleNavigateToDetail,
    onSearchChange,
    navigation,
    search,
    data,
    loading,
    load,
    onCancel,
    openConfirm,
    confirmVisible,
    onConfirm,
    pendingLabel,
  } = useContainer(props);
  return (
    <S.Container>
      <Header
        title="Plano de Contas"
        iconType={ETypeIcon.ICON_PLUS}
        onRegister={() => navigation.navigate('EnterExpenses')}
        showInput
        onChangeText={onSearchChange}
        value={search}
      />

      <S.Content>
        <S.Title>Listagem</S.Title>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <ExpenseList
              item={item}
              onDelete={() => openConfirm(item.id)}
              onPress={() => handleNavigateToDetail(item)}
            />
          )}
          contentContainerStyle={{ paddingBottom: 24 }}
          ListEmptyComponent={
            <S.NotFound>
              <S.NotFoundLabel>
                {search ? 'Nenhum resultado.' : 'Nenhum lançamento salvo.'}
              </S.NotFoundLabel>
            </S.NotFound>
          }
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={load} />
          }
        />
      </S.Content>

      <Modal
        visible={confirmVisible}
        title="Deseja excluir a conta"
        message={pendingLabel}
        confirmText="Com certeza"
        cancelText="Não!"
        loading={loading}
        onCancel={onCancel}
        onConfirm={onConfirm}
      />
    </S.Container>
  );
};

export default Home;
