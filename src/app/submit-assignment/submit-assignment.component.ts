import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AssignmentService } from '../assignment.service';
import { SubmissionService } from '../submission.service';

@Component({
  selector: 'app-submit-assignment',
  templateUrl: './submit-assignment.component.html',
  styleUrls: ['./submit-assignment.component.scss']
})
export class SubmitAssignmentComponent implements OnInit {


  submission : any[]
  data:any

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any, 
    private assignmentService:AssignmentService, 
    private submissionService: SubmissionService,) { 

    // this.submission = [{question: "What is your name ", ans: "I dont know ", mark: "50"},{question : "How fast are you?", ans:"Not fast", mark:"57"}]
    this.submission = []
    this.data = data
  }

  async init(){
    var assignment = await this.assignmentService.getAssignmentByID(this.data.assignmentName);
    var res : any
    res = {}
    console.log(assignment)
    Object.keys(assignment.questions).forEach(questionID => {
      console.log(questionID)
      res[questionID] = {questionID:questionID, question:assignment.questions[questionID].question, ans:"Unanswered"}
      
    });
  
    this.submission = Object.values(res);
  }

  ngOnInit(): void {
    this.init();
  }
  
  async onSubmit(){
    this.submission.forEach(async (submission)=>{
      await this.submissionService.createSubmission(this.data.assignmentName, submission.questionID, this.data.studentID, submission.ans)
    })
  }

}
