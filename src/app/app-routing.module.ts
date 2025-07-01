import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ListingpageComponent } from './pages/listingpage/listingpage.component';

const routes: Routes = [
    { path: '', component: HomeComponent }, 
    {path: 'Login', component: LoginComponent},   
    {path: 'Listing', component: ListingpageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
