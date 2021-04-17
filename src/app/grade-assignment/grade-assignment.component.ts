import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grade-assignment',
  templateUrl: './grade-assignment.component.html',
  styleUrls: ['./grade-assignment.component.scss']
})
export class GradeAssignmentComponent implements OnInit {

  studentAssignments : any
  constructor() {

    this.studentAssignments = [{name:"Science",grade:"10", submitted: "True"}, {name:"Physics",grade:"10", submitted: "True"}]

   }

  ngOnInit(): void {
  }

}
