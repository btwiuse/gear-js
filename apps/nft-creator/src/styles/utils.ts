import { css, FlattenSimpleInterpolation } from 'styled-components/macro';
import {
  ActiveColors,
  BorderColors,
  ButtonColors,
  HoverColors,
  Palette,
  Theme,
  TypographyColorName,
  TypographyColors,
  WithTheme,
} from './';
import { backgroundTransparent } from './constants';
import { FONT_SIZE, LINE_HEIGHT, RobotoFontFamily } from './typography';

export const getPalette = (theme: Theme): Palette => theme.colors;

export const getHoverPalette = (theme: Theme): HoverColors => {
  const { hover } = getPalette(theme);
  return { ...hover };
};

export const getActivePalette = (theme: Theme): ActiveColors => {
  const { active } = getPalette(theme);
  return { ...active };
};

export const getBorderPalette = (theme: Theme): BorderColors => {
  const { status, basic } = getPalette(theme);
  return { ...status, ...basic };
};

export const getButtonPalette = (theme: Theme): ButtonColors => {
  const { status, basic } = getPalette(theme);
  return { ...status, ...basic };
};

export const getTypographyPalette = (theme: Theme): TypographyColors => {
  const { status, text } = getPalette(theme);
  return { ...status, ...text };
};

export const getTypographyColor = ({
  theme,
  color = 'primary',
}: WithTheme<{ color?: TypographyColorName }>): FlattenSimpleInterpolation => {
  const palette = getTypographyPalette(theme);
  return css`
    color: ${palette[color]};
  `;
};

export const baseStyles = ({ theme }: WithTheme): FlattenSimpleInterpolation => {
  const palette = getPalette(theme);
  return css`
    body {
      ${RobotoFontFamily}
      background: ${palette.background.primary};
      color: ${palette.text.primary};
      font-size: ${FONT_SIZE.m};
      line-height: ${LINE_HEIGHT.m};
    }
    #root {
    }
    input {
      ${backgroundTransparent};
      ${getTypographyColor({ theme })};
    }
  `;
};

export const fontFace = (
  name: string,
  woff2: string,
  woff: string,
  ttf: string,
  fontWeight: number | string,
): FlattenSimpleInterpolation => {
  return css`
    @font-face {
      font-family: ${name};
      src: url(${woff2}) format('woff2'), url(${woff}) format('woff'), url(${ttf}) format('truetype');
      font-weight: ${fontWeight};
      font-style: normal;
      display: swap;
    }
  `;
};
