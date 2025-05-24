import React from 'react';
import Lottie from 'react-lottie';
import styles from './styles.module.scss';
import CookieJSON from '../../assets/animations/cookie.json';

const CookiesAccept: React.FC = () => {
  const [cookie, setCookie] = React.useState(false);

  React.useEffect(() => {
    const cookie = localStorage.getItem('accept');
    if(cookie){
      setCookie(true);
    }else{
      setCookie(false);
    }
  }, []);

  function AcceptCookie(){
    const date = new Date();
    localStorage.setItem('accept', date.toDateString());
    setCookie(true);
  }

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: CookieJSON
  };

  if(cookie) return null;

  return (
    <div className={styles.container}>
      <div className={styles.lottie}>
        <Lottie options={defaultOptions} />
      </div>
      <div className={styles.content}>
        <p className={styles.text}>
          Este site utiliza cookies para garantir que você tenha uma melhor experiência. Ao continuar navegando, você aceita nossos <a href="/termos-de-uso" target="_blank">termos e condições</a>.
        </p>
        <button onClick={AcceptCookie} className={styles.button}>
          Entendi!
        </button>
      </div>
    </div>
  );
};

export default CookiesAccept;
