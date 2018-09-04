import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: []
})
export class PaymentComponent implements OnInit {
   payment = {};
   
  constructor(private http: HttpClient, private router: Router) { }
  ngOnInit() {
   
     }
 savePayment() {
 	this.http.post('http://192.168.1.87:8001/payment/',this.payment).subscribe(res=>{
  let id=res['id'];
  this.router.navigate(['/payment',id]);
}, (err)=> {
	console.log(err);
}
  );

 	}
 }