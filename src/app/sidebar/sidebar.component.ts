import { Component, OnInit } from '@angular/core';

import { UtilsService } from '../shared/services/utils.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(
  	private _utils: UtilsService,
  	) { }

  ngOnInit() {
  }

}
