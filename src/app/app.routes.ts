import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    loadComponent: () =>
      import('./components/pages/jobs-listing/jobs-listing').then(
        (component) => component.JobsListing,
      ),
  },
];
