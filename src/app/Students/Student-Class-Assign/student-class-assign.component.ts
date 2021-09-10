import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../Services/user-service.service';
import { StudentClassAssign } from '../../Models/StudentClassAssign';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NotifyModalComponent } from '../../Popup Modal Components/notify-modal/notify-modal.component';

@Component({
  selector: 'app-student-class-assign',
  templateUrl: './student-class-assign.component.html',
  styleUrls: ['./student-class-assign.component.css']
})
export class StudentClassAssignComponent implements OnInit {

  modal = new StudentClassAssign();
  SchoolsList:any=[];
  SchoolBranchesList:any=[];
  StudentsList:any=[];
  ClassList:any=[];
  ClassSectionsList:any=[];

  btnSubmitText:String = "Assign";
  SignLoader:Boolean = false;
  notifyRef:BsModalRef;
  constructor(private UserDataService:UserServiceService, private ModalService:BsModalService) { }

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('bg-default');
    this.LoadAllSchools();
  }

  LoadAllSchools()
  {
    this.UserDataService.HttpGet("GetAllSchools").subscribe((Data)=>{
      this.SchoolsList = Data;
    });
  }

  LoadSchoolBranches(sclID)
  {
    if(sclID !== "")
    {
      this.UserDataService.HttpGet("GetAllBranchesBy_SchoolID/"+sclID).subscribe((Data)=>{
        this.SchoolBranchesList = Data; 
      });
    }
    else
    {
      this.SchoolBranchesList = [];
    }
  }

  LoadStudent_And_Class(branchID)
  {
    if(branchID !== "")
    {
      this.UserDataService.HttpGet("GetStudentsBy_BranchID/" + branchID).subscribe((Data:any)=>{
        this.StudentsList = Data;
        //console.log(this.StudentsList);
        
      });

      this.UserDataService.HttpGet("GetClasessBy_BranchID/" + branchID).subscribe((Data:any)=>{
        this.ClassList = Data;
      });
    }
    else
    {
      this.StudentsList = [];
      this.ClassList = [];
    }
  }

  LoadClass_Sections(classID)
  {
    this.UserDataService.HttpGet("GetClassSectionsBy_ClassID/" + classID).subscribe((Data:any)=>{
      this.ClassSectionsList = Data;
    });
  }

  AssignClass()
  {
    this.btnSubmitText = "Assigning";
    this.SignLoader = true;
    this.UserDataService.HttpPost("AssignStudentClass", JSON.stringify(this.modal)).subscribe((Data)=>{
      this.btnSubmitText = "Assign";
      this.SignLoader = false;
      if(Data == "Record Inserted")
      {
        this.notifyRef = this.ModalService.show(NotifyModalComponent,{initialState:{title:'Success', data:'Class Assigned Successfully'}});
        this.modal = new StudentClassAssign();
      }
      else
      {
        this.notifyRef = this.ModalService.show(NotifyModalComponent,{initialState:{title:'Error', data:'Class Already Assigned'}});
      }
      
    });
    
  }

}
