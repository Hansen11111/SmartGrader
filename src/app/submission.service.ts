import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import firebase from 'firebase';
import { AssignmentService } from './assignment.service';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {
  getSimilarityScore: any

  constructor(private userService : UserService, private assignmentService: AssignmentService) {
  }

  public async getAllSubmission(){
    var submissionRef = firebase.database().ref().child('submission')
    var submissions : any[];
    submissions = []
    await submissionRef.once('value',(data)=>{
      submissions = data.val() ? Object.values(data.val()) : [];
    });
    return submissions;
  }

  public async getSubmissionByID(submissionID:string){
    var submissionRef = firebase.database().ref().child('submission')
    var submission : any
    await submissionRef.child(submissionID).once('value',(data)=>{
      submission = data.val() ? Object.values(data.val()) : [];
    });
    return submission;
  }

  public async createSubmission(assignmentID:string, questionID:string, studentID:string, answer:string){
    var submissionRef = firebase.database().ref().child('submission')
    return (await submissionRef.push({
      answer:answer,
      assignmentID:assignmentID,
      questionID:questionID,
      studentID:studentID,
      score:null
    })).key;
  }

  public async setSubmissionGrade(submissionID:string, score:number){
    var submission = await this.getSubmissionByID(submissionID);
    submission.set({score:score})
  }

  public async generateScore(submissionID:string){
    var submission = await this.getSubmissionByID(submissionID);
    var assignment = await this.assignmentService.getAssignmentByID(submission.assignmentID);
    //TOOD: do pyodide stuff here
    var score = this.getSimilarityScore(assignment.answer, submission.answer)
    submission.set({score:score})
  }
}
