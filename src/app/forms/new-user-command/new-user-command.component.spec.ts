import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUserCommandComponent } from './new-user-command.component';

describe('NewUserCommandComponent', () => {
  let component: NewUserCommandComponent;
  let fixture: ComponentFixture<NewUserCommandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewUserCommandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewUserCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
