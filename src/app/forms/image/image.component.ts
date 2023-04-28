import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StateService } from 'src/app/services/state.service';
import { WasmGoService } from 'src/app/services/wasm-go.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent {
  @Input() cancelable: boolean = false;
  @Output() canceled = new EventEmitter<void>();

  form: FormGroup;

  constructor(
    private wasm: WasmGoService,
    private state: StateService,
  ) {
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
    const newDevfile = this.wasm.addImage(this.form.value);
    this.state.changeDevfileYaml(newDevfile);
  }

  cancel() {
    this.canceled.emit();
  }
}
