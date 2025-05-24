import CreateStore from '~zustand/index';

interface IUserProps {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  image: string | null;
  description: string | null;
  cpf: string | null;
}

interface ILoginState {
  user: IUserProps | null;
}

const initialStore: ILoginState = {
  user: null,
};

export const useLoginStore = CreateStore<ILoginState>(() => initialStore, 'LoginStore');

export const setUser = (user: IUserProps | null) => {
  useLoginStore.setState({ user });
};
