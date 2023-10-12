import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnChanges {
  @Input() total: number = 0;
  discount: number = 0;
  tax: number = 0;
  netTotal: number = 0;
  calculatedAmount: number = 0;
  paidAmount: number = 0;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['total']) {
      this.total = changes['total'].currentValue;
      this.updateTotal();
    }
  }
  updateTotal() {
    
    this.total = this.calculateTotal();

    // Calculate net total
    this.netTotal = this.total + this.tax - this.discount;

    // Calculate calculated amount
    this.calculatedAmount = this.netTotal - this.paidAmount;
  }

  
  calculateTotal(): number {
    
    return this.total; 
  }
  
}
