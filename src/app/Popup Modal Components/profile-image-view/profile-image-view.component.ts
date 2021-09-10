import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-profile-image-view',
  templateUrl: './profile-image-view.component.html',
  styleUrls: ['./profile-image-view.component.css']
})
export class ProfileImageViewComponent implements OnInit {

  title:string;
  data:any;
  profileImageString:string;
  constructor(public modalRef:BsModalRef, private modalService:BsModalService) { }

  ngOnInit() {
    this.profileImageString = this.data;
  }

}
