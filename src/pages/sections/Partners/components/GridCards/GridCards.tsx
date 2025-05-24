import Router from 'next/router';

import React, { useState } from 'react';

import { Alert, CircularProgress, Grid, Snackbar } from '@mui/material';
import Switch from '~components/Layout/Switch/Switch';
import { IOrganizationProps, IUserProps } from '~services/Api/Partners/types';

import { useAllPartners } from '~hooks/query/usePartners';
import { useLoginStore } from '~hooks/store/UseLoginStore';

import Card from './components/Card/Card';
import { IPartnersData } from './types';

import scss from './GridCards.module.scss';

interface IToastState {
  open: boolean;
  severity: 'success' | 'error';
}

const GridCards = () => {
  const userIsLogged = useLoginStore((state) => state.user);
  const partners: IPartnersData = useAllPartners();

  const [toast, setToast] = useState<IToastState>({ open: false, severity: 'success' });
  const [isSwitchOn, setIsSwitchOn] = useState<boolean>(false);

  const handleSwitchClick = () => {
    setIsSwitchOn((prevValue) => !prevValue);
  };

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
    userIsLogged ? handleLogged() : handleUnlogged();
  };

  const showPartnersList = (partnersList: IPartnersData) => {
    if (partnersList !== 'loading' && typeof partnersList !== 'undefined') {
      const {
        users: { results: users },
        organizations: { results: organizations },
      } = partnersList;

      if (isSwitchOn) {
        return users
          ?.map((user: IUserProps) => {
            return (
              <Card
                key={user.id}
                name={user.first_name || 'Nome não cadastrado'}
                location={user.address ? user.address?.city : 'Endereço não cadastrado'}
                image={user.image || null}
                onClick={() => handleCardClick(user)}
              />
            );
          })
          .slice(0, 3);
      }

      return organizations
        ?.map((organization: IOrganizationProps) => {
          return (
            <Card
              key={organization.id}
              name={organization.trading_name || 'Nome não cadastrado'}
              location={`${organization.address?.city || 'Endereço não cadastrado'}`}
              logo={organization.logo || null}
              onClick={() => handleCardClick(organization)}
            />
          );
        })
        .slice(0, 3);
    }

    return false;
  };

  return (
    <div className={scss.container}>
      {renderToast()}
      <Switch
        firstOption="EMPRESAS"
        secondOption="PESSOAS"
        className={scss.switch}
        onClick={handleSwitchClick}
      />
      <Grid
        container
        rowSpacing={4}
        alignItems="center"
        className={scss.gridContainer}
        columnSpacing={{ xs: 0, sm: 4 }}
      >
        {partners === 'loading' ? (
          <CircularProgress className={scss.spinner} />
        ) : (
          showPartnersList(partners)
        )}
      </Grid>
    </div>
  );
};

export default GridCards;
