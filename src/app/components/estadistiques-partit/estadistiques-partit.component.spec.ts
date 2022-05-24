import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadistiquesPartitComponent } from './estadistiques-partit.component';

describe('EstadistiquesPartitComponent', () => {
  let component: EstadistiquesPartitComponent;
  let fixture: ComponentFixture<EstadistiquesPartitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadistiquesPartitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadistiquesPartitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
