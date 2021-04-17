import { Component, Inject, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AssignmentService } from '../assignment.service';

@Component({
  selector: 'app-create-assignment',
  templateUrl: './create-assignment.component.html',
  styleUrls: ['./create-assignment.component.scss']
})
export class CreateAssignmentComponent implements OnInit {

  assignmentAnswer = ""
  assignmentQuestion = ""
  assignmentName = ""

  assignmentID = ""

  constructor(private userService:UserService, private assignmentService:AssignmentService) { }

  ngOnInit(): void {
  }

  async submit(){
    console.log("submit")
    if(this.assignmentAnswer==="" || this.assignmentQuestion===""){
      return;
    }
    console.log(this.assignmentAnswer,this.assignmentName,this.assignmentQuestion)

    if(this.assignmentID === ""){
      if(this.assignmentName === "")return;
      var id = await this.assignmentService.createAssignment(this.assignmentName)
      if(id==null){
        console.log("failed to create assignment")
        return;
      }
      this.assignmentID = id;
    }
    await this.assignmentService.addQuestion(this.assignmentID, this.assignmentQuestion, this.assignmentAnswer)

    //clear the text
    this.assignmentAnswer = ""
    this.assignmentQuestion = ""
  }
}
