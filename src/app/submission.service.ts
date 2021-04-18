import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import firebase from 'firebase';
import { AssignmentService } from './assignment.service';
declare var getSimilarityScore:any

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {
  

  constructor(private userService : UserService, private assignmentService: AssignmentService) {
  }

  public async getAllSubmission(){
    var submissionRef = firebase.database().ref().child('submission')
    var submissions : any[];
    submissions = []
    await submissionRef.once('value',(data)=>{
      var temp = data.val()
      if(temp==null)return;
      Object.keys(temp).forEach(key=>{  
        // put the studentid in the result
        temp[key]["submissionID"] = key
        submissions.push(temp[key])
      });
    });
    return submissions;
  }

  public async getSubmissionByID(submissionID:string){
    var submissionRef = firebase.database().ref().child('submission')
    var submission : any
    await submissionRef.child(submissionID).once('value',(data)=>{
      submission = data.val()
      if(submission==undefined)return;
      submission["submissionID"] = data.key
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
    var submissionRef = firebase.database().ref().child('submission').child(submissionID)
    submissionRef.update({score:score})
  }

  public async generateScore(submissionID:string){
    var submission = await this.getSubmissionByID(submissionID);
    var question = await this.assignmentService.getAssignmentQuestion(submission.assignmentID, submission.questionID);
    var score = getSimilarityScore(question.answer, submission.answer)
    return score
  }

  public async getSubmissionByStudentID(studentID:string){
    var submission = await this.getAllSubmission()
    return submission.filter(submission=>submission.studentID === studentID)
  }
}
