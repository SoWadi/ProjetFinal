import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranspositionComponent } from './transposition.component';

describe('TranspositionComponent', () => {
  let component: TranspositionComponent;
  let fixture: ComponentFixture<TranspositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TranspositionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TranspositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
