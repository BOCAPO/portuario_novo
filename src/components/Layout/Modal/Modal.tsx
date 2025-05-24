import { FC } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import MaterialModal from '@mui/material/Modal';

import scss from './Modal.module.scss';
import { IModalProps } from './types';

const Modal: FC<IModalProps> = ({
  children,
  modalStatus,
  handleCloseModal,
}) => {
  return (
    <>
      <MaterialModal open={modalStatus} onClose={handleCloseModal}>
        <Box className={scss.box}>
          <Button className={scss.button} onClick={handleCloseModal}>
            <CloseIcon fontSize="large" />
          </Button>
          {children}
        </Box>
      </MaterialModal>
    </>
  );
};

export default Modal;
