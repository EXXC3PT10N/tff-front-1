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

import { AuthService } from './services/auth.service';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { RegisterPartTwoComponent } from './register-part-two/register-part-two.component';
import { RouterModule } from '@angular/router';
import { LoginGuardService } from './services/login-guard.service';
import { ProfileService } from './services/profile.service';
import { RegisterPartThreeComponent } from './register-part-three/register-part-three.component';
import { AskComponent } from './ask/ask.component';
import { AskService } from './services/ask.service';
import { TestComponent } from './test/test.component';
import { MyAskComponent } from './my-ask/my-ask.component';
import { BidComponent } from './bid/bid.component';
import { BidService } from './services/bid.service';
import { ParallaxTestComponent } from './parallax-test/parallax-test.component';

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
    ProfileComponent,
    RegisterPartThreeComponent,
    AskComponent,
    TestComponent,
    MyAskComponent,
    BidComponent,
    ParallaxTestComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'register', component: RegisterComponent},
      { path: 'registerP2/:type',
          canActivate: [ LoginGuardService ],
          component: RegisterPartTwoComponent },
      { path: 'registerP3',
          canActivate: [ LoginGuardService ],
          component: RegisterPartThreeComponent },
      { path: 'login', component: loginComponent },
      { path: 'ask', canActivate: [ LoginGuardService ], component: AskComponent },
      { path: 'myAsk', canActivate: [ LoginGuardService ], component: MyAskComponent },
      { path: 'bid', canActivate: [ LoginGuardService ], component: BidComponent },
      { path: "test", component: TestComponent },
      { path: 'home', component: HomeComponent },
      { path: 'profile',
          canActivate: [ LoginGuardService ], 
          component: ProfileComponent },
      { path: 'parallax', component: ParallaxTestComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', component: PageNotFoundComponent }
    ])
  ],
  providers: [
    AuthService, {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
      
    },
    LoginGuardService,
    ProfileService,
    AskService,
    BidService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
