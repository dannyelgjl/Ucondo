import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.brandPrimaryDark};
`;

export const Content = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.brandSecondaryMedium};
  border-top-right-radius: 16px;
  border-top-left-radius: 16px;
  width: 100%;
  padding: 22px 22px;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.supportSecondaryDarkest};

  font-weight: 400;

  margin-bottom: 18px;
  margin-top: 18px;
`;
