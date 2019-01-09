import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DueReportComponent } from './due-report.component';

describe('DueReportComponent', () => {
  let component: DueReportComponent;
  let fixture: ComponentFixture<DueReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DueReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DueReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
