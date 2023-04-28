import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

import { StateService } from 'src/app/services/state.service';
import { DevEnv, WasmGoService } from 'src/app/services/wasm-go.service';

@Component({
  selector: 'app-dev-env',
  templateUrl: './dev-env.component.html',
  styleUrls: ['./dev-env.component.css']
})
export class DevEnvComponent implements OnInit {

  form: FormGroup;

  showCreate: boolean = false;

  groupsValues = ['(no group)', 'build', 'test', 'run', 'debug', 'deploy'];
  groupsKeys = ['', 'build', 'test', 'run', 'debug', 'deploy'];

  constructor(
    private wasm: WasmGoService,
    private state: StateService,
  ) {
    this.form = new FormGroup({
      devEnvs: new FormArray([])
    })
  }

  ngOnInit() {
    this.state.state.subscribe(async newContent => {
      
      console.log(newContent);
      if (!newContent?.devEnvs?.length) {
        this.showCreate = true;
        return;
      }

      this.devEnvs().clear();
      for (const devEnv of newContent.devEnvs) {
        const devEnv_i = this.addDevEnv(devEnv);

        for (const userCommand of devEnv.userCommands) {
          this.userCommands(devEnv_i).push(new FormGroup({
            name: new FormControl(userCommand.name),
            group: new FormControl(userCommand.group),
            default: new FormControl(userCommand.default),
            commandLine: new FormControl(userCommand.commandLine),
            hotReloadCapable: new FormControl(userCommand.hotReloadCapable),
            workingDir: new FormControl(userCommand.workingDir),
          }));
        }
      }
      this.showCreate = false;
    });
  }

  newDevEnv(devEnv: DevEnv): FormGroup {
    return new FormGroup({
      name: new FormControl(devEnv.name),
      image: new FormControl(devEnv.image),
      command: new FormControl(devEnv.command),
      args: new FormControl(devEnv.args),
      userCommands: new FormArray([]),
    })
  }

  addDevEnv(devEnv: DevEnv): number {
    this.devEnvs().push(this.newDevEnv(devEnv));
    return this.devEnvs().length-1;
  }

  devEnvs(): FormArray {
    return this.form.get('devEnvs') as FormArray;
  }

  userCommands(devEnv_i: number): FormArray {
    return this.devEnvs().controls[devEnv_i].get("userCommands") as FormArray;
  }

  update(i: number) {
    const devEnvToSave: DevEnv = this.form.value['devEnvs'][i];
    console.log(devEnvToSave);
    const newDevfile = this.wasm.updateContainer(devEnvToSave);
    this.state.changeDevfileYaml(newDevfile);
  }

}
