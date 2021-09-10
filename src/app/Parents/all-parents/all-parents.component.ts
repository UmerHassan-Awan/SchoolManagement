import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AddEditParentsComponent } from '../../Popup Modal Components/add-edit-parents/add-edit-parents.component';
import { ConfirmationModalComponent } from '../../Popup Modal Components/confirmation-modal/confirmation-modal.component';
import { UserServiceService } from '../../Services/user-service.service';


@Component({
  selector: 'app-all-parents',
  templateUrl: './all-parents.component.html',
  styleUrls: ['./all-parents.component.css']
})
export class AllParentsComponent implements OnInit {

  modalRef:BsModalRef;
  ClassesList:any=[];
  config = {
    initialState:
    {
      title:'Add Parent',
      data:{}
    },
    backdrop: true,
    ignoreBackdropClick: true
  };
  constructor(private modalService: BsModalService, private userService: UserServiceService) { }

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('bg-default');
  }

  AddNewParent()
  {
    this.modalRef = this.modalService.show(AddEditParentsComponent,this.config);
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

}
