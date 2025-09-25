import styled from 'styled-components/native';

export const Backdrop = styled.Pressable`
  flex: 1;
  justify-content: center;
  padding: 24px;
  background-color: rgba(0, 0, 0, 0.45);
`;

export const Card = styled.View`
  align-items: center;
  width: 100%;
  background-color: ${({ theme }) =>
    theme.colors.supportPrimaryWhite ?? '#fff'};
  border-radius: 14px;
  padding: 20px;
  elevation: 8;
  shadow-color: #000;
  shadow-opacity: 0.2;
  shadow-radius: 10px;
  shadow-offset: 0px 3px;
`;

export const Title = styled.Text`
  margin-top: 17px;
  font-size: 15px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.brandCategoryBlackMedium};
`;

export const Message = styled.Text`
  margin-top: 8px;
  font-size: 15px;
  font-weight: 700;
  text-align: center;
  color: ${({ theme }) => theme.colors.supportSecondaryLightest ?? '#555'};
`;

export const Actions = styled.View`
  margin-top: 24px;
  flex-direction: row;
  justify-content: flex-end;
  gap: 12px;
`;

export const Button = styled.TouchableOpacity<{ $variant?: 'ghost' }>`
  padding: 10px 24px;
  border-radius: 100px;
  background-color: ${({ $variant, theme }) =>
    $variant === 'ghost'
      ? 'transparent'
      : theme.colors.brandPrimaryDark ?? '#2563eb'};
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
`;

export const ButtonText = styled.Text<{ $variant?: 'ghost' }>`
  font-size: 15px;
  font-weight: 400;
  color: ${({ $variant, theme }) =>
    $variant === 'ghost'
      ? theme.colors.brandPrimaryDark
      : theme.colors.supportPrimaryWhite};
`;
