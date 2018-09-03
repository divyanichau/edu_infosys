import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: []
})
  
export class StudentComponent implements OnInit {
  student = {father:{} mother:{} contact{}};
  constructor(private http: HttpClient, private router: Router) { }
  ngOnInit() {
     
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
