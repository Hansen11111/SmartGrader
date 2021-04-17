import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";

import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { ReactiveFormsModule} from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule, TooltipPosition } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TitleComponent } from './title/title.component';
import { RegisterComponent } from './register/register.component';
import { SigninComponent } from './signin/signin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateAssignmentComponent } from './create-assignment/create-assignment.component';
import { GradeAssignmentComponent } from './grade-assignment/grade-assignment.component';
import { GradeViewComponent } from './grade-view/grade-view.component';
import { SubmitAssignmentComponent } from './submit-assignment/submit-assignment.component';
import { ViewAssignmentsComponent } from './view-assignments/view-assignments.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TitleComponent,
    RegisterComponent,
    SigninComponent,
    DashboardComponent,
    CreateAssignmentComponent,
    GradeAssignmentComponent,
    GradeViewComponent,
    SubmitAssignmentComponent,
    ViewAssignmentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatCardModule,
    MatListModule,
    MatChipsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
