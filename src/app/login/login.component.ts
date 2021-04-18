import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service'
import firebase from 'firebase'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    firebase.auth().signOut()
  }

}
