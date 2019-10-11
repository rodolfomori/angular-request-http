import { BsModalRef } from 'ngx-bootstrap/modal';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent implements OnInit {

@Input() message: string;
@Input() type = 'sucess';

  constructor(private bsModalRef: BsModalRef,
    private modalService:BsModalService) { }

  ngOnInit() {
  }
  BsModalRef: BsModalRef;

  onClose(){
    this.bsModalRef.hide();
  }

}
