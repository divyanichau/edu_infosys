import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: []
})

export class EditComponent implements OnInit {

   transport={};
  
  constructor(private http:HttpClient, private router: Router) { }

  ngOnInit() {
    this.getTransport(this.route.snapshot.params['id']);
  }

getTransport(id) {
    this.http.get('http://192.168.1.77:8001/transport/'+id).subscribe(data => {
      this.transport = data;
    
    });
  }

 updateTransport() {
    console.log('updating..', this.transport)
    this.http.put('http://192.168.1.77:8001/transport/'+this.transport.id+'/', this.transport)
      .subscribe(res => {
          alert('updated')
        }, (err) => {
          console.log(err);
        }
      );
  }

}



