import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { ChatsComponent } from './chats/chats.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ChatmessageComponent } from './chatmessage/chatmessage.component';
import { ButtonComponent } from './components/UI/button/button.component';
import { OpenModalDirective } from './directives/open-modal.directive';
import { ModalService } from './directives/modal.sercive';
import { AuthComponent } from './components/auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    ChatsComponent,
    NavbarComponent,
    ChatmessageComponent,
    ButtonComponent,
    OpenModalDirective,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({}, {}),
  ],
  providers: [ModalService],
  bootstrap: [AppComponent],
})
export class AppModule {}
