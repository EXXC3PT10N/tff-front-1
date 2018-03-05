import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppComponent } from './app.component';
import { loginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfileComponent } from './profile/profile.component';

import { AuthService } from './auth.service';
import { AuthInterceptorService } from './auth-interceptor.service';
import { RegisterPartTwoComponent } from './register-part-two/register-part-two.component';
import { RouterModule } from '@angular/router';

//git add foldery/pliki
//git commit -m "wiadomosc"
//git push tff master

//git pull origin master

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    loginComponent,
    RegisterPartTwoComponent,
    HomeComponent,
    PageNotFoundComponent,
    ProfileComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'register/:type', component: RegisterComponent},
      { path: 'registerP2', component: RegisterPartTwoComponent },
      { path: 'login', component: loginComponent },
      { path: 'home', component: HomeComponent },
      { path: 'profile', component: ProfileComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', component: PageNotFoundComponent }
    ])
  ],
  providers: [
    AuthService, {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
