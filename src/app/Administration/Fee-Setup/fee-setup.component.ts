import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ConfirmationModalComponent } from '../../Popup Modal Components/confirmation-modal/confirmation-modal.component';
import { UserServiceService } from '../../Services/user-service.service';
import { AddEditFeesetupComponent } from '../../Popup Modal Components/add-edit-feesetup/add-edit-feesetup.component';


@Component({
  selector: 'app-fee-setup',
  templateUrl: './fee-setup.component.html',
  styleUrls: ['./fee-setup.component.css']
})
export class FeeSetupComponent implements OnInit {

  modalRef:BsModalRef;
  config = {
    initialState:
    {
      title:'Add Fees',
      data:{}
    },
    backdrop: true,
    ignoreBackdropClick: true
  };
  FeesesList:any=[];
  constructor(private modalService: BsModalService, private userService: UserServiceService) { }

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('bg-default');
    this.reloadFeesGrid();
  }

  AddNewFees()
  {
    this.modalRef = this.modalService.show(AddEditFeesetupComponent,this.config);
    this.modalRef.setClass('modal-lg');
    this.modalService.onHidden.subscribe((reason: string) => {
      if(reason == "Record Inserted")
      {
        this.reloadFeesGrid();
      }
      else
      {
        this.reloadFeesGrid();
      }
    })
  }

  EditFees(feeID)
  {
    var DataObj;
    for (var i = 0; i < this.FeesesList.length; i++) {
      if (this.FeesesList[i].FeeID == feeID) {
        DataObj = this.FeesesList[i];
        break;
      }
    }
    this.config.initialState.title = "Edit Fees";
    this.config.initialState.data = DataObj;
    this.modalRef = this.modalService.show(AddEditFeesetupComponent, this.config);
    this.modalRef.setClass('modal-lg');

    this.modalService.onHidden.subscribe((reason: string) => {
      if(reason == "Record Updated")
      {
        this.reloadFeesGrid();
      }
    })
  }

  DeleteFees(feesID)
  {
    var FeesID = feesID;
    this.modalRef = this.modalService.show(ConfirmationModalComponent, this.config);
    this.modalRef.setClass('modal-sm');

    this.modalService.onHidden.subscribe((reason: string) => {
      if (reason == "Confirmed") {
        this.userService.HttpGet("FeeSetupManag/DeleteFees/"+FeesID+"/"+localStorage.getItem("UserID")).subscribe((Data) => {
          this.reloadFeesGrid();
        });
      }
    })
  }

  reloadFeesGrid()
  {
    this.userService.HttpGet("FeeSetupManag/GetAllFeeses").subscribe((Data)=>{
      this.FeesesList = Data;
    });
  }

}
