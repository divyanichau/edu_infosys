import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: []
})
export class AddComponent implements OnInit {
  teacher={user:{}};
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
 //  	this.http.get('http://192.168.1.77/teacher/',this.teacher).subscribe(res=> {
 //  		let id=res['id']; 
	//     this.router.navigate(['/teacher-add', id]);
	// },(err)=> {
	// 	console.log(err);
 //  }
  
 //      );
  }
	
}
