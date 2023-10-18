/*import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent {

}*/


import { Component, EventEmitter, Input, Output } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { SaleUpdateService } from '../sale-update.service';

@Component({

  selector: 'app-edit-modal',

  templateUrl: './edit-modal.component.html',

  styleUrls: ['./edit-modal.component.css'],

})

export class EditModalComponent {

  @Input() header: string;

  @Input() editedPolicyItem: any;

  @Output() saveChangesClicked = new EventEmitter<any>();
 

 

constructor(public activeModal: NgbActiveModal,private saleUpdate: SaleUpdateService) {

  this.header = '';

}

 

onSaveChangesClick() {
  this.saleUpdate.updateSale( this.editedPolicyItem)
    .subscribe(
      (response: any) => {
        console.log('Sale item updated successfully', response);
        // Optionally, close the modal or update the UI
      },
      (error: any) => {
        console.error('Error updating sale', error);
        // Handle errors as needed
      }
    );
}

showModal = false;

 

  openModal() {

    this.showModal = true;

  }

 

  closeModal() {

    this.showModal = false;

  }

}

 
