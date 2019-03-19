import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSelectedCardsComponent } from './show-selected-cards.component';

describe('ShowSelectedCardsComponent', () => {
  let component: ShowSelectedCardsComponent;
  let fixture: ComponentFixture<ShowSelectedCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowSelectedCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSelectedCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
