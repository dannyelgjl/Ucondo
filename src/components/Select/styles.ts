import { Text } from 'react-native';
import styled from 'styled-components/native';

export const SelectContainer = styled.View<{ mb?: number; mt?: number }>`
  width: 100%;

  margin-bottom: ${({ mb }) => mb}px;
  margin-top: ${({ mt }) => mt}px;
`;

export const Label = styled(Text)`
  font-size: 15px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.supportPrimaryLight};
  margin-bottom: 4px;
`;

export const SelectButton = styled.TouchableOpacity<{ isOpen: boolean }>`
  width: 100%;
  min-height: 40px;
  padding: 8px 16px;
  background-color: white;
  border-width: 1px;
  border-color: ${({ isOpen, theme }) =>
    isOpen
      ? `${theme.colors.brandPrimaryDark}`
      : `${theme.colors.transparent}`};
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const SelectText = styled.Text<{ isPlaceholder: boolean }>`
  font-size: 14px;
  color: ${({ isPlaceholder }) => (isPlaceholder ? '#a0aec0' : '#1a202c')};
`;

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const OptionsContainer = styled.View`
  width: 90%;
  max-height: 300px;
  background-color: white;
  border-radius: 6px;
  padding: 8px 0;
`;

export const OptionScrollView = styled.ScrollView`
  width: 100%;
`;

export const Option = styled.TouchableOpacity<{ isSelected: boolean }>`
  padding: 12px 16px;
  background-color: ${({ isSelected }) => (isSelected ? '#e6f6ff' : 'white')};
`;

export const OptionText = styled.Text<{ isSelected: boolean }>`
  color: ${({ isSelected }) => (isSelected ? '#2b6cb0' : '#1a202c')};
  font-size: 14px;
`;

export const IconWrapper = styled.View<{ isOpen: boolean }>``;
