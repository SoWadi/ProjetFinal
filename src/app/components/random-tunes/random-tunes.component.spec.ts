import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomTunesComponent } from './random-tunes.component';

describe('RandomTunesComponent', () => {
  let component: RandomTunesComponent;
  let fixture: ComponentFixture<RandomTunesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RandomTunesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RandomTunesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
