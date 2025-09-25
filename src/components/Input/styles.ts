import { Platform, Text, TextInput } from 'react-native';
import styled from 'styled-components/native';

type TInputProfile = {
  mb?: number;
  mt?: number;
  multi?: boolean;
};

export const InputContainer = styled.View<TInputProfile>`
  width: 100%;
  margin-bottom: ${({ mb }) => mb}px;
  margin-top: ${({ mt }) => mt}px;
`;

export const ContainerTextInput = styled.View<{ isError?: boolean }>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: ${Platform.OS === 'ios' ? `12px 8px` : `4px 8px`};

  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme, isError }) =>
    isError
      ? theme.colors?.feedbackErrorMedium ??
        theme.colors?.feedbackErrorDarkest ??
        '#EF4444'
      : theme.colors.transparent};
  background-color: ${({ theme }) => theme.colors.supportPrimaryWhite};

  border-radius: 10px;
`;
export const Label = styled(Text)`
  font-size: 15px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.supportPrimaryLight};
  margin-bottom: 4px;
`;

export const StyledTextInput = styled(TextInput)<TInputProfile>`
  font-weight: 500;
  font-size: 14px;
  height: ${({ multi }) => (multi ? '100px' : 'none')};
  color: ${({ theme }) => theme.colors.brandCategoryBlackMedium};

  width: 80%;
`;

export const ErrorText = styled(Text)`
  margin-top: 6px;
  font-size: 12px;
  color: ${({ theme }) =>
    theme.colors?.feedbackErrorMedium ??
    theme.colors?.feedbackErrorDarkest ??
    '#EF4444'};
`;
