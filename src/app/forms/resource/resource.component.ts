import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClusterResource } from 'src/app/services/wasm-go.service';
import { PATTERN_COMPONENT_ID } from '../patterns';

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
  uriOrInlined: string = 'uri';

  constructor() {
    this.form = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.pattern(PATTERN_COMPONENT_ID)]),
      uri: new FormControl("", [Validators.required]),
      inlined: new FormControl("", []),
    })
  }

  changeUriOrInlined(value: string) {
    this.uriOrInlined = value;
    if (this.uriOrInlined == 'uri') {
      this.form.controls['inlined'].removeValidators(Validators.required);
      this.form.controls['inlined'].setValue('');
      
      this.form.controls['uri']?.addValidators(Validators.required);
    } else if (this.uriOrInlined == 'inlined') {
      this.form.controls['uri']?.removeValidators(Validators.required);
      this.form.controls['uri'].setValue('');

      this.form.controls['inlined']?.setValidators(Validators.required);
    }
    this.form.controls['uri'].updateValueAndValidity()
    this.form.controls['inlined'].updateValueAndValidity()
  }

  create() {
    this.created.emit(this.form.value);
  }

  cancel() {
    this.canceled.emit();    
  }
}
