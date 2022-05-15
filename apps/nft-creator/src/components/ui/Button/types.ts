import { ButtonHTMLAttributes } from 'react';
import { ButtonColorName } from '../../../styles';
import { BUTTON_SIZE } from './constants';

export type ButtonSize = keyof typeof BUTTON_SIZE;

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: ButtonSize;
  color?: ButtonColorName;
};

export type SizeStyle = {
  [K in ButtonSize]: {
    fontSize: string;
    lineHeight: string;
  };
};