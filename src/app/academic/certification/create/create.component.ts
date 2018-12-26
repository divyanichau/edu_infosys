import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: []
})
export class CreateComponent implements OnInit {
  isclicked : boolean=true;
  stdName :boolean=true;
  course:boolean=true;
  constructor(
   
    
  ) { }

  ngOnInit() {
  
  }
  OnChangeCourse(){
    console.log('hkhkh')
    console.log(this.stdName);
    this.stdName=false;
   
  }
  OnChangeStd(){
    alert("course selected")
    this.course=false;
  }
  GenerateCertificate(){
    console.log(this.stdName)
    if(this.stdName==false && this.course==false){
      this.isclicked = !this.isclicked;
    }
   }
}
