import { LOCALE_ID, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThemeModule } from './@theme/theme.module';
import { NbDialogModule, NbMenuModule, NbSidebarModule, NbToastrModule, NbWindowModule } from '@nebular/theme';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule, HttpRequest } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { ROOT_REDUCERS, metaReducers } from './@reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { APP_BASE_HREF, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NB_AUTH_TOKEN_INTERCEPTOR_FILTER, NbTokenStorage } from '@nebular/auth';
import { JWTInterceptor } from './@interceptors/jwt.interceptor';
import { ResponseInterceptor } from './@interceptors/response.interceptor';
import { NbCustomTokenStorage } from './@core/utils.ts/customtokenstorage';
import { CoreModule } from './@core/core.module';
import { I18nModule } from './@i18n/i18n.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { initializeAppCheck, ReCaptchaEnterpriseProvider, provideAppCheck } from '@angular/fire/app-check';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { environment } from "../environments/environment";
import { NgxAuthModule } from './@auth/auth.module';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

function filterInterceptorRequest(req: HttpRequest<any>): boolean {
  return ['/api/v1/auth/login','/api/v1/auth/refresh-token']
    .some(url => req.url.includes(url));
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    I18nModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    NbMenuModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    TranslateModule.forRoot(
      {
        defaultLanguage: 'en-US',
        isolate: false,
        loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
        }
      }
    ),
    StoreModule.forRoot(ROOT_REDUCERS, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true
      }
    }),
    StoreDevtoolsModule.instrument({
      name: 'PNET CUSTOM'
    }),
    StoreRouterConnectingModule.forRoot(),
    NgbModule,
    NgxAuthModule,
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true},
    { provide: NB_AUTH_TOKEN_INTERCEPTOR_FILTER, useValue: filterInterceptorRequest },
    {provide: APP_BASE_HREF, useValue: "/" },
    { provide: NbTokenStorage, useClass: NbCustomTokenStorage },
    { provide: LOCALE_ID, useValue: 'it-IT'},
    provideFirebaseApp(() => initializeApp({"projectId":"amc-academy-7dd40","appId":"1:982667293587:web:ca9a6b989acad4d64dee66","storageBucket":"amc-academy-7dd40.appspot.com","apiKey":"AIzaSyCNiBGxFMjpJperBt5d27q861LRe04aSrI","authDomain":"amc-academy-7dd40.firebaseapp.com","messagingSenderId":"982667293587","measurementId":"G-LLS6Z6PL89"})),
    provideAuth(() => getAuth()),
    provideAnalytics(() => getAnalytics()),
    ScreenTrackingService,
    UserTrackingService,
/*     provideAppCheck(() => {
      // TODO get a reCAPTCHA Enterprise here https://console.cloud.google.com/security/recaptcha?project=_
      const provider = new ReCaptchaEnterpriseProvider(/* reCAPTCHA Enterprise site key * /);
      return initializeAppCheck(undefined, { provider, isTokenAutoRefreshEnabled: true });
    }), */
    provideFirestore(() => getFirestore()),

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
