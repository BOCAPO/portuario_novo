import Link from 'next/link';

import EconextLogo from 'public/images/econextLogo.svg';

import scss from './Logo.module.scss';

const Logo: React.FC = () => {
  return (
    <div className={scss.container}>
      <div className={scss.LogoEconext}>
        <Link href="/">
          <div>
            <EconextLogo style={{ width: '150px' }} />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Logo;
