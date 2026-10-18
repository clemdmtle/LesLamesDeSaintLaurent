import { Gamme } from './gamme.enum';

export type Couteau = {
  id: number;
  gamme: Gamme;
  lame: string;
  garde: string;
  manche: string;
  etui: string;
  prix: number;
  image: string;
  images: string[];
  photos: string[]; // chemins bruts renvoyés par l'API, ex. /uploads/xxx.jpg
  estDisponible: boolean;
};