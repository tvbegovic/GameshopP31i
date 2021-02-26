import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { GameAdminEditComponent } from './components/admin/game-admin-edit/game-admin-edit.component';
import { GamesAdminListComponent } from './components/admin/games-admin-list/games-admin-list.component';
import { LoginComponent } from './components/admin/login/login.component';
import { GameDetailComponent } from './components/game-detail/game-detail.component';
import { HomeComponent } from './components/home/home.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';

const routes: Routes = [
    { path: '',component: HomeComponent },
    { path: 'game/:id', component: GameDetailComponent},
    { path: 'admin/games', component: GamesAdminListComponent},
    { path: 'login', component: LoginComponent},
    { path: 'admin', component: AdminHomeComponent },
    { path: 'admin/game/:id', component: GameAdminEditComponent },
    { path: 'cart', component: ShoppingCartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
