import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: []
})
export class TeacherComponent implements OnInit {
        teacher = {};
  constructor(private http: HttpClient, private router: Router) { }
  ngOnInit() {
     
     }
 
  saveTeacher(){
    this.http.post('http://192.168.1.77:8000/api/teacher/addteacher/', this.teacher).subscribe(res =>{
            let id =res['id'];
            alert('teacher added')
            
     }, (err) => {
          console.log(err);
     });
    }
}