import { ChangeEvent, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useWindowSize } from 'react-use';

import { Portal } from '@mui/base/Portal';
import CloseIcon from '@mui/icons-material/Close';
import {
  Alert,
  AlertTitle,
  Button,
  Container,
  Drawer,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { createEvent } from '~services/Api/Events/Events';
import axios, { AxiosError } from 'axios';
import ptLocale from 'date-fns/locale/pt-BR';

import { useGetEventCategories } from '~hooks/query/useEvents';

import PreviewEventImagePNG from './images/preview.png';
import { IEventCategory, IEventFormData, IRegisterEventDrawerProps, IToastState } from './types';

import scss from './RegisterEventDrawer.module.scss';

const URL_REGEX =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.com{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/i;

// eslint-disable-next-line react/prop-types
const RegisterEventDrawer = ({ onClose, open }: IRegisterEventDrawerProps) => {
  const { width } = useWindowSize();
  const eventsCategories = useGetEventCategories();

  const { register, handleSubmit, control, errors, reset, clearErrors, setError } = useForm();

  const [startDate, setStartDate] = useState<Date>(new Date());
  const [previewEventImage, setPreviewEventImage] = useState<string | null>('');
  const [eventImage, setEventImage] = useState<File | null>(null);

  const [toast, setToast] = useState<IToastState>({
    open: false,
    severity: 'success',
    messages: [''],
  });

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

  const handleUserImageChanged = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files?.length > 0) {
      const newUserImageUrlPreview = URL.createObjectURL(event.target?.files[0]);

      setPreviewEventImage(newUserImageUrlPreview);
      setEventImage(event.target?.files[0]);
    }
  };

  const handleToastClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setToast((prevValue) => {
      return { ...prevValue, open: false };
    });
  };

  const renderToast = () => {
    return (
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
            <AlertTitle className={scss.alertTitle}>{toast.severity}</AlertTitle>
            {toast.messages.map((message, index) => (
              <p key={index}>{message}</p>
            ))}
          </Alert>
        </Snackbar>
      </Portal>
    );
  };

  const onRegisterNewEvent = async (event: IEventFormData) => {
    try {
      const { category, description, end_date, local, start_date, title, webpage_url } = event;

      const newEventData = {
        category,
        description,
        end_date: end_date.toISOString().slice(0, 10),
        local,
        start_date: start_date.toISOString().slice(0, 10),
        title,
        image_dir: eventImage,
        webpage_url,
      };

      const { status } = await createEvent(newEventData);

      if (status === 200 || status === 201) {
        setToast({
          open: true,
          severity: 'success',
          messages: ['Evento cadastrado com sucesso!', 'Agora é só aguardar que iremos avaliar...'],
        });

        setPreviewEventImage(null);
        setEventImage(null);
        reset();
        onClose();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleResponseErrors(error);
      }
    }
  };

  const renderSelectCategory = () => {
    return (
      <Controller
        name="category"
        control={control}
        defaultValue=""
        render={({ onChange, value }) => (
          <FormControl className={scss.categoryContainer} fullWidth>
            <InputLabel id="category-label">Categoria</InputLabel>
            <Select
              name="category"
              label="Categoria"
              labelId="category-label"
              value={value}
              onChange={onChange}
              MenuProps={{
                disableScrollLock: true,
              }}
            >
              {eventsCategories &&
                // eslint-disable-next-line react/no-unused-prop-types
                eventsCategories.map(({ id, title }: IEventCategory) => {
                  return (
                    <MenuItem key={id} value={id}>
                      {title}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
        )}
      />
    );
  };

  const renderDatePickers = () => {
    return (
      <>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptLocale}>
          <Controller
            name="start_date"
            control={control}
            defaultValue={new Date()}
            render={({ onChange, value }) => (
              <DatePicker
                className={scss.datePicker}
                label="Data de início"
                value={value}
                onChange={(event: any) => {
                  onChange(event);
                  setStartDate(event);
                }}
                minDate={new Date()}
                slots={{
                  textField: (textFieldProps: any) => <TextField {...textFieldProps} />
                }}
              />
            )}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptLocale}>
          <Controller
            name="end_date"
            control={control}
            defaultValue={new Date()}
            render={({ onChange, value }) => (
              <DatePicker
                className={scss.datePicker}
                label="Data de término"
                value={value}
                onChange={onChange}
                minDate={startDate}
                slots={{
                  textField: (textFieldProps: any) => <TextField {...textFieldProps} />
                }}
              />
            )}
          />
        </LocalizationProvider>
      </>
    );
  };

  const renderForm = () => {
    return (
      <form onSubmit={handleSubmit(onRegisterNewEvent)} className={scss.formContainer}>
        <Stack spacing={2}>
          <Typography variant="h3" component="div" className={scss.drawerTitle}>
            Cadastrar novo evento
          </Typography>

          <TextField
            required
            name="title"
            label="Título"
            placeholder="Título do evento"
            inputRef={register}
          />

          <div className={scss.localAndCategoryContainer}>
            <TextField
              required
              name="local"
              label="Local"
              placeholder="Local de realização"
              inputRef={register}
              className={scss.localContainer}
            />

            {renderSelectCategory()}
          </div>

          <div className={scss.dateContainer}>{renderDatePickers()}</div>

          <div className={scss.eventImageContainer}>
            <span className={scss.eventImageTitle}>Imagem</span>
            <img
              className={scss.eventImage}
              src={previewEventImage || PreviewEventImagePNG.src}
              alt="Prévia de imagem"
            />

            <label className={scss.eventMessage} htmlFor="userInputImage">
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

          <TextField
            error={!!errors.webpage_url}
            name="webpage_url"
            label="Página do evento"
            placeholder="https://www.exemplo.com.br"
            inputRef={register({
              pattern: {
                value: URL_REGEX,
                message: 'Insira uma URL no padrão: https://www.google.com.br',
              },
            })}
          />
          {errors.webpage_url?.type === 'pattern' && (
            <div className={scss.errorMessage}>{errors.webpage_url?.message}</div>
          )}

          <TextField
            required
            name="description"
            label="Descrição"
            inputRef={register}
            multiline
            rows={4}
            inputProps={{ maxLength: 500 }}
            placeholder="Máximo de 500 caractéres."
          />

          <Button type="submit" variant="contained">
            Cadastrar
          </Button>
        </Stack>
      </form>
    );
  };

  return (
    <>
      {renderToast()}
      <Drawer
        open={open}
        className={scss.drawer}
        onClose={onClose}
        anchor={width > 720 ? 'right' : 'bottom'}
        variant="persistent"
      >
        <Container className={scss.container} maxWidth="xs">
          <Button className={scss.closeButton} onClick={onClose}>
            <CloseIcon sx={{ fontSize: 32 }} />
          </Button>
          {renderForm()}
        </Container>
      </Drawer>
    </>
  );
};

export default RegisterEventDrawer;
