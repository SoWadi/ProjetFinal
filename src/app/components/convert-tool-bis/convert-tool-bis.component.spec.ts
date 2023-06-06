import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertToolBisComponent } from './convert-tool-bis.component';

describe('ConvertToolBisComponent', () => {
  let component: ConvertToolBisComponent;
  let fixture: ComponentFixture<ConvertToolBisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConvertToolBisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConvertToolBisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
