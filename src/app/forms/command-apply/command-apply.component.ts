import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StateService } from 'src/app/services/state.service';
import { WasmGoService } from 'src/app/services/wasm-go.service';
import { PATTERN_COMMAND_ID } from '../patterns';

@Component({
  selector: 'app-command-apply',
  templateUrl: './command-apply.component.html',
  styleUrls: ['./command-apply.component.css']
})
export class CommandApplyComponent {
  @Output() canceled = new EventEmitter<void>();

  form: FormGroup;
  resourceList: string[] = [];

  constructor(
    private wasm: WasmGoService,
    private state: StateService,
  ) {
    this.form = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.pattern(PATTERN_COMMAND_ID)]),
      component: new FormControl("", [Validators.required]),
    });

    this.state.state.subscribe(async newContent => {
      const resources = newContent?.resources;
      if (resources == null) {
        return
      }
      this.resourceList = resources.map(resource => resource.name);
    });
  }

  create() {
   console.log(this.form.value);
    const newDevfile = this.wasm.addApplyCommand(this.form.value["name"], this.form.value);
    this.state.changeDevfileYaml(newDevfile);
  }

  cancel() {
    this.canceled.emit();
  }
}
