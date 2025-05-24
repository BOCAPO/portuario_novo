import { useState } from 'react';
import { useWindowSize } from 'react-use';

import AppBar from '@mui/material/AppBar';
import LoginDrawer from 'src/pages/sections/LoginDrawer/LoginDrawer';

import DrawerMenu from './DrawerMenu/DrawerMenu';
import Logo from './Logo/Logo';
import NavButtons from './NavButtons/NavButtons';
import NavLinks from './NavLinks/NavLinks';

import scss from './Header.module.scss';

const Header = () => {
  const [isLoginDrawerOpen, setIsLoginDrawerOpen] = useState<boolean>(false);

  const { width } = useWindowSize();

  const handleClickLoginButton = () => {
    setIsLoginDrawerOpen(true);
  };

  const onRequestDrawerClose = () => {
    setIsLoginDrawerOpen(false);
  };

  return (
    <>
      <LoginDrawer isLoginDrawerOpen={isLoginDrawerOpen} onRequestClose={onRequestDrawerClose} />
      <AppBar color="transparent" position="fixed" className={scss.appBar}>
        <div className={scss.toolbar}>
          <Logo />
          {width > 1024 && (
            <>
              <NavLinks />
              <NavButtons handleClickLoginButton={handleClickLoginButton} />
            </>
          )}
          {width <= 1024 && <DrawerMenu handleClickLoginButton={handleClickLoginButton} />}
        </div>
      </AppBar>
    </>
  );
};

export default Header;
