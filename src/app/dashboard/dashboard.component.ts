import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CreateAssignmentComponent } from '../create-assignment/create-assignment.component';
import { GradeAssignmentComponent } from '../grade-assignment/grade-assignment.component';
import { UserService } from '../user.service';

declare var initPyodide:any;
declare var initialized:Boolean;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  selectedStudent!: any;
  students: any[]
  isStudent: any
  userID :any

  constructor(private dialog : MatDialog, private userService:UserService, private router: Router) {
    this.students = []
  }

  async init(){
    this.students = await this.userService.getStudents()
    var id = await this.userService.getLoggedID()
    this.userID = id
    if(id==null){
      console.log("no id/not logged in")
      this.router.navigate([""])
      return;
    }
    var user = await this.userService.getUser(id)
    if(user==null){
      console.log("no user")
      this.router.navigate([""])
      return;
    }
    this.isStudent = user.type == "Student"
  }

  ngOnInit(): void {
    this.init()
    if(!initialized){
      initialized=true;
      initPyodide()
    }
  }

  async onClickStudent(){
    var studentID;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = 235;
    dialogConfig.width = "100%";
    dialogConfig.height = "100%";
    dialogConfig.autoFocus = true;
    if(this.isStudent){
      studentID = this.userID
    }
    else{
      studentID = this.selectedStudent
      if(this.selectedStudent==null)return;
    }
    dialogConfig.data = {
      studentID: studentID,
      userID: this.userID,
      isStudent: this.isStudent
    }
    
  
    var dialogRef = this.dialog.open(GradeAssignmentComponent, dialogConfig);
    var dialogSub = dialogRef.afterClosed().subscribe(() => {
      dialogSub.unsubscribe();
      this.selectedStudent = undefined;
    })
  }

  async onClickCreate(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = 600;
    dialogConfig.width = "1000px";
    dialogConfig.autoFocus = true;

    this.dialog.open(CreateAssignmentComponent, dialogConfig);
  }  
}
