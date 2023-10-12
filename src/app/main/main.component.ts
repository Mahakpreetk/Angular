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
import { ChangeDetectionStrategy } from '@angular/core';
  
  
  @Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css'],
    changeDetection: ChangeDetectionStrategy.Default
  })
  export class MainComponent implements OnInit  { //implements OnInit
    items: any[] = [];
    searchText: string = '';
    isAddingItem: boolean = false;
    total: number = 0;
  
    constructor(private changeDetectorRef: ChangeDetectorRef, private modalService: NgbModal,private pharmaService: NewService,private saleService: SaleService,private saleUpdate: SaleUpdateService) { }
  
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
    openEditModal(item: any) {
      const modalRef = this.modalService.open(EditModalComponent, {
        size: 'lg',
        backdrop: 'static',
      });
    
      modalRef.componentInstance.header = 'Add New Sale';
      //modalRef.componentInstance.saleId = saleId;
      modalRef.componentInstance.editedPolicyItem = { /* initialize data as needed */ };
      
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
    }
    
    saveSaleItem(item: any) {
      // You can add the logic to save the sale item to your list or make an API request
      console.log('Sale item saved: ', item);
      // For example, add it to your 'items' array
      this.items.push(item);
      this.calculateTotal();
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
            // Optionally, reset the form or perform other actions
            this.cancelAddItem();
          },
          (error) => {
            console.error('Error adding sale', error);
            // Handle errors as needed
          }
        );
      }
    }
    
  
  
    // Function to cancel adding a new item
    cancelAddItem() {
      this.isAddingItem = false;
      this.calculateTotal();
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
          this.calculateTotal();
          this.changeDetectorRef.detectChanges();
        },
        (error) => {
          console.error('Error deleting sale: ', error);
        }
      );
    }
  
    // Function to search items
    searchItems() {
      // Implement search logic here based on your requirements
    }
  
    // Reset search and show all items
    resetSearch() {
      this.searchText = '';
      // Reload original data here or implement a way to reset to the original data
    }
  
    calculateTotal(): number {
      let total = 0;
      for (const item of this.items) {
        total += item.salePrice * item.saleQuantity - item.discount;
      }
      this.total = total; // Update total in the component
      return total;
    }
   
  }
  