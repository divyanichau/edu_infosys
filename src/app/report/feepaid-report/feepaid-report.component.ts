import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feepaid-report',
  templateUrl: './feepaid-report.component.html',
  styleUrls: ['./feepaid-report.component.css']
})
export class FeepaidReportComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  

  rows = [
    {
      name: 'Claudine Nealsaffsgsggssgshshshshsyshbsnshsjhbshshshs',
      gender: 'female',
      company: 'Sealoud'
    },
    {
      name: 'Beryl Rice',
      gender: 'female',
      company: 'Velity',
      _class: 'asdfght',
      subject : 'asdfgh'
     
     
    }
  ];

  columns = [
    { name: 'Nameasdfghjklmnopqrstuvwxyz' },
    { name: 'Gender' },
    { name: 'Company' },
    {name: '_Class'},
    {name: 'Subject'}
  ];

  allColumns = [
    { name: 'Name' },
    { name: 'Gender' },
    { name: 'Company' },
    {name: 'Class'},
    {name: 'Subject'}
  ];

  toggle(col) {
    const isChecked = this.isChecked(col);

    if(isChecked) {
      this.columns = this.columns.filter(c => { 
        return c.name !== col.name; 
      });
    } else {
      this.columns = [...this.columns, col];
    }
  }

  isChecked(col) {
    return this.columns.find(c => {
      return c.name === col.name;
    });
  }

}
