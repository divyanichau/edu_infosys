import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: []
})
export class CreateComponent implements OnInit {
  isclicked : boolean=true;

  constructor() { }

  ngOnInit() {
  }

  GenerateCertificate(){
    this.isclicked = !this.isclicked;

  }
}
