import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: []
})
export class ListComponent implements OnInit {
    teachers:any;

  constructor(private http:HttpClient) { }

  ngOnInit() {

  	this.http.get('http://192.168.1.77/teacher/').subscribe(data=>{
  	this.teachers=data;
  });

  }

}
