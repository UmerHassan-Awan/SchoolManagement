import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { AddEditClassSectionsComponent } from '../../Popup Modal Components/add-edit-class-sections/add-edit-class-sections.component';
import { ConfirmationModalComponent } from '../../Popup Modal Components/confirmation-modal/confirmation-modal.component';
import { UserServiceService } from '../../Services/user-service.service';


@Component({
  selector: 'app-class-sections',
  templateUrl: './class-sections.component.html',
  styleUrls: ['./class-sections.component.css']
})
export class ClassSectionsComponent implements OnInit {

  modalRef:BsModalRef;
  ClassSectionsList:any = [];
  config = {
    initialState:
    {
      title:'Add Class Section',
      data:{}
    },
    backdrop: true,
    ignoreBackdropClick: true
  };
  constructor(private modalService: BsModalService, private userService: UserServiceService) { }

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('bg-default');
    this.reloadClassSectionGrid();
  }

  AddNewSection()
  {
    this.modalRef = this.modalService.show(AddEditClassSectionsComponent,this.config);
    this.modalRef.setClass('modal-lg');
    
    this.modalService.onHidden.subscribe((reason: string) => {
      if(reason == "Record Inserted")
      {
        this.reloadClassSectionGrid();
      }
      else
      {
        this.reloadClassSectionGrid();
      }
    });
  }

  EditSection(sectionID) {
    var DataObj;
    for (var i = 0; i < this.ClassSectionsList.length; i++) {
      if (this.ClassSectionsList[i].ClassSectionID == sectionID) {
        DataObj = this.ClassSectionsList[i];
        break;
      }
    }
    this.config.initialState.title = "Edit Class Section";
    this.config.initialState.data = DataObj;
    this.modalRef = this.modalService.show(AddEditClassSectionsComponent, this.config);
    this.modalRef.setClass('modal-lg');

    this.modalService.onHidden.subscribe((reason: string) => {
      if(reason == "Record Updated")
      {
        this.reloadClassSectionGrid();
      }
    })
  }

  DeleteSection(sectionID)
  {
    var SectionID = sectionID;
    this.modalRef = this.modalService.show(ConfirmationModalComponent, this.config);
    this.modalRef.setClass('modal-sm');
    
    this.modalService.onHidden.subscribe((reason: string) => {
      if (reason == "Confirmed") {
        this.userService.HttpGet("ClassSectManag/DeleteClassSection/"+SectionID+"/"+localStorage.getItem("UserID")).subscribe((Data) => {
          this.reloadClassSectionGrid();
        });
      }
    })
  }

  reloadClassSectionGrid()
  {
    this.userService.HttpGet("ClassSectManag/GetAllClassSections").subscribe((Data)=>{
      this.ClassSectionsList = Data;
    });
  }

}
