import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { CompanySelectorComponent } from './components/company-selector/company-selector.component';
import { GameListComponent } from './components/game-list/game-list.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { GameService } from './services/game.service';
import { HttpService } from './services/http.service';
import { BlockUIService } from './services/block-ui.service';
import { GenreSelectorComponent } from './components/genre-selector/genre-selector.component';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonService } from './services/common.service';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { FormsModule } from '@angular/forms';
import { GameListElementComponent } from './components/game-list-element/game-list-element.component';
import { GameDetailComponent } from './components/game-detail/game-detail.component';
import { CartIndicatorComponent } from './components/cart-indicator/cart-indicator.component';
import { LoginComponent } from './components/admin/login/login.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { GamesAdminListComponent } from './components/admin/games-admin-list/games-admin-list.component';
import { AngularSharedModule } from 'bbit-angular-shared';
import { CartService } from './services/cart.service';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { UserService } from './services/user.service';
import { LoginInfoComponent } from './components/admin/login-info/login-info.component';
import { OrderService } from './services/order.service';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { TokenInterceptor } from './services/token.interceptor';
import { GameAdminEditComponent } from './components/admin/game-admin-edit/game-admin-edit.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { hrLocale } from 'ngx-bootstrap/locale';

defineLocale('hr', hrLocale);

import { registerLocaleData } from '@angular/common';
import localeHr from '@angular/common/locales/hr';
import { FileUploadComponent } from './components/fileupload/fileupload.component';
import { NgxUploaderModule } from 'ngx-uploader';
import { TestComponent } from './components/test/test.component';

registerLocaleData(localeHr, 'hr');

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,    
    GenreSelectorComponent,
    CompanySelectorComponent,
    GameListComponent,
    SearchBarComponent,
    GameListElementComponent,
    GameDetailComponent,
    CartIndicatorComponent,
    LoginComponent,
    ShoppingCartComponent,
    GamesAdminListComponent,
    AdminHomeComponent,
    LoginInfoComponent,
    UserEditComponent,
    GameAdminEditComponent,
    FileUploadComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    PaginationModule,
    AngularSharedModule,
    TabsModule.forRoot(),
    PopoverModule.forRoot(),    
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    NgxUploaderModule
  ],
  providers: [GameService, HttpService, BlockUIService, HttpClient, CommonService, CartService, UserService, OrderService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor , multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
