import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userRef : firebase.database.Reference;

  constructor() {
      // Your web app's Firebase configuration
      // For Firebase JS SDK v7.20.0 and later, measurementId is optional
      var firebaseConfig = {
        apiKey: "AIzaSyDNe2W_sI63oWRto76cfFcZmCGpXz0XYNI",
        authDomain: "smart-grader.firebaseapp.com",
        databaseURL: "https://smart-grader-default-rtdb.firebaseio.com/",
        projectId: "smart-grader",
        storageBucket: "smart-grader.appspot.com",
        messagingSenderId: "1034573033106",
        appId: "1:1034573033106:web:c189232ae0fe196fa8004b",
        measurementId: "G-NWKZW8Z2GC"
      };
      // Initialize Firebase
      if (firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
        firebase.analytics();
      }
      this.userRef = firebase.database().ref().child("user");
   }

  public isLoggedIn(){
    return firebase.auth().currentUser!=null;
  }

  public getLoggedID(){
    if(!this.isLoggedIn()){
      console.log("not logged in");
      return null;
    }
    var temp = firebase.auth().currentUser;
    if(temp==null)return;
    return temp.uid;
  }

  public async getUser(uid: string) {
    var val;
    await this.userRef.child(uid).once('value',(dataSnapshot)=> {
      val = dataSnapshot.val();
    });
    return val;
  }
}
