import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgModule } from '@angular/core';
import { CardComponent } from './card.component';
import { AppMaterial } from '../../app.material.module'
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { SearchPipe } from 'src/app/search.pipe';
import { HttpService } from 'src/app/services/http.service';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppMaterial,
        FlexLayoutModule,
        HttpClientModule,
        SearchPipe,

      ],
      providers:[HttpService],
      declarations: [ CardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
