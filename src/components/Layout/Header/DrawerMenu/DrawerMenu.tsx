import { useRouter } from 'next/router';

import { useState } from 'react';

import DesktopMacRoundedIcon from '@mui/icons-material/DesktopMacRounded';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import MenuIcon from '@mui/icons-material/Menu';
import { Divider } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { UseExit } from '~hooks/store/UseAuthenticated';
import { useLoginStore } from '~hooks/store/UseLoginStore';

import scss from './DrawerMenu.module.scss';

interface IDrawerMenuProps {
  handleClickLoginButton: () => void;
}

const DrawerMenu = ({ handleClickLoginButton }: IDrawerMenuProps) => {
  const router = useRouter();
  const user = useLoginStore((state) => state.user);

  const [state, setState] = useState(false);

  const handleClick = ({ name, link }: { name: string; link?: string }) => {
    if (name === 'Área do Aluno' && link) {
      window.open(link, '_blank');
      return;
    }

    if (name === 'Minha conta') {
      router.push('/account');
      return;
    }

    if (name === 'Login') {
      handleClickLoginButton();
      return;
    }

    if (link) {
      router.push(link);
    }
  };

  const renderEconextList = () => {
    const econextLinksList = [
      {
        name: 'Perfis',
        link: '/parceiros',
      },
      {
        name: 'Cursos',
        link: '/cursos',
      },
      {
        name: 'Cursos Ekoa',
        link: 'https://loja.ekoaeducacao.com.br/estante-quimea/?utm_source=estante&utm_medium=estante&utm_campaign=estante_quimea&utm_id=quimea',
      },
      {
        name: 'Eventos',
        link: '/eventos',
      },
      {
        name: 'Conteúdos',
        link: '/blog',
      },
      {
        name: 'Sobre o Portal',
        link: '/sobre',
      },
      {
        name: 'Sobre a Químea',
        link: '/sobre-quimea',
      },
      {
        name: 'Glossário',
        link: '/glossario',
      },
    ];

    return (
      <List>
        {econextLinksList.map(({ name, link }) => (
          <ListItem button key={name} onClick={() => handleClick({ name, link })}>
            <ListItemText primary={name} primaryTypographyProps={{ fontSize: '1.6rem' }} />
          </ListItem>
        ))}
      </List>
    );
  };

  const renderUserList = () => {
    const userLinksList = [
      {
        name: user ? 'Minha conta' : 'Login',
        icon: user ? <ManageAccountsIcon fontSize="large" /> : <LoginIcon fontSize="large" />,
      },
      {
        name: 'Área do Aluno',
        link: 'http://aluno.quimea.com.br/',
        icon: <DesktopMacRoundedIcon fontSize="large" />,
      },
    ];

    return (
      <List>
        {userLinksList.map(({ name, link, icon }) => (
          <ListItem button key={name} onClick={() => handleClick({ name, link })}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primaryTypographyProps={{ fontSize: '1.6rem' }} primary={name} />
          </ListItem>
        ))}
      </List>
    );
  };

  return (
    <>
      <IconButton className={scss.menu} onClick={() => setState(true)}>
        <MenuIcon fontSize="large" sx={{ color: 'rgba(0, 0, 0, 0.6)' }} />
      </IconButton>
      <Drawer anchor="right" open={state} onClose={() => setState(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setState(false)}
          onKeyDown={() => setState(false)}
        >
          {renderUserList()}
          <Divider />
          {renderEconextList()}

          {user && (
            <>
              <Divider />
              <ListItem button onClick={() => UseExit()}>
                <ListItemIcon>
                  <LogoutIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText primaryTypographyProps={{ fontSize: '1.6rem' }} primary="Sair" />
              </ListItem>
            </>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default DrawerMenu;
