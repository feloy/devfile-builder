import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StateService } from 'src/app/services/state.service';
import { WasmGoService } from 'src/app/services/wasm-go.service';
import { PATTERN_COMMAND_ID, PATTERN_CONTAINER_ID } from '../patterns';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent {
  @Input() cancelable: boolean = false;
  @Output() canceled = new EventEmitter<void>();

  form: FormGroup;

  constructor(
    private wasm: WasmGoService,
    private state: StateService,
  ) {
    this.form = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.pattern(PATTERN_CONTAINER_ID)]),
      image: new FormControl("", [Validators.required]),
      command: new FormControl([]),
      args: new FormControl([]),
    })
  }

  create() {
    const newDevfile = this.wasm.addContainer(this.form.value);
    this.state.changeDevfileYaml(newDevfile);
  }

  cancel() {
    this.canceled.emit();
  }
}
