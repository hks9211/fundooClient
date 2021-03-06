import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnoteComponent } from './addnote.component';
import { AppMaterial } from '../../app.material.module'
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { IconListComponent } from '../icon-list/icon-list.component';
import { Subject } from 'rxjs';


describe('AddnoteComponent', () => {
  let component: AddnoteComponent;
  let fixture: ComponentFixture<AddnoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppMaterial,
        FlexLayoutModule,
        Subject
      ],
      declarations: [ AddnoteComponent,
        IconListComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddnoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
