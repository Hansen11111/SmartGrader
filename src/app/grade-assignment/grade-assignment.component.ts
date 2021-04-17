import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AssignmentService } from '../assignment.service';
import { SubmissionService } from '../submission.service';

@Component({
  selector: 'app-grade-assignment',
  templateUrl: './grade-assignment.component.html',
  styleUrls: ['./grade-assignment.component.scss']
})
export class GradeAssignmentComponent implements OnInit {

  studentAssignments : any[]
  data:any
  constructor(
    @Inject(MAT_DIALOG_DATA) data: any, 
    private assignmentService:AssignmentService, 
    private submissionService: SubmissionService) {

    this.studentAssignments = []
    // this.studentAssignments = [{name:"Science",grade:"10", submitted: "True"}, {name:"Physics",grade:"10", submitted: "True"}]
    this.data = data
  }

  async init(){
    var submissions = await this.submissionService.getSubmissionByStudentID(this.data.studentID);
    var assignments = await this.assignmentService.getAllAssignment();
    var res : any
    res = {}
    assignments.forEach(assignment=>{
      var total_mark = 0
      var cnt_mark = 0
      var cnt_ungraded = 0
      submissions.filter(submission=>submission.assignmentID===assignment.name).forEach(submission=>{
        if (submission.score==null){
          cnt_ungraded++;
        }
        else
          total_mark += submission.score
        cnt_mark++
      })
      var grade:string;
      var submitted:string;
      
      if (cnt_mark == 0){
        grade = "Ungraded"
        submitted = "False"
      }
      else if(cnt_mark == cnt_ungraded){
        grade = "Ungraded"
        submitted = "True"
      }
      else {
        var num_questions = Object.values(assignment.questions).length
        grade = (total_mark / num_questions).toString()
        submitted = "True"
      }
      res[assignment.name] = {name:assignment.name, grade:grade, submitted: submitted}
    })
    this.studentAssignments = Object.values(res);
  }
  
  ngOnInit(): void {
    this.init()
  }

}
