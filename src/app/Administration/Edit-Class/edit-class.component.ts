import { Component, OnInit } from '@angular/core';
import { SchoolClasses } from '../../Models/Classes';
import { UserServiceService } from '../../Services/user-service.service';
import { MultiselectDropdownSettingService } from '../../Services/multiselect-dropdown-setting.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-class',
  templateUrl: './edit-class.component.html',
  styleUrls: ['./edit-class.component.css']
})
export class EditClassComponent implements OnInit {

  SchoolsList:any=[];
  SchoolBranchesList:any=[];
  MultiSelectSetting:any = [];
  SelectedSchool = [];
  SelectedBranch = [];
  public modal = new SchoolClasses();

  constructor(private userService: UserServiceService, private multiselect_service:MultiselectDropdownSettingService, 
    private notify: ToastrService, private router:Router, private activeRoute:ActivatedRoute) { }

  ngOnInit() 
  { 
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('bg-default');
    
    let classID = this.activeRoute.snapshot.params.classID;

    this.MultiSelectSetting = this.multiselect_service.MultiSelect_DDSettings;
    
    this.userService.HttpGet("ClassManag/GetClasessByID?classID=" + classID).subscribe((Data:any)=>
    {
      this.modal = Data;
      this.LoadSchoolBranches(this.modal.SchoolBranchID);
    });

    
  }

  LoadSchoolBranches(branchID)
  {
    this.userService.HttpGet("SchoolBranch/GetBranchByID?branchID=" + branchID).subscribe((Data:any)=>{
      this.LoadInitalData(Data.SchoolID);
      this.SelectedBranch.push(Data);
      this.LoadSchools(Data.SchoolID);
    });
  }

  LoadSchools(sclID)
  {
    this.userService.HttpGet("SchoolManag/GetSchoolByID?SclID=" + sclID).subscribe((Data)=>{
      this.SelectedSchool.push(Data);
    });
  }

  LoadInitalData(sclID)
  {
    this.userService.HttpGet("SchoolManag/GetAllSchools").subscribe((Data)=>{
      this.SchoolsList = Data;
    });

    this.userService.HttpGet("SchoolBranch/GetAllBranchesBy_SchoolID?sclID=" + sclID).subscribe((Data)=>{
      this.SchoolBranchesList = Data; 
    });
  }

  SubmitData()
  {
    
    this.modal.SchoolID = this.SelectedSchool[0].SchoolID;
    this.modal.SchoolBranchID = this.SelectedBranch[0].BranchID;
    this.modal.UpdatedBy = localStorage.getItem("UserID");

    console.log(this.modal);
    
    this.userService.HttpPost("ClassManag/UpdateClass", JSON.stringify(this.modal)).subscribe(
      (Data:any) => 
      {
        if (Data == "Record Updated") 
        {
          this.notify.success("Class Updated Successfully!");
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

}
