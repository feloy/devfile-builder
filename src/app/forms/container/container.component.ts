import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PATTERN_COMPONENT_ID } from '../patterns';
import { Container } from 'src/app/services/wasm-go.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent {
  @Input() cancelable: boolean = false;
  @Output() canceled = new EventEmitter<void>();
  @Output() created = new EventEmitter<Container>();

  form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.pattern(PATTERN_COMPONENT_ID)]),
      image: new FormControl("", [Validators.required]),
      command: new FormControl([]),
      args: new FormControl([]),
    })
  }

  create() {
    this.created.emit(this.form.value);
  }

  cancel() {
    this.canceled.emit();
  }
}
