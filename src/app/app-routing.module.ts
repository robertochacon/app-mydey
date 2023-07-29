import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { EntitiesComponent } from './components/entities/entities.component';
import { QuotesComponent } from './components/quotes/quotes.component';
import { ServicesComponent } from './components/services/services.component';
import { FormQuotesComponent } from './components/form-quotes/form-quotes.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  // {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'entities', component: EntitiesComponent},
  {path: 'quotes/:id', component: QuotesComponent},
  {path: 'services', component: ServicesComponent},
  {path: 'form-quotes/:id', component: FormQuotesComponent},
  {path: 'users', component: UsersComponent},
  {path: '**', redirectTo: '/'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
