import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() {}
  selectedStudent!: string;

  ngOnInit(): void {
  }

  students: any[] = [
    {value: 'Adam', viewValue: 'Adam'},
    {value: 'Hansen', viewValue: 'Hansen'},
    {value: 'mercedes', viewValue: 'Mercedes'}
  ];

}
