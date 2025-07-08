// import { Injectable } from '@angular/core';
// import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
// import { exportDataGrid as exportDataGridToXlsx } from 'devextreme/excel_exporter';
// import { Workbook } from 'exceljs';
// import saveAs from 'file-saver';
// import jsPDF from 'jspdf';
// import  moment from 'moment';
// import * as XLSX from 'xlsx';
// // import * as FileSaver from 'file-saver';


// @Injectable()
// export class DevExpressPdfService {

//   constructor() { }

//   private convertSvgToBase64Png(svgUrl: string): Promise<string> {
//     return new Promise((resolve, reject) => {
//       const img = new Image();
//       img.crossOrigin = 'Anonymous';
//       img.onload = () => {
//         const canvas = document.createElement('canvas');
//         canvas.width = img.width;
//         canvas.height = img.height;
//         const ctx = canvas.getContext('2d');
//         if (!ctx) return reject('Canvas context not found');
//         ctx.drawImage(img, 0, 0);
//         const base64 = canvas.toDataURL('image/png');
//         resolve(base64);
//       };
//       img.onerror = reject;
//       img.src = svgUrl;
//     });
//   }

//   exporting(event: any, fileName: string): void {
//     const now = moment().format('MM/DD/YYYY hh:mm A');
//     const user = JSON.parse(sessionStorage.getItem('user') || '{}');
//     const fullName = `${user.firstname || ''} ${user.lastname || ''}`.trim();

//     if (event.format === 'pdf') {
//       this.exportToPdf(event, fileName, now, fullName);
//     } else if (event.format === 'xlsx') {
//       this.exportToXlsx(event, fileName, now, fullName);
//     } else {
//       console.error('Unsupported export format:', event.format);
//     }
//   }

//   private exportToPdf(event: any, fileName: string, now: string, fullName: string) {
//     const doc = new jsPDF();
//     const img = new Image();
//     const pageWidth = doc.internal.pageSize.getWidth();

//     img.src = 'assets/images/cardinality-logo_text.svg';
//     img.onload = () => {
//       const canvas = document.createElement('canvas');
//       canvas.width = img.width;
//       canvas.height = img.height;
//       const ctx = canvas.getContext('2d');
//       if (!ctx) return;
//       ctx.drawImage(img, 0, 0);
//       const base64 = canvas.toDataURL('image/png');

//       const imageWidth = 50;
//       const imageHeight = 10;
//       const centerX = (pageWidth - imageWidth) / 2;

//       doc.addImage(base64, 'PNG', centerX, 10, imageWidth, imageHeight);
//       doc.setFontSize(14);
//     //   doc.setFont(undefined, 'bold');
//       doc.setFont('helvetica', 'bold');
//       doc.setTextColor(30, 66, 124);
//       doc.text('Cardy Project Management', pageWidth / 2, 30, { align: 'center' });
//       doc.setTextColor(0, 0, 0);
//       doc.text(fileName, pageWidth / 2, 40, { align: 'center' });

//       doc.setLineWidth(0.5);
//       doc.line(0, 43, pageWidth, 43);

//       doc.setFontSize(11);
//     //   doc.setFont(undefined, 'normal');
//       doc.setFont('helvetica', 'bold');
//       doc.text(`Downloaded By: ${fullName}`, 14, 49, { align: 'left' });
//       doc.text(`Date & Time : ${now}`, pageWidth - 14, 49, { align: 'right' });

//       exportDataGridToPdf({
//         jsPDFDocument: doc,
//         component: event.component,
//         topLeft: { x: 14, y: 55 },
//         indent: 5,
//         customizeCell: (options: any) => {
//           const pdfCell = options.pdfCell;
//           pdfCell.wordWrapEnabled = true;
//           pdfCell.font = { size: 5, style: 'normal' };
//         }
//       }).then(() => {
//         doc.save(`${fileName}.pdf`);
//       }).catch(err => {
//         console.error('PDF Export Error:', err);
//       });
//     };
//   }

//   private exportToXlsx(event: any, fileName: string, now: string, fullName: string) {
//     const svgPath = 'assets/images/cardinality-logo_text.svg';
//     this.convertSvgToBase64Png(svgPath).then((base64Image) => {
//       const workbook = new Workbook();
//       const worksheet = workbook.addWorksheet('Sheet1');

//       worksheet.columns = Array(8).fill({ width: 20 });

//       const imageId = workbook.addImage({
//         base64: base64Image,
//         extension: 'png',
//       });

//       worksheet.addImage(imageId, {
//         tl: { col: 3, row: 0 },
//         ext: { width: 200, height: 40 },
//       });

//       worksheet.mergeCells('A4:H4');
//       worksheet.getCell('A4').value = 'Cardy Project Management';
//       worksheet.getCell('A4').font = { size: 14, bold: true, color: { argb: '1E427C' } };
//       worksheet.getCell('A4').alignment = { horizontal: 'center' };

//       worksheet.mergeCells('A5:H5');
//       worksheet.getCell('A5').value = fileName;
//       worksheet.getCell('A5').font = { size: 12, bold: true };
//       worksheet.getCell('A5').alignment = { horizontal: 'center' };

//       worksheet.mergeCells('A6:H6');
//       worksheet.getCell('A6').value = `Downloaded By: ${fullName}`;
//       worksheet.getCell('A6').alignment = { horizontal: 'center' };

//       worksheet.mergeCells('A7:H7');
//       worksheet.getCell('A7').value = `Date & Time : ${now}`;
//       worksheet.getCell('A7').alignment = { horizontal: 'center' };

//       const row8 = worksheet.getRow(8);
//       for (let i = 1; i <= 8; i++) {
//         row8.getCell(i).border = {
//           bottom: { style: 'thin', color: { argb: '000000' } },
//         };
//       }

//       exportDataGridToXlsx({
//         component: event.component,
//         worksheet,
//         topLeftCell: { row: 9, column: 1 },
//         autoFilterEnabled: true,
//       }).then(() => {
//         workbook.xlsx.writeBuffer().then((buffer) => {
//           saveAs(new Blob([buffer], { type: 'application/octet-stream' }), `${fileName}.xlsx`);
//         }).catch(err => {
//           console.error('Excel writeBuffer Error:', err);
//         });
//       }).catch(err => {
//         console.error('Excel export error:', err);
//       });
//     }).catch(err => {
//       console.error('SVG conversion failed:', err);
//     });
//   }
// }