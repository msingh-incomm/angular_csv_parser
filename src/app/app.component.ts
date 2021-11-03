import { Component, OnInit, ViewChild } from '@angular/core';  
import { emit } from 'process';
import { element } from 'protractor';
import { CSVRecord } from './CSVModel';  
import { Employee } from './employee';
import { UserRecordsService } from './services/user-records.service';
  
@Component({  
  selector: 'app-root',  
  templateUrl: './app.component.html',  
  styleUrls: ['./app.component.css']  
})  
  
export class AppComponent{  
  title = 'Angular7-readCSV';  
  
  public records: any[] = [];  
  @ViewChild('csvReader') csvReader: any; 
  
  constructor ( private userRecordsService : UserRecordsService ){

  }
  
  uploadListener($event: any): void {  
  
    let text = [];  
    let files = $event.srcElement.files;  
  
    if (this.isValidCSVFile(files[0])) {  
  
      let input = $event.target;  
      let reader = new FileReader();  
      reader.readAsText(input.files[0]);  
  
      reader.onload = () => {  
        let csvData = reader.result; 
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);  
  
        let headersRow = this.getHeaderArray(csvRecordsArray);  
  
        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);  
      };  
  
      reader.onerror = function () {  
        console.log('error is occured while reading file!');  
      };  
  
    } else {  
      alert("Please import valid .csv file.");  
      this.fileReset();  
    }  
  }  
  
  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {  
    let csvArr = [];  
  
    for (let i = 1; i < csvRecordsArray.length; i++) {  
      let curruntRecord = (<string>csvRecordsArray[i]).split(',');  
      if (curruntRecord.length == headerLength) {  
        let csvRecord: CSVRecord = new CSVRecord();  
        csvRecord.id = curruntRecord[0].trim();  
        csvRecord.firstName = curruntRecord[1].trim();  
        csvRecord.lastName = curruntRecord[2].trim();  
        csvRecord.age = curruntRecord[3].trim();  
        csvRecord.position = curruntRecord[4].trim();  
        csvRecord.mobile = curruntRecord[5].trim();  
        csvArr.push(csvRecord);  
      }  
    } 
    
    return csvArr; 
  }  
  
  isValidCSVFile(file: any) {  
    return file.name.endsWith(".csv");  
  }  
  
  getHeaderArray(csvRecordsArr: any) {  
    let headers = (<string>csvRecordsArr[0]).split(',');  
    let headerArray = [];  
    for (let j = 0; j < headers.length; j++) {  
      headerArray.push(headers[j]);  
    }  
    return headerArray;  
  }  
  
  fileReset() {  
    this.csvReader.nativeElement.value = "";  
    this.records = [];  
  } 

  getData(){
    console.log('inside submit data c');

    let allEmployees: Employee[] = [];
    this.records.forEach((element)=>{
      let emp: Employee = new Employee(); 
      emp.id = element.id;
      emp.firstName = element.firstName;
      emp.age = element.age;
      allEmployees.push( emp );
      //console.log('first name is : ' + element.firstName);
    });

    allEmployees.forEach((element)=>{
      console.log('name is : ' + element.firstName);
    });

    this.userRecordsService.getUserRecord().subscribe((data:any) => {
      console.log('data coming from service : ' + data );
    });
  }
  
  submitData(){
    console.log('inside submit data c');

    let allEmployees: Employee[] = [];
    this.records.forEach((element)=>{
      let emp: Employee = new Employee(); 
      emp.id = element.id;
      emp.firstName = element.firstName;
      emp.lastName = element.lastName;
      emp.age = element.age;
      emp.position = element.position;
      emp.mobile = element.mobile;
      allEmployees.push( emp );
      //console.log('first name is : ' + element.firstName);
    });

    allEmployees.forEach((element)=>{
      console.log('name is : ' + element.firstName);
    });

    this.userRecordsService.saveUserRecord( allEmployees ).subscribe((data:any) => {
      let tempEmpList: Employee[] = data;
      tempEmpList.forEach((data) =>{console.log('retunred first Name : ' + data.firstName) })
      console.log('data coming from service : ' + data );
    });
  }
}              