import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UserServiceService } from '../../Services/user-service.service';
import { FeeSetup } from '../../Models/FeeSetup';

@Component({
  selector: 'app-add-edit-feesetup',
  templateUrl: './add-edit-feesetup.component.html',
  styleUrls: ['./add-edit-feesetup.component.css']
})
export class AddEditFeesetupComponent implements OnInit {

  title:string;
  data:any;
  AlertMessage:any = "";
  btnText:string = "Save";
  SchoolsList:any=[];
  SchoolBranchesList:any=[];
  public modal = new FeeSetup();
  constructor(public modalRef:BsModalRef, private modalService:BsModalService  ,private userService: UserServiceService) { }

  ngOnInit() {
    this.LoadAllSchools();
    if(this.title == "Edit Fees")
    {
      this.LoadSchoolBranches(this.data.BranchDetail.SchoolID);
      this.modal.FeeID = this.data.FeeID;
      this.modal.SchoolID = this.data.BranchDetail.SchoolID;
      this.modal.SchoolBranchID = this.data.BranchDetail.BranchID;
      this.modal.Amount = this.data.Amount;
      this.modal.FeesName = this.data.FeesName;
      this.modal.LateCharges = this.data.LateCharges;
      this.modal.UpdatedBy = localStorage.getItem("UserID");
      this.btnText = "Update";
    }
  }

  SubmitData()
  {
    if(this.btnText == "Save")
    {
      this.userService.HttpPost("FeeSetupManag/AddFees", JSON.stringify(this.modal)).subscribe((Data) => {
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
      this.userService.HttpPost("FeeSetupManag/UpdateFees", JSON.stringify(this.modal)).subscribe((Data) => {
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
