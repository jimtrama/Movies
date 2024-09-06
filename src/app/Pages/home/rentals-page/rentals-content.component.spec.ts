import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalsContentComponent } from './rentals-content.component';

describe('RentalsContentComponent', () => {
  let component: RentalsContentComponent;
  let fixture: ComponentFixture<RentalsContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RentalsContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentalsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
