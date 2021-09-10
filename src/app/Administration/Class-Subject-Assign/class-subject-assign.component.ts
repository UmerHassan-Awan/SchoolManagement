import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../Services/user-service.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NotifyModalComponent } from '../../Popup Modal Components/notify-modal/notify-modal.component';


@Component({
  selector: 'app-class-subject-assign',
  templateUrl: './class-subject-assign.component.html',
  styleUrls: ['./class-subject-assign.component.css']
})
export class ClassSubjectAssignComponent implements OnInit {

  SchoolsList:any=[];
  SchoolBranchesList:any=[];
  ClassList:any=[];
  SignLoader:Boolean = false;
  notifyRef:BsModalRef;
  MultidropdownSettings = {};
  dropdownList = [];
  selectedSchoolItem = [];
  selectedBranchItem = [];
  constructor(private UserDataService:UserServiceService, private ModalService:BsModalService) { }

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('bg-default');
    this.LoadAllSchools();
    
    this.MultidropdownSettings=
    {
      SchoolDropdownSetting:
      {
        singleSelection: true,
        text: "Select School",
        labelKey: "SchoolName",
        primaryKey: "SchoolID",
        enableSearchFilter: true,
        classes: "myclass custom-class",
        disabled: false
      },
      SchoolBranchDropdownSetting:
      {
        singleSelection: true,
        text: "Select Branch",
        labelKey: "BranchName",
        primaryKey: "BranchID",
        enableSearchFilter: true,
        classes: "myclass custom-class",
        disabled: false
      }
    }
  }

  LoadAllSchools()
  {
    this.UserDataService.HttpGet("SchoolManag/GetAllSchools").subscribe((Data)=>{
      this.SchoolsList = Data;
    });
  }

  onSchoolSelect(evnt)
  {
    //console.log(evnt);
    this.UserDataService.HttpGet("SchoolManag/GetAllBranchesBy_SchoolID/"+evnt.SchoolID).subscribe((Data)=>{
      this.SchoolBranchesList = Data;
      //this.MultidropdownSettings.SchoolBranchDropdownSetting.disabled=false;
      //console.log(this.MultidropdownSettings.SchoolBranchDropdownSetting.disabled);
      
    });
    
  }

  onBranchSelect(event)
  {

  }

}
