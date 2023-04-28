import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StateService } from 'src/app/services/state.service';
import { WasmGoService } from 'src/app/services/wasm-go.service';

@Component({
  selector: 'app-new-dev-env',
  templateUrl: './new-dev-env.component.html',
  styleUrls: ['./new-dev-env.component.css']
})
export class NewDevEnvComponent {

  @Input() showForm: boolean = true;

  newName = new FormControl('');
  newImage = new FormControl('');

  constructor(
    private state: StateService,
    private wasm: WasmGoService,
  ) {}

  createNew() {
    if (this.newName.value == null || this.newImage.value == null) {
      // TODO should not happen with form validation
      return;
    }
    const newDevfile = this.wasm.addContainer({
      name: this.newName.value,
      image: this.newImage.value,
      command: [],
      args:[],
    });
    this.state.changeDevfileYaml(newDevfile);
    
    this.resetNew();
  }

  resetNew() {
    this.newName.setValue("");
    this.newImage.setValue("");
    this.showForm = false;
  }

  createCancel() {
    this.showForm = false;
  }
}
