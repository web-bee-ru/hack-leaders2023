import { FC, useContext } from 'react';
import { ModalContext, NecessarilyModalProps } from '@/Providers/ModalProvider';

const useModal = () => {
  const modalContext = useContext(ModalContext);
  const show = <T extends NecessarilyModalProps>(Component: FC<T>, props: Omit<T, keyof NecessarilyModalProps>) => {
    return new Promise((resolve) => {
      modalContext.openModal<T>({ component: Component, props, resolve });
    });
  };
  return { show };
};

export default useModal;
