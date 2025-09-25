import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularCatigoriesComponent } from './popular-catigories.component';

describe('PopularCatigoriesComponent', () => {
  let component: PopularCatigoriesComponent;
  let fixture: ComponentFixture<PopularCatigoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopularCatigoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopularCatigoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
