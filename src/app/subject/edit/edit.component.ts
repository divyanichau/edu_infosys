import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: []
})
export class EditComponent implements OnInit {
	
	subject={};

  constructor(private http:HttpClient, private router: ActivatedRoute) { }

  ngOnInit() {
  	 this.getSubject(this.router.snapshot.params['id']);
  }

  getSubject(id) {
    this.http.get('http://192.168.1.77:8001/subject/'+id).subscribe(data => {
      this.subject = data;
      //console.log(this.student);
    });
  }

  
 updateSubject() {
  	// console.log('updating..', this.subject)
   //  this.http.put('http://192.168.1.77:8001/subject/'+this.subject.id+'/', this.subject)
   //    .subscribe(res => {
   //        alert('updated')
   //      }, (err) => {
   //        console.log(err);
   //      }
   //    );
  }

}
