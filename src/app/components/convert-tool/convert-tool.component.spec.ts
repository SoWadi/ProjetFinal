import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertToolComponent } from './convert-tool.component';

describe('ConvertToolComponent', () => {
  let component: ConvertToolComponent;
  let fixture: ComponentFixture<ConvertToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConvertToolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConvertToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
