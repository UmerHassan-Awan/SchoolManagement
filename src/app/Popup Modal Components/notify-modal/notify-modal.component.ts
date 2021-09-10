import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-notify-modal',
  templateUrl: './notify-modal.component.html',
  styleUrls: ['./notify-modal.component.css']
})
export class NotifyModalComponent implements OnInit {

  title:String = "";
  data:any;
  AlertMessage:String = "";
  DisplayMessage:String = "";
  constructor(public modalRef: BsModalRef, private modalService: BsModalService) { }

  ngOnInit() {
    const ModalContent = document.getElementsByClassName("modal-notify-content")[0];

    if(this.title == "Success" || this.title == "UpdateSuccess")
    {
      this.DisplayMessage = this.data;
      ModalContent.classList.remove("bg-gradient-danger");
      ModalContent.classList.add("bg-gradient-success");  
    }
    else
    {
      this.DisplayMessage = this.data;
      ModalContent.classList.remove("bg-gradient-success");
      ModalContent.classList.add("bg-gradient-danger");  
    }
  }

  closeModal()
  {
    if(this.title == "Success" || this.title == "UpdateSuccess" || this.title == "DeleteSuccess" || this.title == "VerifiedUser" || 
    this.title == "RegisterSuccess" || this.title == "EventSuccess" || this.title == "EventUpdateSuccess" 
    || this.title == "ProfileSuccess" || this.title == "CustomSuccess_Message")
    {
      this.modalService.setDismissReason("Success");
      this.modalRef.hide();
    }
    else
    {
      this.modalService.setDismissReason("Error");
      this.modalRef.hide();
    }
    
  }

}
