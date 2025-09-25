import React from 'react';
import { Input, Select, Header } from '../../components';
import * as S from './styles';
import { ETypeIcon } from '../../components/Icon/types';
import { IEnterExpensesProps } from './types';
import { useContainer } from './useContainer';

const EnterExpenses = (props: IEnterExpensesProps) => {
  const {
    OPTIONS,
    OPTIONS_TYPE,
    handleSaveAndNavigate,
    handleSelectParent,
    isDuplicateCode,
    navigation,
    onChangeCode,
    onChangeName,
    optionsAccounts,
    selectedParent,
    typedCode,
    codeTouched,
    codeError,
    typedName,
    selectType,
    setSelectType,
    selectReleases,
    setSelectReleases,
  } = useContainer(props);

  return (
    <S.Container>
      <Header
        title="Inserir Conta"
        iconType={ETypeIcon.ICON_DONE}
        onPress={() => navigation.navigate('Home')}
        onRegister={handleSaveAndNavigate}
      />
      <S.Content>
        <Select
          label="Conta pai"
          options={optionsAccounts}
          value={selectedParent}
          onChange={handleSelectParent}
          placeholder="Selecione a conta"
          mt={12}
          mb={12}
        />

        <Input
          label="Código"
          placeholder="Adicione um código (ex.: 2.1.3)"
          keyboardType="default"
          value={typedCode}
          onChangeText={onChangeCode}
          mt={8}
          mb={4}
          error={codeTouched && (!!codeError || isDuplicateCode)}
          errorMessage={
            codeTouched
              ? codeError ||
                (isDuplicateCode ? 'Este código já existe.' : undefined)
              : undefined
          }
        />

        <Input
          label="Nome"
          placeholder="Adicione o Nome"
          mt={8}
          mb={12}
          onChangeText={onChangeName}
          value={typedName}
        />

        <Select
          label="Tipo"
          options={OPTIONS_TYPE}
          value={selectType}
          onChange={setSelectType}
          placeholder="Selecione o tipo"
          mt={8}
          mb={12}
        />

        <Select
          label="Aceita lançamentos"
          options={OPTIONS}
          value={selectReleases}
          onChange={setSelectReleases}
          placeholder="Selecione se aceita lançamento"
          mt={8}
          mb={12}
        />
      </S.Content>
    </S.Container>
  );
};

export default EnterExpenses;
