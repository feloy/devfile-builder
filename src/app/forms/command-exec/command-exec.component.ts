import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StateService } from 'src/app/services/state.service';
import { WasmGoService } from 'src/app/services/wasm-go.service';
import { PATTERN_COMMAND_ID } from '../patterns';

@Component({
  selector: 'app-command-exec',
  templateUrl: './command-exec.component.html',
  styleUrls: ['./command-exec.component.css']
})
export class CommandExecComponent {
  @Output() canceled = new EventEmitter<void>();

  form: FormGroup;
  containerList: string[] = [];

  constructor(
    private wasm: WasmGoService,
    private state: StateService,
  ) {
    this.form = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.pattern(PATTERN_COMMAND_ID)]),
      component: new FormControl("", [Validators.required]),
      commandLine: new FormControl("", [Validators.required]),
      workingDir: new FormControl("", [Validators.required]),
      hotReloadCapable: new FormControl(false),
    });

    this.state.state.subscribe(async newContent => {
      const containers = newContent?.containers;
      if (containers == null) {
        return
      }
      this.containerList = containers.map(container => container.name);
    });
  }

  create() {
   console.log(this.form.value);
    const newDevfile = this.wasm.addExecCommand(this.form.value["name"], this.form.value);
    this.state.changeDevfileYaml(newDevfile);
  }

  cancel() {
    this.canceled.emit();
  }
}
