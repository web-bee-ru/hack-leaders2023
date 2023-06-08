import { createContext, createElement, FC, useState } from 'react';

export interface NecessarilyModalProps {
  onCloseModal: (value: boolean) => void;
}

interface ModalContextProviderProps {
  openModal: <T extends NecessarilyModalProps = NecessarilyModalProps>(props: ModalConfig<T>) => void;
}

interface ModalConfig<T extends NecessarilyModalProps = NecessarilyModalProps> {
  component: FC<T>;
  props: Omit<T, 'onCloseModal'>;
  resolve: (value: boolean) => void;
}

export const ModalContext = createContext({} as ModalContextProviderProps);

const ModalProvider = ({ children }) => {
  const [modalConfig, setModalConfig] = useState<ModalConfig>();

  const openModal: ModalContextProviderProps['openModal'] = ({ component, props, resolve }) => {
    setModalConfig({ component: component as FC, props, resolve });
  };

  const onCloseModal = (value = false) => {
    modalConfig?.resolve(value);
    setModalConfig(undefined);
  };

  return (
    <ModalContext.Provider value={{ openModal }}>
      {modalConfig && createElement(modalConfig.component, { ...modalConfig.props, onCloseModal })}
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
