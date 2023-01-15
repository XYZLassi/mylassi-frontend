import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
    declarations: [
        LoginFormComponent
    ],
    exports: [
        LoginFormComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule
    ]
})
export class FormsModule { }
