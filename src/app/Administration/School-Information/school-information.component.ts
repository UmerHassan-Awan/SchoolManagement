import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { ConfirmationModalComponent } from '../../Popup Modal Components/confirmation-modal/confirmation-modal.component';
import { UserServiceService } from '../../Services/user-service.service';
import { Cls_SchoolInformation } from '../../Models/school-information';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-school-information',
  templateUrl: './school-information.component.html',
  styleUrls: ['./school-information.component.css']
})
export class SchoolInformationComponent implements OnInit {

  subscriptions: Subscription[] = [];
  modalRef:BsModalRef;
  SchoolsList:any=[];
  p:number = 0;

  config = {
    initialState:
    {
      title:'Add School',
      data:{}
    },
    backdrop: true,
    ignoreBackdropClick: true
  };

  constructor(private modalService: BsModalService, private userService: UserServiceService, private notify: ToastrService) { }

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('bg-default');
    this.userService.HttpGet("SchoolManag/GetAllSchools").subscribe((Data)=>{
      this.SchoolsList = Data;
    });
  }

  DeleteSchool(sclID)
  {
    var SchoolID = sclID;
    this.modalRef = this.modalService.show(ConfirmationModalComponent, {initialState:{title:"You want to delete this school"}});
    this.modalRef.setClass('modal-sm');

    this.subscriptions.push
    (
      this.modalService.onHidden.subscribe((reason: string) => 
      {
        this.unsubscribe();
        if (reason == "Confirmed") 
          {
            this.userService.HttpGet("SchoolManag/DeleteSchool?id=" + SchoolID).subscribe((Data) => 
            {
              this.notify.success("School information deleted successfully.");
              this.reloadSchoolsGrid();
            },(error)=>{this.notify.error(error.error.Message); });
          }
      })  
    );
  }

  reloadSchoolsGrid()
  {
    this.userService.HttpGet("SchoolManag/GetAllSchools").subscribe((Data)=>{
      this.SchoolsList = Data;
    });
  }

  unsubscribe() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];
  }

}
