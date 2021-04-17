import { Component, OnInit } from '@angular/core';
import firebase from 'firebase'

import {Router} from '@angular/router';
import { FormControl, Validators, PatternValidator } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);

  signin(): void {
    console.log("Signing in ...");
    if(this.email.invalid || this.password.invalid)return;

    firebase.auth().signInWithEmailAndPassword(this.email.value, this.password.value)
    .then(() => {
      if(!firebase.auth().currentUser){
        //failed to sign in
        return;
      }
      //TODO: navigate properly
      console.log('going to dashboard')
      this.router.navigate(['dashboard']);
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
    });
  }
}
