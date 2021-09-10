import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ConfirmationModalComponent } from '../../Popup Modal Components/confirmation-modal/confirmation-modal.component';
import { UserServiceService } from '../../Services/user-service.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-class-management',
  templateUrl: './class-management.component.html',
  styleUrls: ['./class-management.component.css']
})
export class ClassManagementComponent implements OnInit {

  modalRef:BsModalRef;
  ClassesList:any=[];
  subscriptions: Subscription[] = [];
  p:number = 0;
  constructor(private modalService: BsModalService, private userService: UserServiceService, private notify: ToastrService) { }

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('bg-default');
    this.reloadClassGrid();
  }


  DeleteClass(classID)
  {
    this.modalRef = this.modalService.show(ConfirmationModalComponent, {initialState:{title:"You want to delete this class"}});
    
    this.subscriptions.push
    (
      this.modalService.onHidden.subscribe((reason: string) => 
      {
        this.unsubscribe();
        if (reason == "Confirmed") 
          {
            this.userService.HttpGet("ClassManag/DeleteClass?classID=" + classID + "&userID=" + localStorage.getItem("UserID")).subscribe((Data) => 
            {
              this.notify.success("Class deleted successfully!");
              this.reloadClassGrid();
            },(error)=>{this.notify.error(error.error.Message); });
          }
      })  
    );
  }

  reloadClassGrid()
  {
    this.userService.HttpGet("ClassManag/GetAllClasses").subscribe((Data)=>{
      this.ClassesList = Data;
    });
  }

  unsubscribe() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];
  }

}
