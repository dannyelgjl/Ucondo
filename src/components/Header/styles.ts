import styled from 'styled-components/native';
import { useStatusBarHeight } from '../../utils/statusBarHeight';

export const Container = styled.View`
  width: 100%;

  padding: ${useStatusBarHeight}px 22px 22px 22px;

  background-color: ${({ theme }) => theme.colors.brandPrimaryDark};
`;

export const Content = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const ContainerTitle = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ButtonGoBack = styled.TouchableOpacity`
  margin-right: 10px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.supportPrimaryWhite};
  font-size: 22px;
  font-weight: 700;
`;

export const ButtonAdd = styled.TouchableOpacity``;

export const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 20px 0 20px;

  background-color: ${({ theme }) => theme.colors.supportPrimaryWhite};
  border-radius: 100px;

  margin-top: 24px;
`;

export const Input = styled.TextInput`
  width: 100%;
  padding: 20px 0;

  margin-left: 16px;
`;
