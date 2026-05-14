import { CoreMenu } from '@core/types';

export const menuGestor: CoreMenu[] = [
  {
    id: 'DASHBOARD',
    title: 'DASHBOARD',
    translate: 'DASHBOARD',
    type: 'item',
    icon: 'pie-chart',
    url: 'dashboard',
  },
  {
    id: 'MI CUENTA',
    title: 'MI CUENTA',
    translate: 'MI CUENTA',
    type: 'item',
    icon: 'sliders',
    url: 'miCuenta',
  },
  {
    id: 'CLIENTES',
    title: 'CLIENTES',
    translate: 'CLIENTES',
    type: 'collapsible',
    icon: 'users',
    badge: {
      title: '1',
      translate: '1',
      classes: 'badge-light-primary badge-pill'
    },
    children: [
      {
        id: 'Consulta Clientes',
        title: 'Consulta Clientes',
        translate: 'Consulta Clientes',
        type: 'item',
        icon: 'search',
        url: 'consultaClientes'
      }
    ]
  },
  {
    id: 'PROYECTOS',
    title: 'PROYECTOS',
    translate: 'PROYECTOS',
    type: 'collapsible',
    icon: 'home',
    badge: {
      title: '2',
      translate: '2',
      classes: 'badge-light-primary badge-pill'
    },
    children: [
      {
        id: 'Consulta Proyectos',
        title: 'Consulta Proyectos',
        translate: 'Consulta Proyectos',
        type: 'item',
        icon: 'clipboard',
        url: 'consultaProyectos'
      },
      {
        id: 'Crear Proyecto',
        title: 'Crear Proyecto',
        translate: 'Crear Proyecto',
        type: 'item',
        icon: 'file-plus',
        url: 'crearProyecto'
      }
    ]
  }
];
