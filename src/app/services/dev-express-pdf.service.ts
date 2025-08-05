// import { Injectable } from '@angular/core';
// import { exportDataGrid as exportToPdf } from 'devextreme/pdf_exporter';
// import { exportDataGrid as exportToXlsx } from 'devextreme/excel_exporter';
// import { Workbook } from 'exceljs';
// import * as XLSX from 'xlsx';
// import saveAs from 'file-saver';
// import jsPDF from 'jspdf';
// import moment from 'moment';

// @Injectable()
// export class DevExpressPdfService {

//   constructor() { }

//   exporting(event: any, fileName: string): void {
//     const now = moment().format('MM/DD/YYYY hh:mm A');
//     const user = JSON.parse(sessionStorage.getItem('user') || '{}');
//     const fullName = `${user.firstname || ''} ${user.lastname || ''}`.trim();

//     if (event.format === 'pdf') {
//       this.exportPdf(event.component, fileName, fullName, now);
//     } else if (event.format === 'xlsx') {
//       this.exportXlsx(event.component, fileName, fullName, now);
//     }
//   }

//   private async convertSvgToBase64(url: string): Promise<string> {
//     return new Promise((resolve, reject) => {
//       const img = new Image();
//       img.crossOrigin = 'anonymous';
//       img.onload = () => {
//         const canvas = document.createElement('canvas');
//         canvas.width = img.width;
//         canvas.height = img.height;
//         const ctx = canvas.getContext('2d');
//         if (!ctx) return reject('Canvas error');
//         ctx.drawImage(img, 0, 0);
//         resolve(canvas.toDataURL('image/png'));
//       };
//       img.onerror = reject;
//       img.src = url;
//     });
//   }

//   private async exportPdf(component: any, fileName: string, fullName: string, now: string) {
//     const doc = new jsPDF();
//     const logo = await this.convertSvgToBase64('assets/images/cardinality-logo_text.svg');
//     const pageWidth = doc.internal.pageSize.getWidth();

//     // Header with image and titles
//     doc.addImage(logo, 'PNG', (pageWidth - 50) / 2, 10, 50, 10);
//     doc.setFont('helvetica', 'bold');
//     doc.setFontSize(14);
//     doc.setTextColor(30, 66, 124);
//     doc.text('Cardy Project Management', pageWidth / 2, 30, { align: 'center' });
//     doc.setFontSize(11);
//     doc.setTextColor(0, 0, 0);
//     doc.text(fileName, pageWidth / 2, 38, { align: 'center' });
//     doc.line(0, 41, pageWidth, 41);
//     doc.text(`Downloaded By: ${fullName}`, 14, 47);
//     doc.text(`Date & Time: ${now}`, pageWidth - 14, 47, { align: 'right' });

//     // Export grid
// exportToPdf({
//   jsPDFDocument: doc,
//   component,
//   topLeft: { x: 14, y: 55 },
//   customizeCell: (opt) => {
//     if (opt.pdfCell) {
//       opt.pdfCell.font = { size: 6 };
//       opt.pdfCell.wordWrapEnabled = true;
//     }
//   }
// }).then(() => doc.save(`${fileName}.pdf`));

//   }

//   private async exportXlsx(component: any, fileName: string, fullName: string, now: string) {
//     const logo = await this.convertSvgToBase64('assets/images/cardinality-logo_text.svg');
//     const workbook = new Workbook();
//     const sheet = workbook.addWorksheet('Sheet1');

//     sheet.columns = Array(8).fill({ width: 20 });

//     // Logo
//     const imgId = workbook.addImage({ base64: logo, extension: 'png' });
//     sheet.addImage(imgId, { tl: { col: 3, row: 0 }, ext: { width: 200, height: 40 } });

