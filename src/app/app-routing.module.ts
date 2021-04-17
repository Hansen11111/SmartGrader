import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GradeAssignmentComponent } from './grade-assignment/grade-assignment.component'
import { GradeViewComponent} from './grade-view/grade-view.component'

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  {path: 'dashboard', component : DashboardComponent},
  {path : 'grading', component:GradeAssignmentComponent},
  {path : 'answerView', component: GradeViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
