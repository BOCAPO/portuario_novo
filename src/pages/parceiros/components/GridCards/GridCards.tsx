import Router from 'next/router';

import React, { useEffect, useState } from 'react';
import { useWindowSize } from 'react-use';

import SearchIcon from '@mui/icons-material/Search';
import {
  Alert,
  Button,
  CircularProgress,
  Grid,
  Pagination,
  Snackbar,
  TextField,
} from '@mui/material';
import Switch from '~components/Layout/Switch/Switch';
import { getAllPartners, searchAllPartners } from '~services/Api/Partners/Partners';
import { INumberOfPages, IOrganizationProps, IUserProps } from '~services/Api/Partners/types';

import { useLoginStore } from '~hooks/store/UseLoginStore';

import Card from './components/Card/Card';

import scss from './GridCards.module.scss';

interface IToastState {
  open: boolean;
  severity: 'success' | 'error';
}

const GridCards = () => {
  const size = useWindowSize();

  const [isMobile, setIsMobile] = useState<boolean>(size.width < 470);
  const [isSwitchOn, setIsSwitchOn] = useState<boolean>(false);

  const [currentPageUser, setCurrentPageUser] = useState<number>(1);
  const [currentPageOrganization, setCurrentPageOrganization] = useState<number>(1);
  const [numberOfPages, setNumberOfPages] = useState<INumberOfPages>({} as INumberOfPages);
  const [inputSearchValue, setInputSearchValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<IUserProps[]>([]);
  const [organizations, setOrganizations] = useState<IOrganizationProps[]>([]);

  const newCurrentPageUser = (currentPageUser - 1) * 50;
  const newCurrentPageOrganization = (currentPageOrganization - 1) * 50;
  const limitPerPage = 50;

  const user = useLoginStore((state) => state.user);
  const [toast, setToast] = useState<IToastState>({
    open: false,
    severity: 'success',
  });

  const handleToastClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setToast((prevValue) => {
      return { ...prevValue, open: false };
    });
  };

  const TOAST_MESSAGE = {
    success: 'Redirecionado para a página',
    error: 'Faça login para continuar',
  };

  const renderToast = () => (
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
  );

  const handleCardClick = (item: any) => {
    const handleUnlogged = () => {
      if (item.username) {
        setToast({
          open: true,
          severity: 'error',
        });
      } else {
        setToast({
          open: true,
          severity: 'success',
        });
        Router.push(`/${item.slug}`);
      }
    };

    const handleLogged = () => {
      setToast({
        open: true,
        severity: 'success',
      });
      if (item.username) {
        Router.push(`/parceiros/pessoas/${item.username}`);
      } else {
        Router.push(`/${item.slug}`);
      }
    };

    user ? handleLogged() : handleUnlogged();
  };

  const showPartners = (): JSX.Element[] => {
    if (isSwitchOn) {
      return users.map((userCard) => {
        return (
          <Card
            key={userCard.id}
            name={userCard.first_name || 'Nome não cadastrado'}
            location={userCard.address?.city || 'Endereço não cadastrado'}
            // TODO: Verificar dados do backend sobre userCard.address e possivelmente alterar código no front
            image={userCard.image!}
            onClick={() => handleCardClick(userCard)}
          />
        );
      });
    }
    return organizations.map((organization) => {
      return (
        <Card
          key={organization.id}
          name={organization.trading_name || 'Nome não cadastrado'}
          location={`${organization.address?.city || 'Endereço não cadastrado'}`}
          logo={organization.logo || null}
          onClick={() => handleCardClick(organization)}
        />
      );
    });
  };

  const handleSwitchClick = (): void => {
    setIsSwitchOn((prevValue) => !prevValue);
  };

  const handlePaginationChange = (event: React.ChangeEvent<unknown>, page: number): void => {
    setIsLoading(true);
    if (!isSwitchOn) {
      setCurrentPageOrganization(page);
      return;
    }
    setCurrentPageUser(page);
  };

  const handleInputSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newInputValue = event.target.value.toLowerCase();

    setInputSearchValue(newInputValue);
  };

  const handleButtonClick = (): void => {
    setIsLoading(true);
    setCurrentPageUser(1);
    setCurrentPageOrganization(1);

    searchPartners();
  };

  const handleKeyPress = (event: React.KeyboardEvent): void => {
    if (event.key !== 'Enter') return;
    setIsLoading(true);
    setCurrentPageUser(1);
    setCurrentPageOrganization(1);

    searchPartners();
  };

  const searchPartners = async (): Promise<void> => {
    const partnersList = await searchAllPartners(
      inputSearchValue,
      newCurrentPageUser,
      newCurrentPageOrganization,
      limitPerPage
    );

    setUsers(partnersList.users.results);
    setOrganizations(partnersList.organizations.results);

    const numberOfPagesUsers = Math.ceil(partnersList.users?.count / limitPerPage);
    const numberOfPagesOrganizations = Math.ceil(partnersList.organizations?.count / limitPerPage);

    setNumberOfPages({
      users: numberOfPagesUsers,
      organizations: numberOfPagesOrganizations,
    });

    setIsLoading(false);
  };

  const getPartners = async (): Promise<void> => {
    const partnersList = await getAllPartners(newCurrentPageUser, newCurrentPageOrganization);

    setUsers(partnersList.users.results);
    setOrganizations(partnersList.organizations.results);

    const numberOfPagesUsers = Math.ceil(partnersList.users?.count / limitPerPage);
    const numberOfPagesOrganizations = Math.ceil(partnersList.organizations?.count / limitPerPage);

    setNumberOfPages({
      users: numberOfPagesUsers,
      organizations: numberOfPagesOrganizations,
    });

    setIsLoading(false);
  };

  useEffect(() => {
    if (inputSearchValue !== '') {
      searchPartners();
      return;
    }

    getPartners();
  }, [currentPageUser, currentPageOrganization]);

  useEffect(() => {
    if (inputSearchValue === '') {
      setIsLoading(true);
      setCurrentPageUser(1);
      setCurrentPageOrganization(1);

      getPartners();
    }
  }, [inputSearchValue]);

  useEffect(() => {
    setIsMobile(size.width < 470);
  }, [size]);

  return (
    <div className={scss.container}>
      <div className={scss.searchContainer}>
        {renderToast()}
        <Switch
          firstOption="EMPRESAS"
          secondOption="PESSOAS"
          className={scss.switch}
          onClick={handleSwitchClick}
        />
        <div className={scss.inputAndButtonContainer}>
          <TextField
            className={scss.inputSearch}
            id="search"
            label="Pesquisa"
            variant="outlined"
            type="search"
            value={inputSearchValue}
            onChange={handleInputSearch}
            onKeyPress={handleKeyPress}
          />
          <Button
            className={scss.buttonSearch}
            variant="contained"
            size="large"
            onClick={handleButtonClick}
          >
            <SearchIcon fontSize="large" />
          </Button>
        </div>
      </div>
      {isLoading && <CircularProgress className={scss.spinner} />}
      <Grid
        container
        rowSpacing={4}
        alignItems="center"
        className={scss.gridContainer}
        columnSpacing={{ xs: 0, sm: 4 }}
      >
        {!isLoading && showPartners()}
        {!isLoading && users.length < 1 && isSwitchOn && (
          <p className={scss.notFoundMessage}>Usuários não encontrados...</p>
        )}
        {!isLoading && organizations.length < 1 && !isSwitchOn && (
          <p className={scss.notFoundMessage}>Organizações não encontradas...</p>
        )}
        {/* TODO: Revisar centralização do Spinner */}
      </Grid>
      <Pagination
        count={!isSwitchOn ? numberOfPages.organizations : numberOfPages.users}
        page={!isSwitchOn ? currentPageOrganization : currentPageUser}
        className={scss.pagination}
        onChange={handlePaginationChange}
        size={isMobile ? 'small' : 'large'}
      />
    </div>
  );
};

export default GridCards;
