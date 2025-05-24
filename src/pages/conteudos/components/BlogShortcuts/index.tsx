/* eslint-disable jsx-a11y/anchor-is-valid */
import { MouseEvent, useEffect, useState } from 'react';

import { Divider } from '@mui/material';
import { getAllCategoriesOfPosts, getAllTypesOfPosts } from '~services/Api/Content/Content';
import EconextLogo from 'public/images/econextLogo.svg';

import {
  useNewsFiltersStore,
  setActivePostCategory,
  setActivePostType,
} from '~hooks/store/UseNewsFilters';

import { ICategoryNews, ITypeNews } from '../../types';

import scss from './BlogShortcuts.module.scss';

const BlogShortcuts = () => {
  const [postCategories, setPostCategories] = useState<ICategoryNews[]>([]);
  const [postTypes, setPostTypes] = useState<ITypeNews[]>([]);

  const activePostCategory = useNewsFiltersStore((state) => state.activePostCategory);
  const activePostType = useNewsFiltersStore((state) => state.activePostType);

  const handleClickPostCategories = (
    event: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>,
    id: number
  ) => {
    event.preventDefault();

    if (activePostCategory === id) {
      setActivePostCategory(0);
      return;
    }

    setActivePostCategory(id);
  };

  const handleClickPostTypes = (
    event: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>,
    id: number
  ) => {
    event.preventDefault();

    if (activePostType === id) {
      setActivePostType(0);
      return;
    }

    setActivePostType(id);
  };

  useEffect(() => {
    const getCategoriesAndPostTypes = async () => {
      const allPostCategories = await getAllCategoriesOfPosts();
      const allPostTypes = await getAllTypesOfPosts();

      setPostCategories(allPostCategories);
      setPostTypes(allPostTypes);
    };

    getCategoriesAndPostTypes();
  }, []);

  return (
    <div className={scss.shortcuts}>
      {postCategories.length > 0 && (
        <div className={scss.card}>
          <h2 className={scss.title}>Categorias</h2>
          <Divider />
          <ul>
            {postCategories.map(({ id, title }) => (
              <li
                key={id}
                className={`${scss.listCategory} ${activePostCategory === id && scss.active}`}
              >
                <a href="#" onClick={(event) => handleClickPostCategories(event, id)}>
                  {title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className={scss.card}>
        <h2 className={scss.title}>Tipos de Publicação:</h2>
        <Divider />
        <ul>
          {postTypes.map(({ id, title }) => (
            <li key={id} className={`${scss.listCategory} ${activePostType === id && scss.active}`}>
              <a href="#" onClick={(event) => handleClickPostTypes(event, id)}>
                {title}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className={scss.card}>
        <EconextLogo />
        <Divider />
        <p className={scss.info}>
          O portal associa sustentabilidade e inovação por meio das pessoas, empresas e
          organizações. A intenção é que todos nós possamos contribuir para o desenvolvimento
          consciente.
        </p>
      </div>
    </div>
  );
};

export default BlogShortcuts;
