import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StateService } from 'src/app/services/state.service';
import { WasmGoService } from 'src/app/services/wasm-go.service';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})
export class ResourceComponent {
  @Input() cancelable: boolean = false;
  @Output() canceled = new EventEmitter<void>();

form: FormGroup;

  constructor(
    private wasm: WasmGoService,
    private state: StateService,
  ) {
    this.form = new FormGroup({
      name: new FormControl("", [Validators.required]),
      inlined: new FormControl("", [Validators.required]),
    })
  }

  create() {
    const newDevfile = this.wasm.addResource(this.form.value);
    this.state.changeDevfileYaml(newDevfile);
  }

  cancel() {
    this.canceled.emit();
  }
}
