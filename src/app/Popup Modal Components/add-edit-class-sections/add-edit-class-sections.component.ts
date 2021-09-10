import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UserServiceService } from '../../Services/user-service.service';
import { ClassSections } from '../../Models/ClassSections';

@Component({
  selector: 'app-add-edit-class-sections',
  templateUrl: './add-edit-class-sections.component.html',
  styleUrls: ['./add-edit-class-sections.component.css']
})
export class AddEditClassSectionsComponent implements OnInit {

  title:string;
  data:any;
  AlertMessage:any = "";
  btnText:string = "Save";
  SchoolsList:any=[];
  SchoolBranchesList:any=[];
  BranchClassesList:any=[];
  public modal = new ClassSections();
  constructor(public modalRef:BsModalRef, private modalService:BsModalService  ,private userService: UserServiceService) { }

  ngOnInit() {
    this.LoadAllSchools();
    if(this.title == "Edit Class Section")
    {
      this.LoadSchoolBranches(this.data.ClassDetail.BranchDetail.SchoolID);
      this.LoadBranchClasses(this.data.ClassDetail.BranchDetail.BranchID);
      this.modal.ClassSectionID = this.data.ClassSectionID;
      this.modal.ClassID = this.data.ClassDetail.ClassID;
      this.modal.SchoolID = this.data.ClassDetail.BranchDetail.SchoolID;
      this.modal.SchoolBranchID = this.data.ClassDetail.BranchDetail.BranchID;
      this.modal.SectionName = this.data.SectionName;
      this.modal.UpdatedBy = localStorage.getItem("UserID");
      this.btnText = "Update";
    }
  }

  SubmitData(){
    if(this.btnText == "Save")
    {
      this.userService.HttpPost("ClassSectManag/AddClassSection", JSON.stringify(this.modal)).subscribe((Data) => {
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
      //console.log(JSON.stringify(this.modal));
      
      this.userService.HttpPost("ClassSectManag/UpdateClassSection", JSON.stringify(this.modal)).subscribe((Data) => {
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

  LoadBranchClasses(branchID)
  {
    if(branchID !== "")
    {
      this.userService.HttpGet("ClassManag/GetClasessBy_BranchID/"+branchID).subscribe((Data)=>{
        this.BranchClassesList = Data; 
      });
    }
    else
    {
      this.BranchClassesList = [];
    }
  }

}
