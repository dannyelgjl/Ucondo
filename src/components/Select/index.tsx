import React, { useState } from 'react';
import { Modal, TouchableWithoutFeedback } from 'react-native';
import * as S from './styles';
import { Icon } from '../Icon';
import { ETypeIcon } from '../Icon/types';
import { SelectProps } from './types';
import { theme } from '../../styles/theme/theme';

const Select = ({
  options,
  placeholder = 'Selecione uma opção',
  value,
  onChange,
  label,
  mb,
  mt,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find(opt => opt.value === value);

  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue);
    setIsOpen(false);
  };

  return (
    <S.SelectContainer mb={mb} mt={mt}>
      {label && <S.Label>{label}</S.Label>}

      <S.SelectButton
        onPress={() => setIsOpen(!isOpen)}
        isOpen={isOpen}
        activeOpacity={0.7}
      >
        <S.SelectText isPlaceholder={!selectedOption}>
          {selectedOption ? selectedOption.label : placeholder}
        </S.SelectText>
        <S.IconWrapper isOpen={isOpen}>
          <Icon
            icon={ETypeIcon.ICON_ARROW_DOWN}
            size={10}
            color={theme.colors.brandSecondaryDark}
          />
        </S.IconWrapper>
      </S.SelectButton>

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
          <S.ModalContainer>
            <TouchableWithoutFeedback>
              <S.OptionsContainer>
                <S.OptionScrollView>
                  {options.map(option => (
                    <S.Option
                      key={option.value}
                      isSelected={option.value === value}
                      onPress={() => handleSelect(option.value)}
                      activeOpacity={0.7}
                    >
                      <S.OptionText isSelected={option.value === value}>
                        {option.label}
                      </S.OptionText>
                    </S.Option>
                  ))}
                </S.OptionScrollView>
              </S.OptionsContainer>
            </TouchableWithoutFeedback>
          </S.ModalContainer>
        </TouchableWithoutFeedback>
      </Modal>
    </S.SelectContainer>
  );
};
export default Select;
