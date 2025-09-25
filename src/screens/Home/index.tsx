import React from 'react';
import { FlatList, Text, View, RefreshControl } from 'react-native';

import { ExpenseList, Header } from '../../components';
import * as S from './styles';
import { ETypeIcon } from '../../components/Icon/types';
import { useContainer } from './useContainer';
import { IHomeProps } from './types';

const Home = (props: IHomeProps) => {
  const {
    handleDelete,
    handleNavigateToDetail,
    onSearchChange,
    navigation,
    search,
    data,
    loading,
    load,
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
              onDelete={() => handleDelete(item.id)}
              onPress={() => handleNavigateToDetail(item)}
            />
          )}
          contentContainerStyle={{ paddingBottom: 24 }}
          ListEmptyComponent={
            <View style={{ padding: 24 }}>
              <Text>
                {search ? 'Nenhum resultado.' : 'Nenhum lançamento salvo.'}
              </Text>
            </View>
          }
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={load} />
          }
        />
      </S.Content>
    </S.Container>
  );
};

export default Home;
