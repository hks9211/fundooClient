import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestcropperComponent } from './testcropper.component';

describe('TestcropperComponent', () => {
  let component: TestcropperComponent;
  let fixture: ComponentFixture<TestcropperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestcropperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestcropperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
