import { MainLayoutComponent } from '#components/layout/main-layout/main-layout.component';
import { AuthGuard } from '#guards/auth.guard';
import { LoginGuard } from '#guards/login.guard';
import { USER_ROLE } from '#utils/const';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    canActivate: [LoginGuard],
    loadChildren: () => import('#components/screens/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'commons',
    loadChildren: () => import('#components/screens/commons/commons.module').then((m) => m.CommonsModule),
  },
  {
    path: 'admin',
    component: MainLayoutComponent,
    loadChildren: () => import('#components/screens/admin/admin.module').then((m) => m.AdminModule),
  },

  {
    path: '**',
    redirectTo: '/commons/error',
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
