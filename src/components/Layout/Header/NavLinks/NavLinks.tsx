import Router from 'next/router';

import { MouseEvent, useEffect, useState } from 'react';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { getAllTypesOfPosts } from '~services/Api/Content/Content';

import AnchorMenu from '../AnchorMenu/AnchorMenu';

import scss from './NavLinks.module.scss';

interface IOptionsList {
  id?: number;
  name: string;
  link: string;
}

const NavLinks = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [optionsList, setOptionsList] = useState<IOptionsList[]>([]);
  const [allTypesOfBlog, setAllTypesOfBlog] = useState<IOptionsList[]>([]);

  const aboutList: IOptionsList[] = [
    { name: 'Sobre o Portal', link: '/sobre' },
    { name: 'Sobre a Químea', link: '/sobre-quimea' },
  ];

  const coursesList: IOptionsList[] = [
    { name: 'Ekoa + Químea', link: 'https://loja.ekoaeducacao.com.br/estante-quimea/?utm_source=estante&utm_medium=estante&utm_campaign=estante_quimea&utm_id=quimea' },
    { name: 'Químea', link: '/cursos' }
  ]

  const handleClickLink = (link: string) => {
    Router.push(`${link}`);
  };

  const handleClickAnchorMenu = (event: MouseEvent<HTMLButtonElement>) => {
    if (event.currentTarget.textContent === 'Conteúdos') {
      setOptionsList([...allTypesOfBlog, { link: '/conteudos', name: 'Todas publicações' }]);
    }

    if (event.currentTarget.textContent === 'Sobre/Dúvidas') {
      setOptionsList(aboutList);
    }

    if (event.currentTarget.textContent === 'Cursos') {
      setOptionsList(coursesList);
    }

    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const getAllTypes = async () => {
      const allTypes = await getAllTypesOfPosts();

      const mappedTypes = allTypes.map(({ id, title }: { id: number; title: string }) => {
        return {
          id,
          name: title,
          link: '/conteudos',
        };
      });

      setAllTypesOfBlog(mappedTypes);
    };

    getAllTypes();
  }, []);

  return (
    <>
      <BottomNavigation showLabels className={scss.container}>
        <BottomNavigationAction
          className={scss.buttons}
          onClick={() => handleClickLink('/parceiros')}
          label="Perfis"
        />
        <BottomNavigationAction
          className={scss.buttons}
          onClick={handleClickAnchorMenu}
          label="Cursos"
          icon={<KeyboardArrowDownIcon />}
        />
        <BottomNavigationAction
          className={scss.buttons}
          onClick={() => handleClickLink('/eventos')}
          label="Eventos"
        />
        <BottomNavigationAction
          className={scss.buttons}
          onClick={handleClickAnchorMenu}
          label="Conteúdos"
          icon={<KeyboardArrowDownIcon />}
        />
        <BottomNavigationAction
          className={scss.buttons}
          label="Sobre/Dúvidas"
          icon={<KeyboardArrowDownIcon />}
          onClick={handleClickAnchorMenu}
        />
        <BottomNavigationAction
          className={scss.buttons}
          onClick={() => handleClickLink('/glossario')}
          label="Glossário"
        />
      </BottomNavigation>

      <AnchorMenu anchorEl={anchorEl} handleClose={handleClose} optionsList={optionsList} />
    </>
  );
};
export default NavLinks;
