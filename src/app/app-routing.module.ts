import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GradeAssignmentComponent } from './grade-assignment/grade-assignment.component'
import { GradeViewComponent} from './grade-view/grade-view.component'
import { SubmitAssignmentComponent} from './submit-assignment/submit-assignment.component'
import { ViewAssignmentsComponent} from './view-assignments/view-assignments.component'

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  {path: 'dashboard', component : DashboardComponent},
  {path : 'grading', component:GradeAssignmentComponent},
  {path : 'answerView', component: GradeViewComponent},
  {path : 'submitAssignment', component: SubmitAssignmentComponent},
  {path : 'viewAssignment', component : ViewAssignmentsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
