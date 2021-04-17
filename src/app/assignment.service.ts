import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  constructor(private userService : UserService) { 
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
    console.log(firebase.apps.length,"initialized")
  }

  public async getAllAssignment(){
    var assignmentRef = firebase.database().ref().child('assignment')
    var assignments : any[];
    assignments = []
    await assignmentRef.once('value',(data)=>{
      assignments = data.val() ? Object.values(data.val()) : [];
    });
    return assignments;
  }

  public async getAssignmentByID(assignmentID:string){
    var assignmentRef = firebase.database().ref().child('assignment')
    var assignment : any
    await assignmentRef.child(assignmentID).once('value',(data)=>{
      assignment = data.val();
    });
    return assignment;
  }

  public async getAssignmentQuestion(assignmentID:string,questionID:string){
    var assignmentRef = firebase.database().ref().child('assignment')
    var assignment : any
    await assignmentRef.child(assignmentID).child('questions').child(questionID).once('value',(data)=>{
      assignment = data.val();
    });
    return assignment;
  }

  public async createAssignment(name:string){
    var assignmentRef = firebase.database().ref().child('assignment').child(name)
    await assignmentRef.set({name:name, questions:[]});
    return name;
  }

  public async addQuestion(assignmentID:string, question:string, answer:string){
    var assignmentRef = firebase.database().ref().child('assignment').child(assignmentID).child('questions')
    
    return (await assignmentRef.push({question:question,answer:answer})).key;
  }

}
