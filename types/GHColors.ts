import { GH_COLORS } from '../constants/GH_COLORS';

export type GHColors = {
  [key in keyof typeof GH_COLORS]: string;
};
