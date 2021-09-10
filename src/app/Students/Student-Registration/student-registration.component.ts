import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import { AddEditStudentComponent } from '../../Popup Modal Components/add-edit-student/add-edit-student.component';
import { ConfirmationModalComponent } from '../../Popup Modal Components/confirmation-modal/confirmation-modal.component';
import { ProfileImageViewComponent } from '../../Popup Modal Components/profile-image-view/profile-image-view.component';
import { UserServiceService } from '../../Services/user-service.service';


@Component({
  selector: 'app-student-registration',
  templateUrl: './student-registration.component.html',
  styleUrls: ['./student-registration.component.css']
})
export class StudentRegistrationComponent implements OnInit {

  modalRef:BsModalRef;
  config = {
    initialState:
    {
      title:'Register Student',
      data:{}
    },
    backdrop: true,
    ignoreBackdropClick: true
  };
  StudentsList:any = [];
  constructor(private modalService: BsModalService, private userService: UserServiceService) { }

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('bg-default');
    this.loadStudentGrid();
  }

  AddNewStudent()
  {
    this.modalRef = this.modalService.show(AddEditStudentComponent,this.config);
    this.modalRef.setClass('modal-xl');
    
    this.modalService.onHidden.subscribe((reason: string) => {
      if(reason == "Record Inserted")
      {
        //this.reloadClassGrid();
      }
      else
      {
        //this.reloadClassGrid();
      }
    }) 
  }

  EditStudent(studentID) {
    var DataObj;
    for (var i = 0; i < this.StudentsList.length; i++) {
      if (this.StudentsList[i].StudentID == studentID) {
        DataObj = this.StudentsList[i];
        break;
      }
    }
    this.config.initialState.title = "Edit Student";
    this.config.initialState.data = DataObj;
    this.modalRef = this.modalService.show(AddEditStudentComponent, this.config);
    this.modalRef.setClass('modal-xl');

    this.modalService.onHidden.subscribe((reason: string) => {
      if(reason == "Record Updated")
      {
        this.loadStudentGrid();
      }
    })
  }

  DeleteStudent(stdID)
  {
    var StudentID = stdID;
    this.modalRef = this.modalService.show(ConfirmationModalComponent, this.config);
    this.modalRef.setClass('modal-sm');
    
    this.modalService.onHidden.subscribe((reason: string) => {
      if (reason == "Confirmed") {
        this.userService.HttpGet("DeleteStudent/"+stdID+"/"+localStorage.getItem("UserID")).subscribe((Data) => {
          this.loadStudentGrid();
        });
      }
    })
  }

  ShowProfileImage(imgString)
  {
    this.config.initialState.data = imgString;
    this.modalRef = this.modalService.show(ProfileImageViewComponent, this.config);
    this.modalRef.setClass('modal-sm');
  }

  loadStudentGrid()
  {
    this.userService.HttpGet("Student/GetAllStudents").subscribe((Data:any)=>{
      this.StudentsList = Data;
    })
  }

  convertJsonDate(jsonDate)
  {
    var convetedDate = new Date(parseInt(jsonDate.substr(6)));
    var day=(convetedDate.getDate().toString()).slice(-2);
    var month=(((convetedDate.getMonth()+1).toString())).slice(-2);
    var newDate=(day)+"/"+(month)+"/"+convetedDate.getFullYear();
    return newDate;
  }
}
