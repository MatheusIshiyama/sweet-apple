import { NextFontWithVariable } from 'next/dist/compiled/@next/font';
import { Montserrat } from 'next/font/google';

const montserrat: NextFontWithVariable = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

export const fonts = {
  montserrat,
};
