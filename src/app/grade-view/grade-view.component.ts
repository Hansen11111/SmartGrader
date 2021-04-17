import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grade-view',
  templateUrl: './grade-view.component.html',
  styleUrls: ['./grade-view.component.scss']
})
export class GradeViewComponent implements OnInit {

  gradeview:any
  grade:any

  constructor() {
    this.gradeview = [{question: "What is your name ", ans: "I dont know ", mark: "50"}, {question : "How fast are you?", ans:"Not fast", mark:"57"},
                      {question: "abcd", ans: "12345", mark:"70"}, {question:"i Dont know", ans:45678, mark:99}]
        
    this.grade = {gradeReceived : "NOT GRADED"}

   }
  ngOnInit(): void {
  }

}
