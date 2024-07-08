import { NgModule } from '@angular/core';
import { NbAlertModule, NbCardModule, NbIconLibraries, NbIconModule, NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';

import { PagesRoutingModule } from './pages-routing.module';
//import { TranslateModule } from '@ngx-translate/core';
import { HomeComponent } from './home/home.component';
import { PruebaComponent } from './prueba/prueba.component';


@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    //TranslateModule,
    NbCardModule,
    NbAlertModule,
    NbIconModule,
    ],
  declarations: [
    PagesComponent,
    HomeComponent,
    PruebaComponent,
  ],
})
export class PagesModule {
  constructor(private iconLibraries: NbIconLibraries) {
    // Registra FontAwesome como un pack de íconos
    this.iconLibraries.registerFontPack('fas', { packClass: 'fas', iconClassPrefix: 'fa' });
    this.iconLibraries.registerFontPack('fa', { packClass: 'fa', iconClassPrefix: 'fa' });
    this.iconLibraries.registerFontPack('fab', { packClass: 'fab', iconClassPrefix: 'fa' });
    // Establece 'fas' como el paquete predeterminado
    this.iconLibraries.setDefaultPack('fas');
  }
}
