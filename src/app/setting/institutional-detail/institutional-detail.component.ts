import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { UtilsService } from 'src/app/shared/services/utils.service';
import { InstitutionalDetail } from '../../core/classes/setting';
import { SettingService } from 'src/app/core/services/setting.service';

@Component({
  selector: 'app-institutional-detail',
  templateUrl: './institutional-detail.component.html',
  styleUrls: ['./institutional-detail.component.css']
})
export class InstitutionalDetailComponent implements OnInit {

  private _sub: Subscription = undefined;
  private _typeSub: Subscription = undefined;

  _institute_detail : InstitutionalDetail = new InstitutionalDetail();
  fileToUpload: File = null
  constructor(
    private _settingService: SettingService,
    private _utils: UtilsService,

  ) { }

  ngOnInit() {
    this.initAcademicDetail()
  }

  initAcademicDetail() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._settingService.get()
      .subscribe(data => {
      // console.log(data)
      this._institute_detail = data
    
      });
  }
  onSubmitInstituteDetail() {
    // console.log(this._institute_detail)
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._settingService.AddInstituteDetail(this._institute_detail)
      .subscribe(data => {
      // console.log(data);
       this.initAcademicDetail()
      });
  }

  uploadLogo(files: FileList){
    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload)
    this._settingService.uploadLogo(this.fileToUpload)
      .subscribe(data => {
        this.initAcademicDetail();
      })
  }

}
