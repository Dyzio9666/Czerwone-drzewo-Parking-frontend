import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacePicker } from './place-picker';

describe('PlacePicker', () => {
  let component: PlacePicker;
  let fixture: ComponentFixture<PlacePicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlacePicker]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlacePicker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
