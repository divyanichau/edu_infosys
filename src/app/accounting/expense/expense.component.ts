import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: []
})
export class ExpenseComponent implements OnInit {
   expense = {};
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }
  ngOnInit() {
     this.getExpense(this.route.snapshot.params['id']);
     }
 getExpense(id) {
    this.http.get('http://192.168.1.77:8001/expense/').subscribe(data => {
    	
      this.expense = data;
     });
  }
updateExpense() {
  var expense = this.expense;
    console.log('updating..', this.expense)
    this.http.put('http://192.168.1.77:8001/expense/'+this.expense '/' this.expense)
      .subscribe(res => {
          alert('updated')
        }, (err) => {
          console.log(err);
        }
      );
  }
}