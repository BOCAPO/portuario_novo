import React from 'react';
import Button from '@mui/material/Button';
import { useAddToHomeScreenPrompt } from '~utils/addToHomeScreen';
import scss from './PopUp.module.scss';

const PopUp = (): JSX.Element => {

  const [mobileDevice, setMobileDevice] = React.useState<boolean>(false);
  const [shouldPopUp, setShouldPopUp] = React.useState<boolean>(false);
  const [localStorage, setLocalStorage] = React.useState<string | null>()

  const [prompt, promptToInstall] = useAddToHomeScreenPrompt();
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    if (prompt) {
      setIsVisible(true)
    }
  }, [prompt])

  React.useEffect(() => {
    checkIfIsMobile();
    retrieveLocalStorage();
  }, []);

  React.useEffect(() => {
    if (localStorage === null) setShouldPopUp(true);
  }, [localStorage]);

  const checkIfIsMobile = (): void => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      document.getElementsByTagName('body')[0].style.marginBottom = "12rem";
      setMobileDevice(true);
    } else {
      setMobileDevice(false);
    }
  }

  const retrieveLocalStorage = () => setLocalStorage(window.localStorage.getItem('popUp'));

  const handleButtonClick = (e: React.BaseSyntheticEvent) => {
    window.localStorage.setItem('popUp', e.target.value);

    if (e.target.value === 'negative') {
      window && window.localStorage.setItem('popUp', e.target.value);
      setShouldPopUp(false);

    } else if (e.target.value === 'affirmative') {
      promptToInstall();
    }
  }

  return mobileDevice && shouldPopUp ? (
    <>
      { isVisible ? (
        <div className={scss.wrapper}>
          Gostaria de adicionar um atalho na sua tela inicial?
          <div className={scss.buttonWrapper}>

            <Button
              value='negative'
              color='error'
              onClick={handleButtonClick}
            >Não</Button>

            <Button
              value='affirmative'
              variant='outlined'
              color='success'
              onClick={handleButtonClick}
            >Sim</Button>

          </div>
        </div>
      ) : (<></>) }
    </>
  ) : (<></>)

};

export default PopUp;
