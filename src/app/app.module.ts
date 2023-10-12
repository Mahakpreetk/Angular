import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { NavComponent } from './nav/nav.component';
import { SidebarComponent } from './sidebar/sidebar.component'; // Import NavComponent
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NewService } from './services/new.service';

import { EditModalComponent } from './edit-modal/edit-modal.component';
import { SaleService } from './sale.service';
import { SaleUpdateService } from './sale-update.service';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NavComponent,
    SidebarComponent,
    EditModalComponent // Include NavComponent in the declarations
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule, HttpClientModule],
  providers: [NewService,SaleService,SaleUpdateService],
  bootstrap: [AppComponent],
})
export class AppModule {}
