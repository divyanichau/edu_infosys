import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: []
})
  
export class SectionComponent implements OnInit {
  section = {};
  constructor(private http: HttpClient, private router: Router) { }
  ngOnInit() {
     
     }
 
  saveClass(){
    this.http.post('http://192.168.1.77:8001/api/Section/addsection/', this.section).subscribe(res =>{
            let id =res['id'];
            alert('section added')
            //this.router.navigate(['/add-category', id]);
            
     }, (err) => {
         console.log(err);
     });
    }
}