import { Component, OnInit } from '@angular/core';
import { switchMap} from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { isArray, isObject } from 'lodash';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


import { UtilsService } from '../../../../shared/services/utils.service';
import { SubjectService } from '../../../../core/services/subject.service';
import { Subject } from '../../../../core/classes/subject';



@Component({
  selector: 'app-subject-detail',
  templateUrl: './subject-detail.component.html',
  styleUrls: []
})
export class SubjectDetailComponent implements OnInit {
  private _sub: Subscription = undefined;
  private _typeSub: Subscription = undefined;
  //subject : Subject;
  subject : Subject =new Subject();
   id:string;


  constructor(
  	private _subjectService: SubjectService,
    private _utils: UtilsService,
    private _routes:ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
     private _router:Router
    ) { }

  ngOnInit() {
  	  this.initSubject();
  }

  ngOnDestroy() {
    this._utils.unsubscribeSub(this._sub);
  }

 initSubject() {
    this._utils.unsubscribeSub(this._typeSub);
    this._sub = this._routes.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.id = params.get('id');
        return this._subjectService.find(this.id);
      }))
      .subscribe(data => {
        if (isObject(data)) {
        this.subject = data;
        //this.rows = this.subjects;
       // this.temp = [...this.subjects];
       //this.subject= new Subject();
      }
     });
    }
      
  OnSubmitSubjectUpdate(){
    console.log("Data To Be Updated",this.subject);
    console.log(this.id);
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._subjectService.update(this.subject,this.id)
      .subscribe(data => {
       this._router.navigate(['academic/subject/add-subject']);
      });
 }
  

}
