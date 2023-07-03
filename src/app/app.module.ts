import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
//import { ConvertToolComponent } from './components/convert-tool/convert-tool.component';
import { AppRoutingModule } from './app-routing.module';
import { ConverterService } from './components/services/converter.service';
import { CapoComponent } from './components/capo/capo.component';
import { TranspositionComponent } from './components/transposition/transposition.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent, RegisterComponent } from './components/account';
import { JwtInterceptor, ErrorInterceptor, fakeBackendProvider } from './components/_helpers';
import { FooterComponent } from './shared/footer/footer.component';
//import { ConvertToolBisComponent } from './components/convert-tool-bis/convert-tool-bis.component';
//import { ConvertToolBisComponent } from "./components/convert-tool-bis";
import { ConvertToolBisComponent } from './components/convert-tool-bis/convert-tool-bis.component';
import { RandomTunesComponent } from './components/random-tunes/random-tunes.component';


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    //ConvertToolComponent,
    CapoComponent,
    TranspositionComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    ConvertToolBisComponent,
    RandomTunesComponent,


    /* HeaderComponent,
    ConvertToolComponent,
    CapoComponent,
    TranspositionComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    ConvertToolBisComponent, */
  ],
  providers: [ConverterService,

    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider,
],
  bootstrap: [AppComponent]
})
export class AppModule { }
