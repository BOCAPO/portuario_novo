export enum EListBackground {
  backgroundGray900 = 'backgroundGray900',
  backgroundGray800 = 'backgroundGray800',
  backgroundGrayGradient = 'backgroundGrayGradient',
  backgroundIce = 'backgroundIce',
  backgroundWhite = 'backgroundWhite',
  backgroundBlack = 'backgroundBlack',
}

export type TContainerProps = {
  id?: string;
  className?: string;

  children: React.ReactNode;
  backgroundColor?: keyof typeof EListBackground;
};
