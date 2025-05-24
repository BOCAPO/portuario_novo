import DesktopMacRoundedIcon from '@mui/icons-material/DesktopMacRounded';
import LoginIcon from '@mui/icons-material/Login';
import { Avatar } from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import { useLoginStore } from '~hooks/store/UseLoginStore';

import scss from './NavButtons.module.scss';

interface INavButtonsProps {
  handleClickLoginButton: () => void;
}

const DEFAULT_AVATAR = 'https://quimea.s3.us-east-2.amazonaws.com/old/pessoas/profile.jpg';

const NavButtons = ({ handleClickLoginButton }: INavButtonsProps) => {
  const user = useLoginStore((state) => state.user);

  return (
    <BottomNavigation showLabels className={scss.buttonsContainer}>
      {user ? (
        <BottomNavigationAction
          onClick={handleClickLoginButton}
          className={scss.button}
          icon={
            <Avatar
              alt={user.first_name}
              src={user.image || DEFAULT_AVATAR}
              sx={{ width: '4.5rem', height: '4.5rem' }}
            />
          }
        />
      ) : (
        <BottomNavigationAction
          onClick={handleClickLoginButton}
          className={scss.button}
          label="Login"
          icon={<LoginIcon />}
        />
      )}
      <BottomNavigationAction
        className={scss.button}
        label="Área do Aluno"
        icon={<DesktopMacRoundedIcon />}
        onClick={() => window.open('http://aluno.quimea.com.br/', '_blank')}
      />
    </BottomNavigation>
  );
};
export default NavButtons;
