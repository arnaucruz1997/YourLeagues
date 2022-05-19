import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificacioComponent } from './classificacio.component';

describe('ClassificacioComponent', () => {
  let component: ClassificacioComponent;
  let fixture: ComponentFixture<ClassificacioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassificacioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassificacioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
