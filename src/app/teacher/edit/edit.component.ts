import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: []
})
export class EditComponent implements OnInit {
   teacher={};
  
  constructor(private http:HttpClient, private router: Router) { }

  ngOnInit() {
    this.getTeacher(this.route.snapshot.params['id']);
  }

getTeacher(id) {
    this.http.get('http://192.168.1.77:8001/teacher/'+id).subscribe(data => {
      this.teacher = data;
    
    });
  }

  
 updateStudent() {
    console.log('updating..', this.teacher)
    this.http.put('http://192.168.1.77:8001/teacher/'+this.teacher.id+'/', this.teacher)
      .subscribe(res => {
          alert('updated')
        }, (err) => {
          console.log(err);
        }
      );
  }

}



