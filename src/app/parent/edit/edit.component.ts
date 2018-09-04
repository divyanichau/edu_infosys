import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: []
})
export class EditComponent implements OnInit {
	
	parents={};

  constructor(private http:HttpClient, private router: ActivatedRoute) { }
  ngOnInit() 
  {

     this.getParents(this.router.snapshot.params['id']);
  }
  getParents(id) {
    this.http.get('http://192.168.1.77:8001/parents/'+id).subscribe(data => {
      this.parents = data;
           
    });
  }
 updateParents() {
  	// console.log('updating..', this.parents)
   //  this.http.put('http://192.168.1.77:8001/parents/'+this.parents.id+'/', this.parents)
   //    .subscribe(res => {
   //        alert('updated')
   //      }, (err) => {
   //        console.log(err);
   //      }
   //    );
  }

}
