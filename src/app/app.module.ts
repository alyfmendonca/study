import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule, MatGridListModule, MatIconModule, MatTableModule} from "@angular/material";
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {HttpClientModule} from "@angular/common/http";
import {AuthService} from "./service/auth.service";
import {NgxWebstorageModule} from "ngx-webstorage";
import {FormsModule} from "@angular/forms";
import {StudyService} from "./service/study.service";
import { FlexLayoutModule } from '@angular/flex-layout';
import {PopupEditComponent} from "./popup-edit/popup-edit.component";
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    FormsModule,
    MatTableModule,
    MatGridListModule,
    FlexLayoutModule,
    MatDialogModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    DragDropModule
  ],
  entryComponents: [
    PopupEditComponent,
  ],
  providers: [AuthService, StudyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
