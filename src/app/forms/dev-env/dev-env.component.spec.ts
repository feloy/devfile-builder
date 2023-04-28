import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevEnvComponent } from './dev-env.component';

describe('DevEnvComponent', () => {
  let component: DevEnvComponent;
  let fixture: ComponentFixture<DevEnvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevEnvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevEnvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
