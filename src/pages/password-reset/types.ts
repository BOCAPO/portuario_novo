export interface IPayloadNewPasswordData {
  new_password1: string;
  new_password2: string;
  token: string;
  uid: string;
}

export interface IToastState {
  open: boolean;
  severity: 'success' | 'error';
}
