import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: []
})
export class EditComponent implements OnInit {
	
	student={};

  constructor(private http:HttpClient, private router: ActivatedRoute) { }

  ngOnInit() {
  	 this.getStudent(this.router.snapshot.params['id']);
  }

  getStudent(id) {
    this.http.get('http://192.168.1.77/student/'+id).subscribe(data => {
      this.student = data;
      //console.log(this.student);
    });
  }

  
 updateStudent() {
  	// console.log('updating..', this.student)
   //  this.http.put('http://192.168.1.77/student/'+this.student.id+'/', this.student)
   //    .subscribe(res => {
   //        alert('updated')
   //      }, (err) => {
   //        console.log(err);
   //      }
   //    );
  }

}
