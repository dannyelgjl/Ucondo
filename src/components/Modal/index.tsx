import React from 'react';
import { Modal, Platform, Pressable } from 'react-native';
import { ModalProps } from './type';
import * as S from './styles';
import { Icon } from '../Icon';
import { ETypeIcon } from '../Icon/types';

const ConfirmModal = ({
  visible,
  title = 'Confirmação',
  message = 'Tem certeza?',
  confirmText = 'Sim',
  cancelText = 'Não',
  loading = false,
  onConfirm,
  onCancel,
}: ModalProps) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent={Platform.OS === 'android'}
      presentationStyle="overFullScreen"
      onRequestClose={onCancel}
    >
      <S.Backdrop onPress={loading ? undefined : onCancel}>
        <Pressable onPress={() => {}}>
          <S.Card>
            <Icon icon={ETypeIcon.ICON_TRASH} size={48} />
            {!!title && <S.Title>{title}</S.Title>}
            {!!message && <S.Message>{message}</S.Message>}

            <S.Actions>
              <S.Button $variant="ghost" disabled={loading} onPress={onCancel}>
                <S.ButtonText $variant="ghost">{cancelText}</S.ButtonText>
              </S.Button>

              <S.Button disabled={loading} onPress={onConfirm}>
                <S.ButtonText>{confirmText}</S.ButtonText>
              </S.Button>
            </S.Actions>
          </S.Card>
        </Pressable>
      </S.Backdrop>
    </Modal>
  );
};

export default ConfirmModal;
