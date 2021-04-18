import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AssignmentService } from '../assignment.service';
import { SubmissionService } from '../submission.service';

@Component({
  selector: 'app-grade-view',
  templateUrl: './grade-view.component.html',
  styleUrls: ['./grade-view.component.scss']
})
export class GradeViewComponent implements OnInit,OnDestroy {

  gradeview:any
  grade:any
  data:any
  
  constructor(
    @Inject(MAT_DIALOG_DATA) data: any, 
    private assignmentService:AssignmentService, 
    private submissionService: SubmissionService,
    private dialog : MatDialog) {

    // this.gradeview = [{question: "What is your name ", ans: "I dont know ", mark: "50"}, {question : "How fast are you?", ans:"Not fast", mark:"57"},
    //                   {question: "abcd", ans: "12345", mark:"70"}, {question:"i Dont know", ans:45678, mark:99}]
    this.gradeview = []
    this.data = data
    if(data.grade == "Ungraded")
      this.grade = {gradeReceived : "NOT GRADED"}
    else
      this.grade = {gradeReceived : data.grade}
  }

  async init(){
    var submissions = await this.submissionService.getSubmissionByStudentID(this.data.studentID);
    var assignment = await this.assignmentService.getAssignmentByID(this.data.assignmentName);
    var res : any
    res = {}
    console.log(assignment)
    Object.keys(assignment.questions).forEach(questionID => {
      console.log(questionID)
      res[questionID] = {question:assignment.questions[questionID].question, ans:"Unanswered", mark:"Unmarked"}
      submissions.filter(submission=>submission.assignmentID===assignment.name && submission.questionID == questionID).forEach(submission=>{
        var mark = submission.score
        if (submission.score==null)mark = "Unmarked"
        res[questionID] = {
          submissionID:submission.submissionID,
          question:assignment.questions[questionID].question, 
          ans:submission.answer, 
          mark:mark
        }
      })
    });
  
    this.gradeview = Object.values(res);
  }
  
  async save(){
    this.gradeview.forEach(async (view:any) => {
      if(view.submissionID==undefined)return;
      await this.submissionService.setSubmissionGrade(view.submissionID, Number(view.mark));
    });
  } 

  ngOnInit(): void {
    this.init()
  }

  ngOnDestroy(): void {
    this.save();
  }

  async allocateGrade(){
    console.log("allocategrade")
    this.gradeview.forEach(async (view:any) => {
      if(view.submissionID==undefined)return;
      var score = await this.submissionService.generateScore(view.submissionID);
      console.log(score)
      view.mark = score
    });
  }

}
