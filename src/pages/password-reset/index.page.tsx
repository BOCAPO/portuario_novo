import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Alert, Button, Snackbar, Stack, TextField, Typography } from '@mui/material';
import Portal from '@mui/material/Portal';
import Header from '~components/Layout/Header/Header';
import { postPasswordResetUser } from '~services/Api/User/PasswordReset/PasswordReset';
import { IPayloadNewPasswordData, IToastState } from './types';

import styles from './PasswordReset.module.scss';

const TOAST_MESSAGE = {
  success: 'Senha redefinida com sucesso!',
  error: 'Erro ao redefinir senha! Verifique os dados e tente novamente.',
};

export default function PasswordReset() {
  const [toast, setToast] = useState<IToastState>({ open: false, severity: 'success' });
  const { query: { token, uidb64 }, push } = useRouter();
  const { register, handleSubmit, reset, getValues, errors } = useForm();

  const onSubmitNewPassword = async (newPassword: Pick<IPayloadNewPasswordData, 'new_password1' | 'new_password2'>) => {
    const payload = {
      ...newPassword,
      token,
      uid: uidb64,
    } as IPayloadNewPasswordData;

    const responsePasswordReset = await postPasswordResetUser(payload);

    if (responsePasswordReset.status === 201 || responsePasswordReset.status === 200) {
      setToast({
        open: true,
        severity: 'success',
      });
      reset();
      await new Promise(resolve => setTimeout(resolve, 2000));
      push('/');
      return;
    }

    setToast({
      open: true,
      severity: 'error',
    });
  };

  const handleToastClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setToast((previousValue) => {
      return { ...previousValue, open: false };
    });
  };

  const renderToast = () => (
    <Portal>
      <Snackbar
        open={toast.open}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={6000}
        onClose={handleToastClose}
      >
        <Alert
          onClose={handleToastClose}
          severity={toast.severity}
          sx={{ width: '100%', fontSize: '16px' }}
        >
          {TOAST_MESSAGE[toast.severity]}
        </Alert>
      </Snackbar>
    </Portal>
  );

  const renderForm = () => {
    return (
      <>
        <Typography variant="h3" component="h3" >
          Digite sua nova senha:
        </Typography>

        <form onSubmit={handleSubmit(onSubmitNewPassword)} className={styles.formContainer}>
          <Stack spacing={2}>
            <TextField
              required
              name="new_password1"
              label="Nova senha"
              type="password"
              variant="outlined"
              inputRef={register}
            />
            <TextField
              error={!!errors.new_password2}
              helperText={!!errors.new_password2 && 'A senha precisa ser igual nos dois campos!'}
              required
              name="new_password2"
              label="Confirme a nova senha"
              type="password"
              variant="outlined"
              inputRef={register({
                validate: value => value === getValues('new_password1')
              })}
            />

            <Button variant="contained" type="submit">
              Salvar nova senha
            </Button>
          </Stack>
        </form>
      </>
    );
  };

  return (
    <>
      {toast.open && renderToast()}
      <Head>
        <title>Econext</title>
      </Head>
      <Header />
      <main className={styles.mainContainer}>
        <div className={styles.divContainer}>
          {renderForm()}
        </div>
      </main>
    </>
  );
}
