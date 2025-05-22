import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaCepComponent } from './consulta-cep.component';

describe('ConsultaCepComponent', () => {
  let component: ConsultaCepComponent;
  let fixture: ComponentFixture<ConsultaCepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsultaCepComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultaCepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
