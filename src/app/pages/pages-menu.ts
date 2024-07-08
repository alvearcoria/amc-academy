import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Home',
    icon: 'home',
    link: '/pages/home',
    home: true,
  },
  {
    title: 'Pruebas',
    icon: 'school',
    link: '/pages/prueba',
  },

  {
    title: 'Not found',
    icon: 'ban',
    link: '/pages/whatever',
  },
  {
    title: 'Salir',
    icon: 'sign-out-alt',
    link: '/pages/salir',
  }
];
