import { AuthGuard } from './auth/auth.guard';
import { Routes } from '@angular/router';



export const routes: Routes = [
  {
      path: '',
      redirectTo: '/auth',
      pathMatch: 'full',
  },
  {
      path: 'auth',
      loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
      path: 'challenges',
      loadChildren: () => import('./challenges/challenges.module').then(m => m.ChallengesModule),
      canLoad: [AuthGuard]
  }
];
