import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapoComponent } from './capo.component';

describe('CapoComponent', () => {
  let component: CapoComponent;
  let fixture: ComponentFixture<CapoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
