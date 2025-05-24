import { useRouter } from 'next/router';

import { MouseEvent } from 'react';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { setActivePostType, setActivePostCategory } from '~hooks/store/UseNewsFilters';

interface IOptionsListProps {
  id?: number;
  name: string;
  link: string;
}

interface IAnchorMenuProps {
  optionsList: IOptionsListProps[];
  anchorEl: null | HTMLElement;
  handleClose: () => void;
}

const AnchorMenu = ({ anchorEl, handleClose, optionsList }: IAnchorMenuProps) => {
  const router = useRouter();

  const handleClick = (_: MouseEvent, { id, link }: IOptionsListProps) => {
    handleClose();

    if (link !== 'backdropClick') {
      if (id) {
        setActivePostType(id);
      } else {
        setActivePostType(0);
        setActivePostCategory(0);
      }

      router.push(link);
    }
  };

  return (
    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => handleClose()}>
      {optionsList.map((option: IOptionsListProps) => {
        const { name } = option;

        return (
          <MenuItem
            key={name}
            sx={{ fontSize: '1.6rem', minWidth: '15rem' }}
            onClick={(event) => handleClick(event, option)}
          >
            {name}
          </MenuItem>
        );
      })}
    </Menu>
  );
};

export default AnchorMenu;
