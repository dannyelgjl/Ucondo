import React from 'react';
import * as S from './styles';
import { IInputProfileProps } from './types';
import { Icon } from '../Icon';

const InputProfile = ({
  label,
  value,
  onChangeText,
  placeholder,
  icon,
  multiline,
  numberOfLines,
  keyboardType,
  error = false,
  errorMessage,
  editable,
  mb,
  mt,
}: IInputProfileProps) => {
  return (
    <S.InputContainer mb={mb} mt={mt}>
      {label && <S.Label>{label}</S.Label>}
      <S.ContainerTextInput isError={error}>
        <S.StyledTextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          multiline={multiline}
          numberOfLines={numberOfLines}
          multi={multiline}
          keyboardType={keyboardType}
          editable={editable}
        />

        {icon && <Icon icon={icon} size={24} />}
      </S.ContainerTextInput>

      {!!error && !!errorMessage && <S.ErrorText>{errorMessage}</S.ErrorText>}
    </S.InputContainer>
  );
};

export default InputProfile;
