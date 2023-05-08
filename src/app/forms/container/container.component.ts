import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { PATTERN_COMPONENT_ID } from '../patterns';
import { Container, WasmGoService } from 'src/app/services/wasm-go.service';

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

  quantityErrMsgMemory = 'Numeric value, with optional unit Ki, Mi, Gi, Ti, Pi, Ei';
  quantityErrMsgCPU = 'Numeric value, with optional unit m, k, M, G, T, P, E';

  constructor(
    private wasm: WasmGoService,
  ) {
    this.form = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.pattern(PATTERN_COMPONENT_ID)]),
      image: new FormControl("", [Validators.required]),
      command: new FormControl([]),
      args: new FormControl([]),
      memoryRequest: new FormControl("", [this.isQuantity()]),
      memoryLimit: new FormControl("", [this.isQuantity()]),
      cpuRequest: new FormControl("", [this.isQuantity()]),
      cpuLimit: new FormControl("", [this.isQuantity()]),
    })
  }

  create() {
    this.created.emit(this.form.value);
  }

  cancel() {
    this.canceled.emit();
  }

  isQuantity():  ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const val = control.value;
      if (val == '') {
        return null;
      }
      const valid = this.wasm.isQuantityValid(val);
      if (!valid) {
        return {
          "isQuantity": false,
        }
      }
      return null;
    };
  }   
}
