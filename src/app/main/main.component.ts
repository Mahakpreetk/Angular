/*import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NewService } from '../services/new.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit{
  
  items: any[] = [];
  searchText: string = '';
  isAddingItem: boolean = false;
  total: number = 0;
  /*items = [
    { id: 1, item: 'Product A', price: 20.0, quantity: 2, discount: 5.0 },
    { id: 2, item: 'Product B', price: 15.0, quantity: 3, discount: 3.0 },
  ];*/
  
  /*constructor(private pharmaService: NewService) { }
  ngOnInit(): void {
    this.fetchData();
  }
  fetchData() {
    this.pharmaService.Get().subscribe(
      (data) => {
        this.items = data;
        this.calculateTotal();
      },
      (error) => {
        console.error('Error fetching sales data: ', error);
      }
    );
  }


  
  // Function to add a new item
  addItem() {
    this.isAddingItem = true;
    this.calculateTotal();
  }

  // Function to save the new item
  saveItem(newItemForm: any) {
    if (newItemForm.valid) {
      const newItem = {
        id: this.items.length + 1,
        item: newItemForm.value.item,
        price: parseFloat(newItemForm.value.price),
        quantity: parseInt(newItemForm.value.quantity),
        discount: parseFloat(newItemForm.value.discount),
      };
      this.items.push(newItem);
      this.isAddingItem = false;
      this.calculateTotal();
    }
  }

  // Function to cancel adding a new item
  cancelAddItem() {
    this.isAddingItem = false;
    this.calculateTotal();
  }

  // Function to delete an item by ID
  deleteItem(id: number) {
    this.items = this.items.filter((item) => item.id !== id);
    this.calculateTotal();
  }

  // Function to search items
  searchItems() {
    this.items = this.items.filter((item) =>
      item.item.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  // Reset search and show all items
  resetSearch() {
    this.searchText = '';
    // Reload  original data here or implement a way to reset to the original data
  }

  startNewSale() {
    
    console.log('Starting a new sale...');
  }
  cancelNewSaleForm(){
    this.isAddingItem = false;
  }
  calculateTotal(): number {
    let total = 0;
    for (const item of this.items) {
      total += item.price * item.quantity - item.discount;
    }
    return total;
  }
}


  /*calculateSubtotal(): number {
    let subtotal = 0;
    for (const item of this.items) {
      subtotal += item.price * item.quantity - item.discount;
    }
    return subtotal;
  }

  calculateTax(): number {
    // Assuming a tax rate of 8%
    return this.calculateSubtotal() * 0.08;
  }

  calculateTotal(): number {
    return this.calculateSubtotal() + this.calculateTax();
  }*/

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NewService } from '../services/new.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditModalComponent } from '../edit-modal/edit-modal.component';
import { SaleService } from '../sale.service';
import { SaleUpdateService } from '../sale-update.service';
//import { ToastrService } from 'ngx-toastr/public_api';
import { ChangeDetectionStrategy } from '@angular/core';
import { ToastrService } from 'ngx-toastr/public_api';
import { NgForm } from '@angular/forms';
  
  
  @Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css'],
    changeDetection: ChangeDetectionStrategy.Default
  })
  export class MainComponent implements OnInit  { 
    
    items: any[] = [];
    
    searchText: string = '';
    isAddingItem: boolean = false;
    total: number = 0;
    nextId: number = 0;
    isEditing: boolean = false;
    editingItem: any;
    editingItemCopy: any;
    taxRate: number = 0.08;
    customerName: string = '';
  showReceipt: boolean = false;

  
    constructor(private changeDetectorRef: ChangeDetectorRef, private modalService: NgbModal,private pharmaService: NewService,private saleService: SaleService,private saleUpdate: SaleUpdateService) { }
  
    ngOnInit(): void {
      this.fetchData();
    }
  
    fetchData() {
      this.pharmaService.Get().subscribe(
        (data) => {
          this.items = data;
          this.calculateSubtotal();
        },
        (error) => {
          console.error('Error fetching sales data: ', error);
        }
      );
    }
  
    // Function to add a new item
    addItem() {
      this.isAddingItem = true;
      this.calculateSubtotal();
     
    }
    editSale(saleId: number){
      this.editingItem = this.items.find((item) => item.saleId === saleId);
      this.editingItemCopy={ ...this.editingItem};
      this.isEditing = true;
    }
    updateItem(form: NgForm) {
      
      if (form.valid) {
        this.editingItem.itemName = this.editingItemCopy.itemName;
    this.editingItem.salePrice = this.editingItemCopy.salePrice;
    this.editingItem.saleQuantity = this.editingItemCopy.saleQuantity;
    this.editingItem.discount = this.editingItemCopy.discount;
        
        this.saleUpdate.updateSale(this.editingItem).subscribe(
          (response) => {
            console.log('Sale updated successfully', response);
            
            this.isEditing = false; // Exit editing mode
          },
          (error) => {
            console.error('Error updating sale', error);
            
          }
        );
      }
      this.isEditing = false;
    }
    cancelEditItem() {
      // Reset the selected item and exit editing mode
      
      this.isEditing = false;
    }
    // Function to save the new item
    /*saveItem(newItemForm: any) {
      if (newItemForm.valid) {
        const newItem = {
          saleId: this.items.length + 1, // Adjust as needed based on your data structure
          itemName: newItemForm.value.item,
          salePrice: parseFloat(newItemForm.value.price),
          saleQuantity: parseInt(newItemForm.value.quantity),
          discount: parseFloat(newItemForm.value.discount),
        };
        this.items.push(newItem);
        this.isAddingItem = false;
        this.calculateTotal();
      }
    }*/
    /*openEditModal(saleId: number) {
      const modalRef = this.modalService.open(EditModalComponent, {
        size: 'lg',
        backdrop: 'static',
      });
    
      modalRef.componentInstance.header = 'Update Sale';
      //modalRef.componentInstance.saleId = saleId;
      modalRef.componentInstance.editedPolicyItem = {
      
         };
      
      modalRef.result.then(
        (result) => {
          if (result === 'Save') {
            
            this.saveSaleItem(result); 
          } else if (result === 'Cancel') {
            // Handle other results if needed
            console.log('Modal was canceled');
          }
        },
        (reason) => {
          // Handle modal dismissal (e.g., "Cancel" button clicked)
          if (reason === 'Cancel') {
            // Handle the cancellation action
            console.log('Modal was dismissed');
          }
        }
      );
    }*/
   
    saveSaleItem(item: any) {
      
      console.log('Sale item saved: ', item);
      
      this.items.push(item);
      this.fetchData();
      this.calculateSubtotal();
    }

    saveItem(newItemForm: any) {
      if (newItemForm.valid) {
        const saleItem = {
          itemName: newItemForm.value.item,
          salePrice: parseFloat(newItemForm.value.price),
          saleQuantity: parseInt(newItemForm.value.quantity),
          discount: parseFloat(newItemForm.value.discount),
        };
  
        this.saleService.addSale(saleItem).subscribe(
          (response) => {
            console.log('Sale added successfully', response);
            this.items.push(saleItem);
            this.fetchData();
            // reset the form 
            this.cancelAddItem();
          },
          (error) => {
            console.error('Error adding sale', error);
          
          }
        );
      }
    }
    
  
  
    // Function to cancel adding a new item
    cancelAddItem() {
      this.isAddingItem = false;
      this.calculateSubtotal();
    }
    cancelNewSaleForm(){
      this.isAddingItem = false;
    }
    // Function to delete an item by ID
    deleteItem(saleId: number) {
      this.pharmaService.deleteSale(saleId).subscribe(
        () => {
          // Remove the deleted item from the local array to update the view
          this.items = this.items.filter((item) => item.saleId !== saleId);
          this.calculateSubtotal();
          this.fetchData();
          alert('Sale deleted successfully');
            
          //this.changeDetectorRef.detectChanges();
        },
        (error) => {
          console.error('Error deleting sale: ', error);
        }
      );
    }
  
    // Function to search items
    searchItems() {
      this.pharmaService.searchSales(this.searchText).subscribe(
        (data: any[]) => {
          this.items = data; // Update your items with the search results
          this.calculateSubtotal(); // Recalculate totals
        },
        (error: any) => {
          console.error('Error searching sales: ', error);
        }
      );
    }
  
    // Reset search and show all items
    resetSearch() {
      this.searchText = '';
      this.fetchData();
      // Reload original data here or implement a way to reset to the original data
    }
  
    calculateSubtotal(): number {
      let subtotal = 0;
      for (const item of this.items) {
        subtotal += item.salePrice * item.saleQuantity - item.discount;
      }
      return subtotal;
    }
  
    calculateTax(): number {
      return this.calculateSubtotal() * this.taxRate;
    }
  
    calculateTotalIncludingTax(): number {
      return this.calculateSubtotal() + this.calculateTax();
    }
    generateReceipt() {
      if (this.customerName) {
        // Assuming you have a receipt object, you can populate it with data.
        const receipt = {
          customerName: this.customerName,
          items: this.items, // Your list of sale items
          subtotal: this.calculateSubtotal(),
          tax: this.calculateTax(),
          total: this.calculateTotalIncludingTax(),
        };
    
        // Now, you can display the receipt or take any other actions.
        console.log('Generated Receipt:', receipt);
        this.showReceipt = true;
      } else {
        alert('Please enter the customer name before completing the sale.');
      }
    }
   
  }
  