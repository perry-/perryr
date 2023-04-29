import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecipitationStatusComponent } from './precipitation-status.component';

describe('PrecipitationStatusComponent', () => {
  let component: PrecipitationStatusComponent;
  let fixture: ComponentFixture<PrecipitationStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrecipitationStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrecipitationStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
