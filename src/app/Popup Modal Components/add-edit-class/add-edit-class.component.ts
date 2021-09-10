import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UserServiceService } from '../../Services/user-service.service';
import { SchoolClasses } from '../../Models/classes';


@Component({
  selector: 'app-add-edit-class',
  templateUrl: './add-edit-class.component.html',
  styleUrls: ['./add-edit-class.component.css']
})
export class AddEditClassComponent implements OnInit {

  title:string;
  data:any;
  AlertMessage:any = "";
  btnText:string = "Save";
  SchoolsList:any=[];
  SchoolBranchesList:any=[];
  public modal = new SchoolClasses();
  constructor(public modalRef:BsModalRef, private modalService:BsModalService  ,private userService: UserServiceService) { }

  ngOnInit() {
    this.LoadAllSchools();
    
    if(this.title == "Edit Class")
    {
      this.LoadSchoolBranches(this.data.BranchDetail.SchoolID);
      this.modal.ClassID = this.data.ClassID;
      this.modal.SchoolID = this.data.BranchDetail.SchoolID;
      this.modal.SchoolBranchID = this.data.BranchDetail.BranchID;
      this.modal.ClassName = this.data.ClassName;
      this.modal.UpdatedBy = localStorage.getItem("UserID");
      this.btnText = "Update";
    }
  }

  SubmitData(){
    if(this.btnText == "Save")
    {
      this.userService.HttpPost("AddNewClass", JSON.stringify(this.modal)).subscribe((Data) => {
        this.AlertMessage = Data;
        
        //If record successfully added then hide popup
        if(this.AlertMessage == "Record Inserted")
        {
          this.modalService.setDismissReason(this.AlertMessage);
          this.modalRef.hide();
        }
      });
    }
    else if(this.btnText == "Update")
    {
      this.userService.HttpPost("UpdateClass", JSON.stringify(this.modal)).subscribe((Data) => {
        this.AlertMessage = Data;
        
        //If record successfully added then hide popup
        if(this.AlertMessage == "Record Updated")
        {
          this.modalService.setDismissReason(this.AlertMessage);
          this.modalRef.hide();
        }
      });
    }
  }

  LoadAllSchools()
  {
    this.userService.HttpGet("SchoolManag/GetAllSchools").subscribe((Data)=>{
      this.SchoolsList = Data;
    });
  }

  LoadSchoolBranches(sclID)
  {
    if(sclID !== "")
    {
      this.userService.HttpGet("SchoolBranch/GetAllBranchesBy_SchoolID/"+sclID).subscribe((Data)=>{
        this.SchoolBranchesList = Data; 
      });
    }
    else
    {
      this.SchoolBranchesList = [];
    }
  }

}
