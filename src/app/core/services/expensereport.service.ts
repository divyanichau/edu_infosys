import { map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UtilsService } from '../../shared/services/utils.service';
import { Config } from '../../shared/classes/app';
import { ExpenseReport } from '../classes/expense-report';
//import { batch } from '../classes/batch';
@Injectable()
export class ExpenseReportService {
    private _expensereportUrl = `${new Config().api}/report/expense_report`;
    private _headers = this._utils.makeHeaders({ withToken: true });
    constructor(private _utils: UtilsService, private _http: Http, private _router: Router) { }
    
    get(expense_report: ExpenseReport): Observable<ExpenseReport[]> {
        
        var url = `${this._expensereportUrl}/?`;
        for (var key in expense_report) {
            var val = expense_report[key];
            if (typeof (val) !== 'undefined' && val !== null) {
                url = url + key + '=' + val + '&';
            }
        }
        console.log(url);
        //this.beforeRequest();
        const options = this._utils.makeOptions(this._headers);
        return this._http.get(url, options).pipe(map((res: Response) => res.json()), tap(data => this.afterGetRequest(), error => { console.log(error); }));
    }
    beforeRequest(): void {
        this._utils.start_progress();
    }
    afterRequest(data: ExpenseReport): void {
        this._utils.stop_progress();
    }
    afterGetRequest(): void {
        this._utils.stop_progress();
    }
    showError(error): void {
        console.log(error);
    }
}
