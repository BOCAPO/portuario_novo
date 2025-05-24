/* eslint-disable camelcase */
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';

import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import { Alert, AlertTitle, Snackbar, Stack, TextField } from '@mui/material';
import Header from '~components/Layout/Header/Header';
import { updateUserInfo } from '~services/Api/User/Update/Update';
import axios from 'axios';

import { UseAuthenticated } from '~hooks/store/UseAuthenticated';

import { IAccountProps, IToastProps, IUserOnSubmitForm, TMaskType } from './types';

import scss from './Account.module.scss';

const DEFAULT_AVATAR = 'https://quimea.s3.us-east-2.amazonaws.com/old/pessoas/profile.jpg';

const Account = ({ user }: IAccountProps) => {
  const { first_name, last_name, email, phone, cpf, description, image, address } = user;

  const router = useRouter();
  const { register, handleSubmit } = useForm();

  const [newTelephone, setNewTelephone] = useState(phone || '');
  const [newCpf, setNewCpf] = useState(cpf || '');
  const [newPostalCode, setNewPostalCode] = useState(address?.postal_code || '');
  const [newStateCode, setNewStateCode] = useState(address?.state_code || '');
  const [newCity, setNewCity] = useState(address?.city_name || '');
  const [newDistrict, setNewDistrict] = useState(address?.district_name || '');
  const [newStreet, setNewStreet] = useState(address?.street || '');
  const [newNumber, setNewNumber] = useState(address?.number || '');
  const [newComplement, setNewComplement] = useState(address?.complement || '');
  const [newUserImage, setNewUserImage] = useState<File | null>(null);
  const [previewUserImage, setPreviewUserImage] = useState(image);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<IToastProps>({
    open: false,
    message: '',
    severity: 'success',
    title: 'Sucesso',
  });

  const getCepInfo = async () => {
    try {
      if (newPostalCode === '') {
        setNewStateCode('');
        setNewCity('');
        setNewDistrict('');
        setNewStreet('');
        return;
      }

      if (newPostalCode.length === 8) {
        setIsLoading(true);

        const { data } = await axios.get(`https://viacep.com.br/ws/${newPostalCode}/json/`);
        const { bairro, localidade, logradouro, uf, erro } = await data;

        setIsLoading(false);

        if (erro) {
          setToast({
            open: true,
            message: 'O CEP digitado está incorreto.',
            severity: 'error',
            title: 'Erro ao buscar dados do CEP!',
          });
          return;
        }

        setNewStateCode(uf);
        setNewCity(localidade);
        setNewDistrict(bairro);
        setNewStreet(logradouro);
      }
    } catch (error) {
      setIsLoading(false);
      setToast({
        open: true,
        message: 'Nossa API pode estar fora do ar, tente novamente em alguns instantes.',
        severity: 'error',
        title: 'Erro ao buscar dados do CEP!',
      });
    }
  };

  const unMask = (value: string) => {
    return value.replace(/\D/g, '');
  };

  const mask = (value: string, type: TMaskType) => {
    if (type === 'Telephone') {
      const newValue = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{4})\d+?$/, '$1');

      return newValue;
    }

    if (type === 'CPF') {
      const newValue = value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1');

      return newValue;
    }

    if (type === 'CEP') {
      const newValue = value
        .replace(/\D/g, '')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{3})(\d+?$)/, '$1');

      return newValue;
    }

    return false;
  };

  const handleUserImageChanged = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files?.length > 0) {
      const newUserImageUrlPreview = URL.createObjectURL(event.target?.files[0]);

      setPreviewUserImage(newUserImageUrlPreview);
      setNewUserImage(event.target?.files[0]);
    }
  };

  const onSubmitForm = async (receivedUserForm: IUserOnSubmitForm) => {
    try {
      const {
        city,
        complement,
        district,
        number,
        street,
        description,
        first_name,
        last_name,
        state_code,
      } = receivedUserForm;

      setIsLoading(true);

      const userToSave = {
        description,
        first_name,
        last_name,
        address: {
          id: address?.id,
          state_code,
          city,
          complement,
          district,
          number,
          postal_code: unMask(newPostalCode),
          street,
        },
        image: newUserImage,
        phone: unMask(newTelephone),
        cpf: unMask(newCpf),
      };

      const { status } = await updateUserInfo(userToSave);

      if (status === 200 || status === 201) {
        setToast({
          open: true,
          message: 'Seus dados foram salvos.',
          severity: 'success',
          title: 'Sucesso!',
        });

        setIsLoading(false);

        UseAuthenticated();
      }

      return true;
    } catch (error) {
      setIsLoading(false);
      setToast({
        open: true,
        message: 'Verifique seus dados e tente novamente.',
        severity: 'error',
        title: 'Erro ao salvar!',
      });
      return error;
    }
  };

  const renderToast = () => {
    const { open, message, severity, title } = toast;

    return (
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={6000}
        onClose={() => setToast({ ...toast, open: false })}
      >
        <Alert
          onClose={() => setToast({ ...toast, open: false })}
          severity={severity}
          sx={{ width: '100%', fontSize: '16px' }}
        >
          <AlertTitle>{title}</AlertTitle>
          {message}
        </Alert>
      </Snackbar>
    );
  };

  return (
    <>
      <Header />
      <main className={scss.mainContainer}>
        {renderToast()}
        <div className={scss.accountInputsContainer}>
          <Stack
            component="form"
            direction="column"
            spacing={2}
            maxWidth={540}
            onSubmit={handleSubmit(onSubmitForm)}
            className={scss.formStackContainer}
            encType="multipart/form-data"
          >
            <div className={scss.userImageContainer}>
              <img
                className={scss.userImage}
                src={previewUserImage || DEFAULT_AVATAR}
                alt={first_name}
              />

              <label className={scss.userMessage} htmlFor="userInputImage">
                <input
                  name="image"
                  type="file"
                  id="userInputImage"
                  accept="image/png, image/jpeg"
                  className={scss.inputFile}
                  ref={register}
                  onChange={(event) => handleUserImageChanged(event)}
                />
                Alterar imagem
              </label>
            </div>

            <div className={scss.nameAndLastNameContainer}>
              <TextField
                name="first_name"
                label="Nome"
                className={scss.firstNameInput}
                defaultValue={first_name}
                type="text"
                inputRef={register}
                inputProps={{ maxLength: 30 }}
              />
              <TextField
                name="last_name"
                label="Sobrenome"
                className={scss.lastNameInput}
                defaultValue={last_name}
                type="text"
                inputRef={register}
                inputProps={{ maxLength: 60 }}
              />
            </div>

            <TextField
              disabled
              name="email"
              label="Email"
              defaultValue={email}
              type="email"
              inputRef={register}
              inputProps={{ maxLength: 0 }}
            />

            <div className={scss.telephoneAndCpfContainer}>
              <TextField
                name="phone"
                label="Telefone"
                className={scss.telephoneInput}
                type="tel"
                value={mask(newTelephone, 'Telephone')}
                onChange={({ target: { value } }) => setNewTelephone(unMask(value).slice(0, 11))}
                inputRef={register}
              />
              <TextField
                name="cpf"
                label="CPF"
                className={scss.cpfInput}
                value={mask(newCpf, 'CPF')}
                onChange={({ target: { value } }) => setNewCpf(unMask(value).slice(0, 11))}
                inputRef={register}
              />
            </div>

            <div className={scss.postalCodeContainer}>
              <TextField
                name="postal_code"
                label="CEP"
                className={scss.postalCodeInput}
                value={mask(newPostalCode, 'CEP')}
                onChange={({ target: { value } }) => setNewPostalCode(unMask(value).slice(0, 8))}
                onBlur={() => getCepInfo()}
                inputRef={register}
              />
              <TextField
                name="city"
                label="Cidade"
                className={scss.cityInput}
                value={newCity}
                inputRef={register}
                InputProps={{ readOnly: true }}
              />
              <TextField
                name="state_code"
                label="Estado"
                className={scss.stateInput}
                value={newStateCode}
                inputRef={register}
                InputProps={{ readOnly: true }}
              />
            </div>

            <TextField
              name="district"
              label="Bairro"
              value={newDistrict}
              inputRef={register}
              InputProps={{ readOnly: true }}
            />
            <TextField
              name="street"
              label="Endereço"
              value={newStreet}
              inputRef={register}
              InputProps={{ readOnly: true }}
            />

            <div className={scss.numberAndComplementContainer}>
              <TextField
                name="number"
                label="Número"
                className={scss.numberInput}
                value={newNumber}
                onChange={({ target: { value } }) => setNewNumber(value)}
                inputRef={register}
                inputProps={{ maxLength: 10 }}
              />
              <TextField
                name="complement"
                label="Complemento"
                className={scss.complementInput}
                value={newComplement}
                onChange={({ target: { value } }) => setNewComplement(value)}
                inputRef={register}
                inputProps={{ maxLength: 50 }}
              />
            </div>

            <TextField
              name="description"
              label="Descrição"
              defaultValue={description}
              multiline
              rows={4}
              inputRef={register}
              inputProps={{ maxLength: 500 }}
              placeholder="Máximo de 500 caractéres."
            />

            <div className={scss.buttonsContainer}>
              <LoadingButton
                endIcon={<SaveIcon />}
                loading={isLoading}
                variant="contained"
                type="submit"
                color="primary"
                loadingPosition="end"
              >
                Salvar
              </LoadingButton>
              <LoadingButton
                endIcon={<CancelIcon />}
                loading={isLoading}
                variant="contained"
                color="error"
                onClick={() => router.push('/')}
                loadingPosition="end"
              >
                Cancelar e sair
              </LoadingButton>
            </div>
          </Stack>
        </div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const user = await UseAuthenticated(context);

    if (!user) return { redirect: { destination: '/', permanent: false } };

    return {
      props: {
        user,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
};

export default Account;