//     // Title & info
//     const rows = [
//       { cell: 'A4', text: 'Cardy Project Management', fontSize: 14, color: '1E427C' },
//       { cell: 'A5', text: fileName, fontSize: 12 },
//       { cell: 'A6', text: `Downloaded By: ${fullName}` },
//       { cell: 'A7', text: `Date & Time : ${now}` },
//     ];
//     rows.forEach(({ cell, text, fontSize = 11, color }) => {
//       sheet.mergeCells(`${cell}:H${cell[1]}`);
//       const cellRef = sheet.getCell(cell);
//       cellRef.value = text;
//       cellRef.font = { size: fontSize, bold: true, color: color ? { argb: color } : undefined };
//       cellRef.alignment = { horizontal: 'center' };
//     });

//     sheet.getRow(8).eachCell(cell => {
//       cell.border = { bottom: { style: 'thin', color: { argb: '000000' } } };
//     });

//     // Export grid
//     exportToXlsx({
//       component,
//       worksheet: sheet,
//       topLeftCell: { row: 9, column: 1 },
//       autoFilterEnabled: true
//     }).then(() =>
//       workbook.xlsx.writeBuffer().then(buffer =>
//         saveAs(new Blob([buffer]), `${fileName}.xlsx`)
//       )
//     );
//   }
// }


import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import moment from 'moment';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

@Injectable()
export class DevExpressPdfService {

  constructor() {}

  exporting(event: any, fileName: string): void {
    const now = moment().format('MM/DD/YYYY hh:mm A');
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    const fullName = `${user.firstname || ''} ${user.lastname || ''}`.trim();

    if (event.format === 'pdf') {
      this.exportPdf(event.component, fileName, fullName, now);
    } else if (event.format === 'xlsx') {
      this.exportToXlsx(event.component, fileName, fullName, now);
    } else {
      console.error('Unsupported format:', event.format);
    }
  }

  private async convertSvgToBase64(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject('Canvas error');
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      };
      img.onerror = reject;
      img.src = url;
    });
  }

  private async exportPdf(component: any, fileName: string, fullName: string, now: string) {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const logo = await this.convertSvgToBase64('assets/images/cardinality-logo_text.svg');

    // Header
    doc.addImage(logo, 'PNG', (pageWidth - 50) / 2, 10, 50, 10);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(30, 66, 124);
    doc.text('Cardy Project Management', pageWidth / 2, 30, { align: 'center' });

    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text(fileName, pageWidth / 2, 38, { align: 'center' });
    doc.line(0, 41, pageWidth, 41);
    doc.text(`Downloaded By: ${fullName}`, 14, 47);
    doc.text(`Date & Time: ${now}`, pageWidth - 14, 47, { align: 'right' });

    // Export table
    const { exportDataGrid } = await import('devextreme/pdf_exporter');
    exportDataGrid({
      jsPDFDocument: doc,
      component,
      topLeft: { x: 14, y: 55 },
      customizeCell: (opt) => {
        if (opt.pdfCell) {
          opt.pdfCell.font = { size: 6 };
          opt.pdfCell.wordWrapEnabled = true;
        }
      }
    }).then(() => doc.save(`${fileName}.pdf`));
  }

  exportToXlsx(component: any, fileName: string, fullName: string, now: string) {
    component.getDataSource().store().load().then((data: any[]) => {
      const headerRows = [
        ['Cardy Project Management'],
        [fileName],
        [`Downloaded By: ${fullName}`],
        [`Date & Time: ${now}`],
        [], // Empty row before table
      ];

      const columns = component.getVisibleColumns().map((col: any) => col.caption);
      const rows = data.map((row: any) =>
        component.getVisibleColumns().map((col: any) => row[col.dataField])
      );

      const finalData = [...headerRows, columns, ...rows];

      const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(finalData);
      const workbook: XLSX.WorkBook = {
        Sheets: { 'Sheet1': worksheet },
        SheetNames: ['Sheet1']
      };

      const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      FileSaver.saveAs(blob, `${fileName}.xlsx`);
    });
  }
}
