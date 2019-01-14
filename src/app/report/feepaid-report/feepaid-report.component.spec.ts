import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeepaidReportComponent } from './feepaid-report.component';

describe('FeepaidReportComponent', () => {
  let component: FeepaidReportComponent;
  let fixture: ComponentFixture<FeepaidReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeepaidReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeepaidReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
