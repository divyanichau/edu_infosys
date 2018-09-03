import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: []
})
  
export class ClassComponent implements OnInit {
  class = {};
  constructor(private http: HttpClient, private router: Router) { }
  ngOnInit() {
     
     }
 
  saveClass(){
    this.http.post('http://192.168.1.77:8001/api/Class/addclass/', this.class).subscribe(res =>{
            let id =res['id'];
            alert('class added')
            //this.router.navigate(['/add-category', id]);
            
     }, (err) => {
         console.log(err);
     });
    }
}