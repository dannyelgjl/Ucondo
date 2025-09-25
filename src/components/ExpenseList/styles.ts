import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.supportPrimaryWhite};
  margin-top: 10px;
  padding: 18px;
  border-radius: 16px;
`;

export const Title = styled.Text<{ colors: string }>`
  color: ${({ theme, colors }) =>
    colors ?? theme.colors.brandCategoryBlackMedium};
  font-weight: 400;
  font-size: 15px;
`;

export const ButtonTrash = styled.TouchableOpacity``;
