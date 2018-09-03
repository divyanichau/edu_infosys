import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: []
})
export class AddCategoryComponent implements OnInit {
        category = {};
  constructor(private http: HttpClient, private router: Router) { }
  ngOnInit() {
     
     }
 
  saveAddCategory(){
    this.http.post('http://192.168.1.77:8000/api/addcategory/addcategory/', this.category).subscribe(res =>{
            let id =res['id'];
            alert('category added')
            
     }, (err) => {
          console.log(err);
     });
    }
}