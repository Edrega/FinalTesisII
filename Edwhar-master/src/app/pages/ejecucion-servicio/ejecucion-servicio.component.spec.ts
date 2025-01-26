import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EjecucionServicioComponent } from './ejecucion-servicio.component';

describe('EjecucionServicioComponent', () => {
  let component: EjecucionServicioComponent;
  let fixture: ComponentFixture<EjecucionServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EjecucionServicioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EjecucionServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
