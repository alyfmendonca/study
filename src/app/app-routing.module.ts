import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {ExamListScreenComponent} from "./exam-list-screen/exam-list-screen.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {ToolbarComponent} from "./toolbar/toolbar.component";
import {SettingsComponent} from "./settings/settings.component";
import {ExamComponent} from "./exam/exam.component";
import {PopupEditComponent} from "./popup-edit/popup-edit.component";

const routes: Routes = [
  {path: '', redirectTo: '/exam/1', pathMatch:'full'},
  {path: 'login', component: LoginComponent},
  {
    path: 'home',
    component: ToolbarComponent,
    children : [
      { path: '', redirectTo: 'nonformatted', pathMatch: 'full' },
      { path: 'formatted', component: ExamListScreenComponent },
      { path: 'nonformatted', component: ExamListScreenComponent },
      { path: 'print', component: ExamListScreenComponent },
      { path: 'settings', component: SettingsComponent }
    ]
  },
  {path: 'forgotpassword', component: ForgotPasswordComponent},
  {path: 'exam/:id', component: ExamComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent, ExamListScreenComponent, ForgotPasswordComponent, ToolbarComponent, SettingsComponent, ExamComponent, PopupEditComponent];
