import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginFormComponent} from './login-form/login-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SpinnersModule} from "../../../shared/ui/spinners";
import { AdminArticleCreateFormComponent } from './admin-article-create-form/admin-article-create-form.component';
import {FormControlsModule} from "../../../shared/ui/form-controls";
import { AdminArticleBaseFormComponent } from './admin-article-base-form/admin-article-base-form.component';
import { AdminArticleEditFormComponent } from './admin-article-edit-form/admin-article-edit-form.component';


@NgModule({
  declarations: [
    LoginFormComponent,
    AdminArticleCreateFormComponent,
    AdminArticleBaseFormComponent,
    AdminArticleEditFormComponent
  ],
    exports: [
        LoginFormComponent,
        AdminArticleCreateFormComponent,
        AdminArticleEditFormComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SpinnersModule,
        FormsModule,
        FormControlsModule,
    ]
})
export class AdminFormsModule {
}
