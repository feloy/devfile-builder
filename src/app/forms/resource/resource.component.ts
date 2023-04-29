import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClusterResource } from 'src/app/services/wasm-go.service';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})
export class ResourceComponent {
  @Input() cancelable: boolean = false;
  @Output() canceled = new EventEmitter<void>();
  @Output() created = new EventEmitter<ClusterResource>();

form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      name: new FormControl("", [Validators.required]),
      inlined: new FormControl("", [Validators.required]),
    })
  }

  create() {
    this.created.emit(this.form.value);
  }

  cancel() {
    this.canceled.emit();
  }
}
