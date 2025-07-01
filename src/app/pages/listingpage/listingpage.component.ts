import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Formdatadetails } from 'src/app/formdatadetails';
// import * as jsPDF from 'jspdf';
// import * as moment from 'moment';
// import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';

@Component({
  selector: 'app-listingpage',
  templateUrl: './listingpage.component.html',
  styleUrls: ['./listingpage.component.scss']
})
export class ListingpageComponent {

    OrderDetails: Formdatadetails[]=[];
    totalCount: number = 0;
    constructor(private dataService:ApiService){

 }
  ngOnInit(): void {
     this.getAllOrder()
     this.fetchCount()
 }

 getAllOrder():void{
      this.dataService.getAllData().subscribe((data)=>{
        console.log(data)
        this.OrderDetails=data
      }) 
 }

fetchCount(): void {
  this.dataService.getRecordCount().subscribe({
    next: (res) => {
      this.totalCount = res.totalJoinnow; 
      console.log('Total Count:', this.totalCount);
    },
    error: (err) => {
      console.error('Error fetching count:', err);
    }
  });
}





  // onExporting(e: any, fileName: string) {
  //   const currentDate = moment().format('YYYY-MM-DD');
  //   if (e.format === 'pdf') {
  //     const doc = new jsPDF.jsPDF();
  //     exportDataGridToPdf({
  //       jsPDFDocument: doc,
  //       component: e.component
  //     }).then(() => {
  //       doc.save(`${'file-name'}.pdf`);
  //     });
  //   } else if (e.format === 'xlsx') {
  //     e.fileName = 'file-name';
  //   }
  // }


}
