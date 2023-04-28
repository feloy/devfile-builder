import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDevEnvComponent } from './new-dev-env.component';

describe('NewDevEnvComponent', () => {
  let component: NewDevEnvComponent;
  let fixture: ComponentFixture<NewDevEnvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewDevEnvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewDevEnvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
