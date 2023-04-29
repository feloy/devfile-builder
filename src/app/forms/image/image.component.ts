import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Image } from 'src/app/services/wasm-go.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent {
  @Input() cancelable: boolean = false;
  @Output() canceled = new EventEmitter<void>();
  @Output() created = new EventEmitter<Image>();

  form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      name: new FormControl("", [Validators.required]),
      imageName: new FormControl("", [Validators.required]),
      args: new FormControl([]),
      buildContext: new FormControl(""),
      rootRequired: new FormControl(false),
      uri: new FormControl("", [Validators.required]),
    })
  }

  create() {
    this.created.emit(this.form.value);
  }

  cancel() {
    this.canceled.emit();
  }
}
