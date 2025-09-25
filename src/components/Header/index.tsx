import React from 'react';
import * as S from './styles';
import { Icon } from '../Icon';
import { ETypeIcon } from '../Icon/types';
import { HeaderProps } from './types';
import { StatusBar } from 'react-native';
import { theme } from '../../styles/theme/theme';

const Header = ({
  title,
  onPress,
  onRegister,
  iconType,
  showInput,
  onChangeText,
  value,
}: HeaderProps) => {
  return (
    <S.Container>
      <StatusBar
        backgroundColor={theme.colors.brandPrimaryDark}
        barStyle={'light-content'}
      />

      <S.Content>
        <S.ContainerTitle>
          {onPress && (
            <S.ButtonGoBack onPress={onPress} testID="header-back-button">
              <Icon
                icon={ETypeIcon.ICON_ARROW_LEFT}
                size={20}
                color={theme.colors.supportPrimaryWhite}
              />
            </S.ButtonGoBack>
          )}

          <S.Title testID="header-title">{title}</S.Title>
        </S.ContainerTitle>

        <S.ButtonAdd onPress={onRegister} testID="header-add-button">
          <Icon
            icon={iconType}
            size={20}
            color={theme.colors.supportPrimaryWhite}
          />
        </S.ButtonAdd>
      </S.Content>

      {showInput && (
        <S.InputContainer testID="header-search-container">
          <Icon icon={ETypeIcon.ICON_SEARCH} size={15} />

          <S.Input
            placeholder="Pesquisar conta"
            onChangeText={onChangeText}
            value={value}
            testID="header-search-input"
          />
        </S.InputContainer>
      )}
    </S.Container>
  );
};

export default Header;
