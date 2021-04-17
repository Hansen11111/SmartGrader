import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateAssignmentComponent } from '../create-assignment/create-assignment.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  selectedStudent!: any;
  students: any[]

  constructor(private dialog : MatDialog, private userService:UserService) {
    this.students = []
  }

  async init(){
    this.students = await this.userService.getStudents()
  }
  ngOnInit(): void {
    this.init()
  }

  async onClickStudent(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = 235;
    dialogConfig.width = "400px";
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      currentUserId: this.selectedStudent
    }
    console.log(this.selectedStudent)
    if(this.selectedStudent==null)return;
    //TODO: open a dialog box here
  }

  async onClickCreate(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = 235;
    dialogConfig.width = "400px";
    dialogConfig.autoFocus = true;

    this.dialog.open(CreateAssignmentComponent, dialogConfig);
  }  
}
