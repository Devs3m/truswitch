import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

selectedTab: 'commercial' | 'workplace' = 'commercial';

  switchTab(tab: 'commercial' | 'workplace') {
    this.selectedTab = tab;
  }

   isAccordionOpen: string | null = null;

  toggleAccordion(id: string) {
    // Toggle logic: if clicked again, close it
    this.isAccordionOpen = this.isAccordionOpen === id ? null : id;
  }

  clearAccordion() {
    this.isAccordionOpen = null;
  }

}
