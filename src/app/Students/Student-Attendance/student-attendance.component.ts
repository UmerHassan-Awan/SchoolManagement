import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../Services/user-service.service';
import { StudentAttendance } from '../../Models/StudentAttendance';

@Component({
  selector: 'app-student-attendance',
  templateUrl: './student-attendance.component.html',
  styleUrls: ['./student-attendance.component.css']
})
export class StudentAttendanceComponent implements OnInit {

  bsValue = new Date();
  modal = new StudentAttendance();
  StudentsList:any=[];
  constructor(private userService: UserServiceService) { }

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('bg-default');

    this.userService.HttpGet("GetAllStudents").subscribe((Data:any)=>{
      this.StudentsList = Data;
    })
  }

}
