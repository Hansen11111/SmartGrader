import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  constructor(private userService : UserService) { 
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
      assignment = data.val() ? Object.values(data.val()) : [];
    });
    return assignment;
  }

  public async getAssignmentQuestion(assignmentID:string,questionID:string){
    var assignmentRef = firebase.database().ref().child('assignment')
    var assignment : any
    await assignmentRef.child(assignmentID).child(questionID).once('value',(data)=>{
      assignment = data.val() ? Object.values(data.val()) : [];
    });
    return assignment;
  }

  public async createAssignment(){
    var assignmentRef = firebase.database().ref().child('assignment')
    return (await assignmentRef.push({questions:[]})).key;
  }

  public async addQuestion(assignmentID:string, question:string, answer:string){
    var assignment = await this.getAssignmentByID(assignmentID)
    return (await assignment.push({question:question,answer:answer})).key;
  }

}
