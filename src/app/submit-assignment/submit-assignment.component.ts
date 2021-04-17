import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-submit-assignment',
  templateUrl: './submit-assignment.component.html',
  styleUrls: ['./submit-assignment.component.scss']
})
export class SubmitAssignmentComponent implements OnInit {


  submission : any
  constructor() { 
    this.submission = [{question: "What is your name ", ans: "I dont know ", mark: "50"},{question : "How fast are you?", ans:"Not fast", mark:"57"}]
  }

  ngOnInit(): void {

  }
  

}
