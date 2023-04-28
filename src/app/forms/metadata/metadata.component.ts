import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StateService } from 'src/app/services/state.service';
import { WasmGoService } from 'src/app/services/wasm-go.service';


@Component({
  selector: 'app-metadata',
  templateUrl: './metadata.component.html',
  styleUrls: ['./metadata.component.css']
})
export class MetadataComponent implements OnInit {
  
  name = new FormControl('');
  version = new FormControl('');
  displayName = new FormControl('');
  description = new FormControl('');
  tags = new FormControl("");
  architectures = new FormControl("");
  icon = new FormControl("");
  globalMemoryLimit = new FormControl("");
  projectType = new FormControl("");
  language = new FormControl("");
  website = new FormControl("");
  provider = new FormControl("");
  supportUrl = new FormControl("");

  constructor(
    private wasm: WasmGoService,
    private state: StateService,
  ) {}

  ngOnInit() {
    this.state.state.subscribe(async newContent => {
      const metadata = newContent?.metadata;
      if (metadata == null) {
        return
      }
      this.name.setValue(metadata.name);
      this.version.setValue(metadata.version);
      this.displayName.setValue(metadata.displayName);
      this.description.setValue(metadata.description);
      this.tags.setValue(metadata.tags)
      this.architectures.setValue(metadata.architectures)
      this.icon.setValue(metadata.icon)
      this.globalMemoryLimit.setValue(metadata.globalMemoryLimit)
      this.projectType.setValue(metadata.projectType)
      this.language.setValue(metadata.language)
      this.website.setValue(metadata.website)
      this.provider.setValue(metadata.provider)
      this.supportUrl.setValue(metadata.supportUrl)
    });
  }

  onSave() {
    const newDevfile = this.wasm.setMetadata({
      name: this.name.value,
      version: this.version.value,
      displayName: this.displayName.value,
      description: this.description.value,
      tags: this.tags.value,
      architectures: this.architectures.value,
      icon: this.icon.value,
      globalMemoryLimit: this.globalMemoryLimit.value,
      projectType: this.projectType.value,
      language: this.language.value,
      website: this.website.value,
      provider: this.provider.value,
      supportUrl: this.supportUrl.value,
    })
    this.state.changeDevfileYaml(newDevfile);
  }
}
