import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibaryReportComponent } from './libary-report.component';

describe('LibaryReportComponent', () => {
  let component: LibaryReportComponent;
  let fixture: ComponentFixture<LibaryReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibaryReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibaryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
