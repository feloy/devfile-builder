import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StateService } from 'src/app/services/state.service';
import { WasmGoService } from 'src/app/services/wasm-go.service';

const semverPattern = `^([0-9]+)\\.([0-9]+)\\.([0-9]+)(\\-[0-9a-z-]+(\\.[0-9a-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$`;

@Component({
  selector: 'app-metadata',
  templateUrl: './metadata.component.html',
  styleUrls: ['./metadata.component.css']
})
export class MetadataComponent implements OnInit {

  form: FormGroup;

  constructor(
    private wasm: WasmGoService,
    private state: StateService,
  ) {
    this.form = new FormGroup({
      name: new FormControl(''),
      version: new FormControl('', Validators.pattern(semverPattern)),
      displayName: new FormControl(''),
      description: new FormControl(''),
      tags: new FormControl(""),
      architectures: new FormControl(""),
      icon: new FormControl(""),
      globalMemoryLimit: new FormControl(""),
      projectType: new FormControl(""),
      language: new FormControl(""),
      website: new FormControl(""),
      provider: new FormControl(""),
      supportUrl: new FormControl(""),        
    });
  }

  ngOnInit() {
    this.state.state.subscribe(async newContent => {
      const metadata = newContent?.metadata;
      if (metadata == null) {
        return
      }
      this.form.setValue(metadata);
    });
  }

  onSave() {
    const result = this.wasm.setMetadata(this.form.value);
    if (result.err != '') {
      alert(result.err);
    } else {
      this.state.changeDevfileYaml(result.value);
    }
  }
}
