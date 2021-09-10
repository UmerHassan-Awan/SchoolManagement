import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent implements OnInit {

  title:String = "";
  constructor(public modalRef:BsModalRef,private modalService: BsModalService) { }

  ngOnInit() {
  }

  confirm(): void {
    this.modalService.setDismissReason("Confirmed");
    this.modalRef.hide();
  }
 
  decline(): void {
    this.modalService.setDismissReason("Declined");
    this.modalRef.hide();
  }

}
