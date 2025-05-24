import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Button from '@mui/material/Button';
import Router from 'next/router';

interface IButtonBack{
  linkTo: string;
  label:string;
}

const ButtonBack = (props:IButtonBack) => {
  const redirectTo = async () => {
    Router.push(`${props.linkTo}`);
  };
  return (
    <Button variant="text" onClick={()=>redirectTo()} startIcon={<KeyboardBackspaceIcon />}>
    {props.label}
  </Button>);
}

export default ButtonBack;
