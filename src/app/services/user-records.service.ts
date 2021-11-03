import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { EmptyError, throwError } from 'rxjs';
import { CSVRecord } from './../CSVModel';
import { Employee } from '../employee';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type':'application/json'})
  
};

@Injectable({
  providedIn: 'root'
})
export class UserRecordsService {

  constructor( private http: HttpClient) { }


  getUserRecord(){

    return this.http.get('http://localhost:8081/api/v1/testService').pipe(
      map( ( data:  any) => {console.log('from service : ' + data ); return data;}),
      catchError( error  => {
         console.log('problem in UserRecordService'); return throwError('something went wrong in UserRecordService')})
    )
  }

  saveUserRecord( allEmployees : Employee[] ){
    console.log('inside saveUserRecord');
    allEmployees.forEach((element)=>{
     console.log('UserRecordsService : name : ' + element.firstName );
    });
    const body = JSON.stringify( allEmployees );
    console.log("body : " + body );
    return this.http.post('http://localhost:8081/api/v1/addAll', body, {'headers': httpOptions.headers}).pipe(
      map((data: any ) => {
        return data;
      }), catchError( error => {
        return throwError( 'Something went wrong!' +  error.body);
      })
    )

  }
}
