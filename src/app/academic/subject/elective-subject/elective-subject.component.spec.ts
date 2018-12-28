import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectiveSubjectComponent } from './elective-subject.component';

describe('ElectiveSubjectComponent', () => {
  let component: ElectiveSubjectComponent;
  let fixture: ComponentFixture<ElectiveSubjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectiveSubjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectiveSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
