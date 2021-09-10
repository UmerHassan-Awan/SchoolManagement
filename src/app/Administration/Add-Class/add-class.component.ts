import { Component, OnInit } from '@angular/core';
import { SchoolClasses } from '../../Models/Classes';
import { SchoolBranches } from '../../Models/school-branches';
import { UserServiceService } from '../../Services/user-service.service';
import { MultiselectDropdownSettingService } from '../../Services/multiselect-dropdown-setting.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css']
})
export class AddClassComponent implements OnInit {

  SchoolsList:any=[];
  SchoolBranchesList:any=[];
  MultiSelectSetting:any = [];
  SelectedSchool = [];
  SelectedBranch = [];
  public modal = new SchoolClasses();

  constructor(private userService: UserServiceService, private multiselect_service:MultiselectDropdownSettingService, 
    private notify: ToastrService, private router:Router) { }

  ngOnInit() 
  {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('bg-default');

    this.MultiSelectSetting = this.multiselect_service.MultiSelect_DDSettings;

    this.userService.HttpGet("SchoolManag/GetAllSchools").subscribe((Data)=>{
      this.SchoolsList = Data;
    });
  }

  SubmitData()
  {
    this.modal.SchoolID = this.SelectedSchool[0].SchoolID;
    this.modal.SchoolBranchID = this.SelectedBranch[0].BranchID;
    this.modal.EnteredBy = localStorage.getItem("UserID");

    this.userService.HttpPost("ClassManag/AddNewClass", JSON.stringify(this.modal)).subscribe(
      (Data:any) => 
      {
        if (Data == "Record Inserted") 
        {
          this.notify.success("Class Inserted Successfully!");
          this.router.navigate(['/ClassManagement']);
        }
        else if(Data == "Record Exists")
        {
          this.notify.error("Class Already Exist!");
        }
      },
      (error) => { this.notify.error(error.error.Message);}
    );
    
  }

  SaveAndMore()
  {
    this.modal.SchoolID = this.SelectedSchool[0].SchoolID;
    this.modal.SchoolBranchID = this.SelectedBranch[0].BranchID;

    this.userService.HttpPost("ClassManag/AddNewClass", JSON.stringify(this.modal)).subscribe(
      (Data:any) => 
      {
        if (Data == "Record Inserted") 
        {
          this.notify.success("Class Inserted Successfully!");
          this.modal.ClassName = "";
        }
      },
      (error) => { this.notify.error(error.error.Message);}
    );
  }

  LoadSchoolBranches(event)
  {
    this.userService.HttpGet("SchoolBranch/GetAllBranchesBy_SchoolID?sclID=" + event.SchoolID).subscribe((Data)=>{
      this.SchoolBranchesList = Data; 
    });
  }

}
