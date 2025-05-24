/* eslint-disable react/no-array-index-key */
import {useRouter} from 'next/router';
import Link from 'next/link'


import { useEffect, useState } from 'react';
import {useForm} from 'react-hook-form';
import {useWindowSize} from 'react-use';

import { Portal } from '@mui/base/Portal';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import {
  Alert,
  AlertTitle,
  Button,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import {postResetPassword} from '~services/Api/User/Reset/Reset';
import {postLoginUser, postRegisterUser} from '~services/Api/User/userData';
import axios, {AxiosError} from 'axios';

import {UseAuthenticated, UseExit} from '~hooks/store/UseAuthenticated';
import {useLoginStore} from '~hooks/store/UseLoginStore';

import {
  ILoginDrawerProps,
  TLoginDrawerState,
  ILoginUserData,
  IRegisterUserData,
  IToastState,
} from './types';

import scss from './LoginDrawer.module.scss';
import CheckBox from "~components/Layout/CheckBox";

const MAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const LoginDrawer = ({isLoginDrawerOpen, onRequestClose}: ILoginDrawerProps) => {
  const router = useRouter();
  const [termsAndPrivacy, setTermsAndPrivacy] = useState(false);
  const [termsError, setTermsError] = useState(false);

  const {register, handleSubmit, errors, reset, setError, getValues, clearErrors} = useForm();
  const {width} = useWindowSize();
  const [toast, setToast] = useState<IToastState>({
    open: false,
    severity: 'success',
    messages: [''],
  });
  const [loginDrawerState, setLoginDrawerState] = useState<TLoginDrawerState>('login');

  const userIsLogged = useLoginStore((state) => state.user);

  const handleResponseErrors = (error: AxiosError) => {
    clearErrors();

    const responseErrors = error.response?.data;

    const newResponseMessages: string[] = [];

    for (const key in responseErrors) {
      if (Object.prototype.hasOwnProperty.call(responseErrors, key)) {
        setError(key !== 'non_field_errors' ? key : 'email', {
          type: 'manual',
        });

        if (responseErrors) {
          responseErrors[key].forEach((errorInResponse: string) =>
            newResponseMessages.push(errorInResponse)
          );
        }
      }
    }

    setToast({
      open: true,
      severity: 'error',
      messages: newResponseMessages,
    });
  };

  const onSubmitLogin = async (user: ILoginUserData) => {
    try {
      const {status, data} = await postLoginUser(user);

      if (status === 201 || status === 200) {
        UseAuthenticated(undefined, data.key);

        setToast({
          open: true,
          severity: 'success',
          messages: ['Login efetuado com sucesso!'],
        });

        onRequestClose();
        reset();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleResponseErrors(error);
      }
    }
  };

  const onSubmitRegister = async (user: IRegisterUserData) => {
    try {
      if (!termsAndPrivacy) {
        setTermsError(true)
        return;
      };

      const {status} = await postRegisterUser(user);

      if (status === 201 || status === 200) {
        onRequestClose();
        reset();
        router.push('/account-email-confirmation');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleResponseErrors(error);
      }
    }
  };

  const onSubmitReset = async (email: Pick<ILoginUserData, 'email'>) => {
    try {
      const {status} = await postResetPassword(email);

      if (status === 201 || status === 200) {
        setToast({
          open: true,
          severity: 'success',
          messages: ['Enviamos uma mensagem para seu e-mail!'],
        });
        onRequestClose();
        reset();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleResponseErrors(error);
      }
    }
  };

  const onExit = async () => {
    try {
      await UseExit();
      onRequestClose();
      router.push('/');
      setLoginDrawerState('login');

      return true;
    } catch (error) {
      return error;
    }
  };

  const handleToastClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setToast((prevValue) => {
      return {...prevValue, open: false};
    });
  };

  const handleButtonLoginOrRegisterClick = () => {
    if (loginDrawerState === 'login') {
      setLoginDrawerState('register');
    } else {
      setLoginDrawerState('login');
    }

    reset();
  };

  const handleButtonResetPasswordClick = () => {
    setLoginDrawerState('reset');
    reset();
  };

  useEffect(() => {
    if(termsAndPrivacy) setTermsError(false)
  }, [termsAndPrivacy]);

  const renderToast = () => {
    return (
      <Portal>
        <Snackbar
          open={toast.open}
          anchorOrigin={{vertical: 'top', horizontal: 'right'}}
          autoHideDuration={6000}
          onClose={handleToastClose}
        >
          <Alert
            onClose={handleToastClose}
            severity={toast.severity}
            sx={{width: '100%', fontSize: '16px'}}
          >
            <AlertTitle className={scss.alertTitle}>{toast.severity}</AlertTitle>
            {toast.messages.map((message, index) => (
              <p key={index}>{message}</p>
            ))}
          </Alert>
        </Snackbar>
      </Portal>
    );
  };

  const renderRegister = () => {
    return (
      <form onSubmit={handleSubmit(onSubmitRegister)} className={scss.registerFormContainer}>
        <Stack spacing={2}>
          <Typography variant="h3" component="h3" className={scss.registerTitle}>
            Cadastrar nova conta
          </Typography>

          <TextField
            required
            name="first_name"
            label="Nome"
            type="text"
            variant="outlined"
            inputRef={register}
          />

          <TextField
            required
            name="last_name"
            label="Sobrenome"
            type="text"
            variant="outlined"
            inputRef={register}
          />

          <TextField
            error={!!errors.email}
            required
            name="email"
            label="E-mail"
            type="email"
            variant="outlined"
            inputRef={register({
              pattern: {
                value: MAIL_REGEX,
                message: 'Insira um e-mail válido',
              },
            })}
          />
          {errors.email?.type === 'pattern' && (
            <div className={scss.errorMessage}>{errors.email?.message}</div>
          )}

          <TextField
            error={!!errors.password1 || !!errors.password2}
            required
            name="password1"
            label="Senha"
            type="password"
            variant="outlined"
            inputRef={register}
          />

          <TextField
            error={!!errors.password2 || !!errors.password1}
            required
            name="password2"
            label="Confirmação de Senha"
            variant="outlined"
            type="password"
            inputRef={register({
              validate: (value) =>
                value === getValues('password1') || 'As senhas devem ser iguais nos dois campos.',
            })}
          />
          {errors.password2?.type === 'validate' && (
            <div className={scss.errorMessage}>{errors.password2?.message}</div>
          )}

          <div className={scss.checkboxContainer}>
            <CheckBox
              onChange={(checked: boolean) => setTermsAndPrivacy(checked)}
              label={
                <p className={scss.checkboxText}>
                  Aceito os <a href="/termos-de-uso" target="_blank">Termos e condições</a> e autorizo o uso de meus dados de acordo com a <a href="/politicas-de-privacidade" target="_blank">Declaração de privacidade</a>.
                </p>
              }/>
            <p className={scss.checkboxError}>{termsError && "É necessário aceitar os termos para prosseguir" }</p>
          </div>


          <Button variant="contained" type="submit">
            Cadastrar
          </Button>
        </Stack>
      </form>
    );
  };

  const renderLogin = () => {
    return (
      <form onSubmit={handleSubmit(onSubmitLogin)} className={scss.loginFormContainer}>
        <Stack spacing={2}>
          <Typography variant="h3" component="h3" className={scss.loginTitle}>
            Login
          </Typography>

          <TextField
            error={!!errors.email}
            required
            name="email"
            label="E-mail"
            type="text"
            variant="outlined"
            inputRef={register({
              pattern: {
                value: MAIL_REGEX,
                message: 'Insira um e-mail válido',
              },
            })}
          />
          {errors.email?.type === 'pattern' && (
            <div className={scss.errorMessage}>{errors.email?.message}</div>
          )}

          <TextField
            error={!!errors.email}
            required
            name="password"
            label="Senha"
            type="password"
            variant="outlined"
            inputRef={register}
          />

          <Button variant="contained" type="submit">
            Entrar
          </Button>
        </Stack>
      </form>
    );
  };

  const renderResetPassword = () => {
    return (
      <form className={scss.resetPasswordFormContainer} onSubmit={handleSubmit(onSubmitReset)}>
        <Stack spacing={2}>
          <Typography variant="h3" component="h3" className={scss.resetPasswordTitle}>
            Redefinir senha
          </Typography>

          <TextField
            required
            error={!!errors.email}
            name="email"
            label="Digite seu e-mail"
            type="email"
            variant="outlined"
            inputRef={register({
              pattern: {
                value: MAIL_REGEX,
                message: 'Insira um e-mail válido',
              },
            })}
          />
          {errors.email?.type === 'pattern' && (
            <div className={scss.errorMessage}>{errors.email?.message}</div>
          )}

          <Button variant="contained" type="submit">
            Enviar e-mail
          </Button>
        </Stack>
      </form>
    );
  };

  const renderForm = () => (
    <>
      {loginDrawerState === 'login' && renderLogin()}
      {loginDrawerState === 'register' && renderRegister()}
      {loginDrawerState === 'reset' && renderResetPassword()}
      <div className={scss.changeStepButton}>
        <Button onClick={handleButtonLoginOrRegisterClick} variant="text" type="submit">
          {loginDrawerState === 'login' && 'Cadastrar nova conta'}
          {loginDrawerState === 'register' && 'Já cadastrado? Login'}
          {loginDrawerState === 'reset' && 'Voltar para Login'}
        </Button>

        {loginDrawerState === 'login' && (
          <Button variant="text" onClick={handleButtonResetPasswordClick}>
            Esqueci minha senha
          </Button>
        )}
      </div>
    </>
  );

  const renderUserInfo = () => {
    return (
      <div className={scss.userInfo}>
        <h2>Olá, {userIsLogged?.first_name}!</h2>

        <div className={scss.userButtons}>
          {/* <Button variant="outlined" onClick={() => router.push('/account')}>
            <ManageAccountsIcon fontSize="large" />
            <p>Minha Conta</p>
          </Button>
          <Button variant="text" onClick={() => onExit()}>
            Sair?
          </Button> */}

          <List>
            <ListItem button onClick={() => router.push('/account')}>
              <ListItemIcon>
                <ManageAccountsIcon fontSize="large"/>
              </ListItemIcon>
              <ListItemText primary="Minha Conta" primaryTypographyProps={{fontSize: '1.6rem'}}/>
            </ListItem>
            <ListItem button onClick={() => onExit()}>
              <ListItemIcon>
                <LogoutIcon fontSize="large"/>
              </ListItemIcon>
              <ListItemText primary="Sair" primaryTypographyProps={{fontSize: '1.6rem'}}/>
            </ListItem>
          </List>
        </div>
      </div>
    );
  };

  return (
    <>
      {renderToast()}
      <Drawer
        open={isLoginDrawerOpen}
        className={scss.drawer}
        onClose={onRequestClose}
        anchor={width > 720 ? 'right' : 'bottom'}
      >
        <Container className={scss.container}>
          <Button className={scss.closeButton} onClick={onRequestClose}>
            <CloseIcon sx={{fontSize: 32}}/>
          </Button>
          {userIsLogged ? renderUserInfo() : renderForm()}
        </Container>
      </Drawer>
    </>
  );
};

export default LoginDrawer;
