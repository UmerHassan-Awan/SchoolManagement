import { Component, OnInit } from '@angular/core';
import { SchoolBranches } from '../../Models/school-branches';
import { UserServiceService } from '../../Services/user-service.service';
import { MultiselectDropdownSettingService } from '../../Services/multiselect-dropdown-setting.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-school-branch',
  templateUrl: './edit-school-branch.component.html',
  styleUrls: ['./edit-school-branch.component.css']
})
export class EditSchoolBranchComponent implements OnInit {

  SchoolsList:any=[];
  CountryList:any=[];
  ProvinceList:any=[];
  CityList:any=[];
  MultiSelectSetting:any = [];
  SelectedSchool = [];
  public modal = new SchoolBranches();
  
  constructor(private userService: UserServiceService, private multiselect_service:MultiselectDropdownSettingService, 
    private notify: ToastrService, private router:Router, private activeRoute:ActivatedRoute) { }

  ngOnInit() 
  {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('bg-default');

    let branchID = this.activeRoute.snapshot.params.branchID;

    this.MultiSelectSetting = this.multiselect_service.MultiSelect_DDSettings;
    
    this.userService.HttpGet("SchoolBranch/GetBranchByID?branchID=" + branchID).subscribe((Data:any)=>{
      this.modal = Data;
      this.SelectedSchool.push(Data.SchoolInfo);
    });

    this.userService.HttpGet("Locations/GetAllLocations").subscribe((Data:any)=>{
      this.CountryList = Data.CountryList;
      this.ProvinceList = Data.ProvinceList;
      this.CityList = Data.CityList;
    });

    this.userService.HttpGet("SchoolManag/GetAllSchools").subscribe((Data:any)=>{
      this.SchoolsList = Data;
    });
  }

  SubmitData()
  {
    this.modal.SchoolID = this.SelectedSchool[0].SchoolID;

    this.userService.HttpPost("SchoolBranch/UpdateSchoolBranch", JSON.stringify(this.modal)).subscribe(
      (Data:any) => 
      {
        if (Data == "Record Updated") 
        {
          this.notify.success(Data);
          this.router.navigate(['/SchoolBranches']);
        }
      },
      (error) => { this.notify.error(error.error.Message);}
    );
  }
  

}
