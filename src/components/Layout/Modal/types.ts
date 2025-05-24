import { ReactNode } from 'react';

export interface IModalProps {
  children: ReactNode;
  modalStatus: boolean;
  handleCloseModal: VoidFunction;
}
