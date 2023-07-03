import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
//import { ConvertToolComponent } from './components/convert-tool/convert-tool.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/account/login.component';
import { RegisterComponent } from './components/account/register.component';
import { ConvertToolBisComponent } from './components/convert-tool-bis/convert-tool-bis.component';
import { RandomTunesComponent } from './components/random-tunes/random-tunes.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  //{ path: 'toConvertToolComponent', component: ConvertToolComponent },
  { path: 'convertPage', component: ConvertToolBisComponent },
  { path: 'randomTunes', component: RandomTunesComponent },
  { path: 'account/login', component: LoginComponent },
  { path: 'account/register', component: RegisterComponent },
      // otherwise redirect to home
      { path: '**', redirectTo: '' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
