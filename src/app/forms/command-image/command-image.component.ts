import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StateService } from 'src/app/services/state.service';
import { Image, WasmGoService } from 'src/app/services/wasm-go.service';
import { PATTERN_COMMAND_ID } from '../patterns';

@Component({
  selector: 'app-command-image',
  templateUrl: './command-image.component.html',
  styleUrls: ['./command-image.component.css']
})
export class CommandImageComponent {
  @Output() canceled = new EventEmitter<void>();

  form: FormGroup;
  imageList: string[] = [];
  showNewImage: boolean = false;
  imageToCreate: Image | null = null;

  constructor(
    private wasm: WasmGoService,
    private state: StateService,
  ) {
    this.form = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.pattern(PATTERN_COMMAND_ID)]),
      component: new FormControl("", [Validators.required]),
    });

    this.state.state.subscribe(async newContent => {
      const images = newContent?.images;
      if (images == null) {
        return
      }
      this.imageList = images.map(image => image.name);
    });
  }

  create() {
    if (this.imageToCreate != null && 
      this.imageToCreate?.name == this.form.controls["component"].value) {
      const result = this.wasm.addImage(this.imageToCreate);
      // TODO check result error
    }

  const newDevfile = this.wasm.addApplyCommand(this.form.value["name"], this.form.value);
    this.state.changeDevfileYaml(newDevfile);
  }

  cancel() {
    this.canceled.emit();
  }

  onCreateNewImage(v: boolean) {
    this.showNewImage = v;
  }

  onNewImageCreated(image: Image) {
    this.imageList.push(image.name);
    this.form.controls["component"].setValue(image.name);
    this.showNewImage = false;
    this.imageToCreate = image;
  }
}
