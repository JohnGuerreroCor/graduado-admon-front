import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ReporteTasaGraduacionExcelService {
  logo: any;

  constructor(private http: HttpClient, private datePipe: DatePipe) {
    this.loadImageAsBase64();
  }

  loadImageAsBase64() {
    // Ruta de la imagen en "assets"
    const imagePath = 'assets/universidad-surcolombiana-multicampos.png';

    // Realiza una solicitud HTTP GET para cargar la imagen como un blob
    this.http.get(imagePath, { responseType: 'blob' }).subscribe((blob) => {
      // Lee el blob como un ArrayBuffer
      const reader = new FileReader();
      reader.readAsDataURL(blob);

      reader.onloadend = () => {
        // La imagen se ha cargado y convertido a base64
        const base64data = reader.result as string;
        this.logo = base64data;

        // Puedes utilizar base64data como necesites
      };
    });
  }

  exportExcel(excelData: { title: any; headers: any; data: any }) {
    //Title, Header & Data
    const title = excelData.title;
    const header = excelData.headers;
    const data = excelData.data;
    console.log('HEADER:', header);

    //Create a workbook with a worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('ListadoPuestoVotacion');
    worksheet.columns = [
      { width: 6 },
      { width: 20 },
      { width: 30 },
      { width: 5 },
      { width: 20 },
      { width: 40 },
      { width: 40 },
      { width: 30 },
    ];
    worksheet.columns.forEach((column) => {
      column.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      column.alignment = { vertical: 'top', horizontal: 'left' };
    });

    worksheet.mergeCells('A5:B5');
    let tituloFecha = worksheet.getCell('A5');
    tituloFecha.value = 'Fecha del reporte:';
    tituloFecha.font = {
      name: 'Open Sans',
      size: 10,
      bold: true,
    };
    tituloFecha.alignment = { vertical: 'middle', horizontal: 'left' };

    // Date
    let fecha = this.datePipe.transform(Date.now(), 'dd-MM-yyyy h:mm a');
    worksheet.mergeCells('C5:H5');
    let celdaFecha = worksheet.getCell('D5');
    celdaFecha.value = fecha;
    celdaFecha.font = {
      name: 'Open Sans',
      size: 10,
      bold: true,
    };
    celdaFecha.alignment = { vertical: 'middle', horizontal: 'left' };

    //TÍTULO
    worksheet.mergeCells('D1:H4');
    let titulo = worksheet.getCell('D1');
    titulo.value = 'Reporte: Puesto Votación Graduados';
    titulo.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '8F141B' },
      bgColor: { argb: '' },
    };
    titulo.font = {
      name: 'Open Sans',
      bold: true,
      color: { argb: 'DFD4A6' },
      size: 14,
    };
    titulo.alignment = { vertical: 'middle', horizontal: 'center' };

    //Add Image
    let myLogoImage = workbook.addImage({
      base64: this.logo,
      extension: 'png',
    });
    worksheet.mergeCells('A1:C4');
    let image = worksheet.getCell('A1');
    worksheet.addImage(myLogoImage, 'A1:C4');

    // Definir el rango de celdas desde A1 hasta C4
    const range = 'A1:H4';

    // Obtener las celdas en el rango
    const cells = worksheet.getCell(range);

    // Establecer el color de fondo en rojo
    cells.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '8F141B' }, // Rojo sólido
    };

    //Blank Row
    //worksheet.addRow([]);

    //Adding Header Row
    let headerRow = worksheet.addRow(header);
    headerRow.eachCell((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '4D626C' },
        bgColor: { argb: '' },
      };
      cell.font = {
        bold: true,
        color: { argb: 'EDEFF0' },
        size: 12,
      };
    });

    // Adding Data with Conditional Formatting
    data.forEach((d: any) => {
      let row = worksheet.addRow(d);
      let sales: any = row.getCell(9);
    });
    worksheet.addRow([]);

    //Generate & Save Excel File
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      saveAs(blob, title + 'xlsx');
    });
  }
}
