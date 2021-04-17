import { Component, OnInit } from '@angular/core';
import firebase from 'firebase'

import {Router} from '@angular/router';
import { FormControl, Validators, PatternValidator } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  hide = true;
  username = new FormControl('', [Validators.required])
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  userType = new FormControl('',[Validators.required])

  register(): void {
    console.log("buttons")
    if(this.password.invalid || this.email.invalid || this.userType.invalid || this.username.invalid)
      return;

    console.log("submitted");
    firebase.auth().createUserWithEmailAndPassword(this.email.value, this.password.value).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
    }).then(()=>{
      var user = firebase.auth().currentUser;
      if(user==null){
        return;
      }
      var newUserRef = firebase.database().ref().child("user/"+user.uid);
      newUserRef.set({
        username : this.username.value,
        type: this.userType.value
      });
      this.router.navigate(["dashboard"]);
    });
  }
}

