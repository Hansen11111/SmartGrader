import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-assignments',
  templateUrl: './view-assignments.component.html',
  styleUrls: ['./view-assignments.component.scss']
})
export class ViewAssignmentsComponent implements OnInit {

  assignment : any
  constructor() { 
    this.assignment = [{name: "Science", submitted : "False"}, {name:'Arts', submitted : "False"}, {name:"Engineering", submitted : "False"}]
  }

  ngOnInit(): void {
  }

}
