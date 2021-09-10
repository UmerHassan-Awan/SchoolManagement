import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { AddEditSchoolbranchesComponent } from '../../Popup Modal Components/add-edit-schoolbranches/add-edit-schoolbranches.component';
import { ConfirmationModalComponent } from '../../Popup Modal Components/confirmation-modal/confirmation-modal.component';
import { UserServiceService } from '../../Services/user-service.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-school-branches',
  templateUrl: './school-branches.component.html',
  styleUrls: ['./school-branches.component.css']
})
export class SchoolBranchesComponent implements OnInit {

  modalRef:BsModalRef;
  subscriptions: Subscription[] = [];
  SchoolBranchesList:any=[];
  p:number = 0;
  
  
  constructor(private modalService: BsModalService, private userService: UserServiceService, private notify: ToastrService) { }

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('bg-default');
    this.reloadSchooBranchesGrid();
  }

  DeleteBranch(branchID)
  {
    this.modalRef = this.modalService.show(ConfirmationModalComponent, {initialState:{title:"You want to delete this branch"}});
    this.modalRef.setClass('modal-sm');

    this.subscriptions.push
    (
      this.modalService.onHidden.subscribe((reason: string) => 
      {
        this.unsubscribe();
        if (reason == "Confirmed") 
          {
            this.userService.HttpGet("SchoolBranch/DeleteBranch?branchID=" + branchID).subscribe((Data) => 
            {
              this.notify.success("School branch deleted successfully.");
              this.reloadSchooBranchesGrid();
            },(error)=>{this.notify.error(error.error.Message); });
          }
      })  
    );
  }

  

  reloadSchooBranchesGrid()
  {
    this.userService.HttpGet("SchoolBranch/GetAllSchool_Branches").subscribe((Data)=>{
      this.SchoolBranchesList = Data;
    });
  }

  unsubscribe() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];
  }

}
