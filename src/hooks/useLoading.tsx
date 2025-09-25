import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';
import { ActivityIndicator, Modal, View } from 'react-native';

type Ctx = { show: () => void; hide: () => void };
const LoadingCtx = createContext<Ctx | null>(null);

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [visible, setVisible] = useState(false);
  const lock = useRef(0);

  const show = useCallback(() => {
    lock.current += 1;
    setVisible(true);
  }, []);

  const hide = useCallback(() => {
    lock.current = Math.max(0, lock.current - 1);
    if (lock.current === 0) setVisible(false);
  }, []);

  return (
    <LoadingCtx.Provider value={{ show, hide }}>
      {children}
      <Modal
        visible={visible}
        transparent
        statusBarTranslucent
        animationType="fade"
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.25)',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              padding: 16,
              borderRadius: 12,
              backgroundColor: '#fff',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ActivityIndicator size="large" />
          </View>
        </View>
      </Modal>
    </LoadingCtx.Provider>
  );
};

export const useLoading = () => {
  const ctx = useContext(LoadingCtx);
  if (!ctx) throw new Error('useLoading must be used within LoadingProvider');
  return ctx;
};
