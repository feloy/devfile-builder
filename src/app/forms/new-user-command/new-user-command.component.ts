import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StateService } from 'src/app/services/state.service';
import { WasmGoService } from 'src/app/services/wasm-go.service';

@Component({
  selector: 'app-new-user-command',
  templateUrl: './new-user-command.component.html',
  styleUrls: ['./new-user-command.component.css']
})
export class NewUserCommandComponent {
  @Input() devEnvName: string = "";

  showForm: boolean = false;

  newName = new FormControl('');
  newCommandLine = new FormControl('');


  constructor(
    private wasm: WasmGoService,
    private state: StateService,
  ) {}

  createNew() {
    if (this.newName.value == null || this.newCommandLine.value == null) {
      // TODO should not happen with form validation
      return;
    }

    console.log(this.devEnvName, this.newName.value, this.newCommandLine.value);
    const newDevfile = this.wasm.addUserCommand(this.devEnvName, this.newName.value, this.newCommandLine.value);
    this.state.changeDevfileYaml(newDevfile);
    
    this.resetNew();
  }

  resetNew() {
    this.newName.setValue("");
    this.newCommandLine.setValue("");
    this.showForm = false;
  }

  createCancel() {
    this.showForm = false;
  }
}
