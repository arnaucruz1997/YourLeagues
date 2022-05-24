import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartitsComponent } from './partits.component';

describe('PartitsComponent', () => {
  let component: PartitsComponent;
  let fixture: ComponentFixture<PartitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
