import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { isArray } from 'lodash';
import { ToastrService } from 'ngx-toastr';

import{ DatatableComponent} from '@swimlane/ngx-datatable';
@Component({
  selector: 'app-fee',
  templateUrl: './fee.component.html',
  styleUrls: []
})
export class FeeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
