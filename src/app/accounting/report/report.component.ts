import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: []
})
export class ReportComponent implements OnInit {
        report = {};
  constructor(private http: HttpClient, private router: Router) { }
  ngOnInit() {
     
     }
 
  saveReport(){
    this.http.post('http://192.168.1.77:8000/api/report/report/', this.report).subscribe(res =>{
            let id =res['id'];
            alert('report')
            
     }, (err) => {
          console.log(err);
     });
    }
}