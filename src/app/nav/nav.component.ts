import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  isSalesHovered = false;
  isStockHovered = false;
  isSalesInfoHovered = false;

  onMouseOver(item: string) {
    if (item === 'sales') {
      this.isSalesHovered = true;
    } else if (item === 'stock') {
      this.isStockHovered = true;
    } else if (item === 'salesInfo') {
      this.isSalesInfoHovered = true;
    }
  }

  onMouseOut(item: string) {
    if (item === 'sales') {
      this.isSalesHovered = false;
    } else if (item === 'stock') {
      this.isStockHovered = false;
    } else if (item === 'salesInfo') {
      this.isSalesInfoHovered = false;
    }
  }
}
