import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UserServiceService } from '../../Services/user-service.service';
import { Students } from '../../Models/Students';


@Component({
  selector: 'app-add-edit-student',
  templateUrl: './add-edit-student.component.html',
  styleUrls: ['./add-edit-student.component.css']
})
export class AddEditStudentComponent implements OnInit {

  title:string;
  data:any;
  AlertMessage:any = "";
  btnText:string = "Register";
  bsValue = new Date();
  SchoolsList:any=[];
  SchoolBranchesList:any=[];
  CountryList:any=[];
  CityList:any=[];
  public modal = new Students();

  constructor(public modalRef:BsModalRef, private modalService:BsModalService  ,private userService: UserServiceService) { }

  ngOnInit() {
    this.LoadAllSchools();
    this.Load_Country_Cities();
    
    if(this.title == "Edit Student")
    {
      // this.modal.StudentID = this.data.StudentID;
      // this.modal.FirstName = this.data.FirstName;
      // this.modal.MiddleName = this.data.MiddleName;
      // this.modal.LastName = this.data.LastName;
      
      this.btnText = "Update";
      this.modal = this.data;
      this.modal.SchoolID = this.data.BranchDetail.SchoolID;
      this.LoadSchoolBranches(this.modal.SchoolID);
      this.modal.AdmissionDate = this.userService.convertJsonDate(this.modal.AdmissionDate);
      this.modal.DOB = this.userService.convertJsonDate(this.modal.DOB);

    }
    else
    {
      this.generateRegistrationNo();
    }
    
  }

  SubmitData()
  {
    
    if(this.btnText == "Register")
    {
      this.modal.DOB = this.convertToJSONDate(this.modal.DOB);
      this.modal.AdmissionDate = this.convertToJSONDate(this.modal.AdmissionDate);
      this.userService.HttpPost("Student/RegisterStudent", JSON.stringify(this.modal)).subscribe((Data) => {
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
      this.modal.DOB = this.convertToJSONDate(this.modal.DOB);
      this.modal.AdmissionDate = this.convertToJSONDate(this.modal.AdmissionDate);
      this.userService.HttpPost("Student/UpdateStudent", JSON.stringify(this.modal)).subscribe((Data) => {
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

  convertToJSONDate(strDate) {
    var dt = new Date(strDate);
    var newDate = new Date(Date.UTC(dt.getFullYear(), dt.getMonth(), dt.getDate(), dt.getHours(), dt.getMinutes(), dt.getSeconds(), dt.getMilliseconds()));
    return '/Date(' + newDate.getTime() + ')/';
  }

  OnNext(currentTab)
  {
    if(currentTab == "Tab1")
    {
      var Prevcontenttab = document.getElementById('tabs-icons-text-1-tab');
      var TabContent = document.getElementById('tabs-icons-text-1');
      Prevcontenttab.classList.remove("active");
      TabContent.classList.remove("show");
      TabContent.classList.remove("active");
      
      var Nextcontenttab = document.getElementById('tabs-icons-text-2-tab');
      var Nextcontent = document.getElementById('tabs-icons-text-2');
      Nextcontenttab.classList.add("active");
      Nextcontent.classList.add("show");
      Nextcontent.classList.add("active");
    }
    else if(currentTab == "Tab2")
    {
      var PrevcontentTab = document.getElementById('tabs-icons-text-2-tab');
      var TabContent = document.getElementById('tabs-icons-text-2');
      PrevcontentTab.classList.remove("active");
      TabContent.classList.remove("show");
      TabContent.classList.remove("active");


      var NextcontentTab = document.getElementById('tabs-icons-text-3-tab');
      var Nextcontent = document.getElementById('tabs-icons-text-3');
      NextcontentTab.classList.add("active");
      Nextcontent.classList.add("show");
      Nextcontent.classList.add("active");
    }
    else if(currentTab == "Tab3")
    {
      var PrevcontentTab = document.getElementById('tabs-icons-text-3-tab');
      var TabContent = document.getElementById('tabs-icons-text-3');
      PrevcontentTab.classList.remove("active");
      TabContent.classList.remove("show");
      TabContent.classList.remove("active");

      var NextcontentTab = document.getElementById('tabs-icons-text-4-tab');
      var Nextcontent = document.getElementById('tabs-icons-text-4');
      NextcontentTab.classList.add("active");
      Nextcontent.classList.add("show");
      Nextcontent.classList.add("active");
    }
  }

  onPrevious(currentTab)
  {
    if(currentTab == "Tab2")
    {
      var Prevcontent = document.getElementById('tabs-icons-text-2-tab');
      var PrevTabContent = document.getElementById('tabs-icons-text-2');
      Prevcontent.classList.remove("active");
      PrevTabContent.classList.remove("show");
      PrevTabContent.classList.remove("active");

      var Nextcontent = document.getElementById('tabs-icons-text-1-tab');
      var NextTabContent = document.getElementById('tabs-icons-text-1');
      Nextcontent.classList.add("active");
      NextTabContent.classList.add("show");
      NextTabContent.classList.add("active");
    }
    else if(currentTab == "Tab3")
    {
      var Prevcontent = document.getElementById('tabs-icons-text-3-tab');
      var PrevTabContent = document.getElementById('tabs-icons-text-3');
      Prevcontent.classList.remove("active");
      PrevTabContent.classList.remove("show");
      PrevTabContent.classList.remove("active");

      var Nextcontent = document.getElementById('tabs-icons-text-2-tab');
      var NextTabContent = document.getElementById('tabs-icons-text-2');
      Nextcontent.classList.add("active");
      NextTabContent.classList.add("show");
      NextTabContent.classList.add("active");
    }
    else if(currentTab == "Tab4")
    {
      var Prevcontent = document.getElementById('tabs-icons-text-4-tab');
      var PrevTabContent = document.getElementById('tabs-icons-text-4');
      Prevcontent.classList.remove("active");
      PrevTabContent.classList.remove("show");
      PrevTabContent.classList.remove("active");

      var Nextcontent = document.getElementById('tabs-icons-text-3-tab');
      var NextTabContent = document.getElementById('tabs-icons-text-3');
      Nextcontent.classList.add("active");
      NextTabContent.classList.add("show");
      NextTabContent.classList.add("active");
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
      this.userService.HttpGet("SchoolBranch/GetAllBranchesBy_SchoolID?sclID="+sclID).subscribe((Data)=>{
        this.SchoolBranchesList = Data; 
      });
    }
    else
    {
      this.SchoolBranchesList = [];
    }
  }

  Load_Country_Cities()
  {
    this.userService.HttpGet("Locations/GetAllLocations").subscribe((Data:any)=>{
      this.CountryList = Data.CountryList;
      this.CityList = Data.CityList;
    });
  }

  generateRegistrationNo()
  {
    this.userService.HttpGet("Student/GetStudentRegNo").subscribe((Data:any)=>{
      this.modal.StudentRegNo = Data.StudentRegNo;
    });
  }

  loadImage(event) {
    var file = event.target.files[0];
    if (file) {
      var reader = new FileReader();

      reader.onload = this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
           this.modal.Picture = "data:image/jpeg;base64," + btoa(binaryString);
           //console.log(btoa(binaryString));
   }

}
