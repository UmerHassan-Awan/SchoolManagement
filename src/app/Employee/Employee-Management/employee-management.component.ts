import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import { AddEditEmployeeComponent } from '../../Popup Modal Components/add-edit-employee/add-edit-employee.component';
import { ConfirmationModalComponent } from '../../Popup Modal Components/confirmation-modal/confirmation-modal.component';
import { ProfileImageViewComponent } from '../../Popup Modal Components/profile-image-view/profile-image-view.component';
import { UserServiceService } from '../../Services/user-service.service';

@Component({
  selector: 'app-employee-management',
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.css']
})
export class EmployeeManagementComponent implements OnInit {

  modalRef:BsModalRef;
  config = {
    initialState:
    {
      title:'Register Employee',
      data:{}
    },
    backdrop: true,
    ignoreBackdropClick: true
  };
  EmployeeList:any = [];
  constructor(private modalService: BsModalService, private userService: UserServiceService) { }

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('bg-default');
    this.loadEmployeesGrid();
  }

  AddNewEmployee()
  {
    this.modalRef = this.modalService.show(AddEditEmployeeComponent,this.config);
    this.modalRef.setClass('modal-xl');
    
    this.modalService.onHidden.subscribe((reason: string) => {
      if(reason == "Record Inserted")
      {
        this.loadEmployeesGrid();
      }
      else
      {
        this.loadEmployeesGrid();
      }
    }) 
  }

  EditEmployee(employeeID) {
    var DataObj;
    for (var i = 0; i < this.EmployeeList.length; i++) {
      if (this.EmployeeList[i].EmployeeID == employeeID) {
        DataObj = this.EmployeeList[i];
        break;
      }
    }
    this.config.initialState.title = "Edit Employee";
    this.config.initialState.data = DataObj;
    this.modalRef = this.modalService.show(AddEditEmployeeComponent, this.config);
    this.modalRef.setClass('modal-xl');

    this.modalService.onHidden.subscribe((reason: string) => {
      if(reason == "Record Updated")
      {
        this.loadEmployeesGrid();
      }
    })
  }

  DeleteEmployee(employID)
  {
    this.modalRef = this.modalService.show(ConfirmationModalComponent, this.config);
    this.modalRef.setClass('modal-sm');
    
    this.modalService.onHidden.subscribe((reason: string) => {
      if (reason == "Confirmed") {
        this.userService.HttpGet("EmployeeManag/DeleteEmployee/"+employID+"/"+localStorage.getItem("UserID")).subscribe((Data) => {
          this.loadEmployeesGrid();
        });
      }
    })
  }

  loadEmployeesGrid()
  {
    this.userService.HttpGet("EmployeeManag/GetAllEmployees").subscribe((Data)=>{
      this.EmployeeList = Data; 
    });
  }

  convertJsonDate(rawdate)
  {
    return this.userService.convertJsonDate(rawdate);
  }

  ShowProfileImage(imgString)
  {
    this.config.initialState.data = imgString;
    this.modalRef = this.modalService.show(ProfileImageViewComponent, this.config);
    this.modalRef.setClass('modal-sm');
  }

}
