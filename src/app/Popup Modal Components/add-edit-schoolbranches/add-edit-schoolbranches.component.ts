import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SchoolBranches } from '../../Models/school-branches';
import { UserServiceService } from '../../Services/user-service.service';

@Component({
  selector: 'app-add-edit-schoolbranches',
  templateUrl: './add-edit-schoolbranches.component.html',
  styleUrls: ['./add-edit-schoolbranches.component.css']
})
export class AddEditSchoolbranchesComponent implements OnInit {

  title:string;
  data:any;
  AlertMessage:any = "";
  btnText:string = "Save";
  SchoolsList:any=[];
  CountryList:any=[];
  ProvinceList:any=[];
  CityList:any=[];
  public modal = new SchoolBranches();
  constructor(public modalRef:BsModalRef, private modalService:BsModalService  ,private userService: UserServiceService) { }

  ngOnInit() {

    this.userService.HttpGet("Locations/GetAllLocations").subscribe((Data:any)=>{
      this.CountryList = Data.CountryList;
      this.ProvinceList = Data.ProvinceList;
      this.CityList = Data.CityList;
    });

    this.userService.HttpGet("SchoolManag/GetAllSchools").subscribe((Data:any)=>{
      this.SchoolsList = Data;
    });

    if(this.title == "Edit Branch")
    {
      this.modal = this.data;
      this.btnText = "Update";
    }
  }

  SubmitData(){
    if(this.btnText == "Save")
    {
      this.userService.HttpPost("SchoolBranch/AddSchoolBranch", JSON.stringify(this.modal)).subscribe((Data) => {
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
      this.userService.HttpPost("SchoolBranch/UpdateSchoolBranch", JSON.stringify(this.modal)).subscribe((Data) => {
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

}
