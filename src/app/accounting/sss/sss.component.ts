import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-sss',
  templateUrl: './sss.component.html',
  styleUrls: []
})
  
export class SssComponent implements OnInit {
  selectedDevice = 'Personal Details';
  default_detail_type = {1:false, 2:false, 3:false, 4:false, 5:false};
  detail_type = this.default_detail_type;

  student = {}


  onChange(newValue) {
    this.reset_details_value();
    this.detail_type[newValue] = true;
  }

  reset_details_value(){
    this.detail_type = this.default_detail_type;
  }
  constructor(private http: HttpClient, private router: Router) { }
  ngOnInit() {
        this.reset_details_value();
        this.detail_type[1] = true;
     }
 
  saveStudent(){
    this.http.post('http://192.168.1.77:8001/api/student/addstudent/', this.student).subscribe(res =>{
            let id =res['id'];
            alert('student added')
            //this.router.navigate(['/add-category', id]);
            
     }, (err) => {
         console.log(err);
     });
    }
}
