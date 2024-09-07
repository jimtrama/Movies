import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMoviePageComponent } from './create-movie-page.component';

describe('CreateMoviePageComponent', () => {
  let component: CreateMoviePageComponent;
  let fixture: ComponentFixture<CreateMoviePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateMoviePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateMoviePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
