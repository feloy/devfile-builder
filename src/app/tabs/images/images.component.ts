import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/services/state.service';
import { Image, WasmGoService } from 'src/app/services/wasm-go.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {

  forceDisplayAdd: boolean = false;
  images: Image[] | undefined = [];

  constructor(
    private state: StateService,
    private wasm: WasmGoService,
  ) {}

  ngOnInit() {
    const that = this;
    this.state.state.subscribe(async newContent => {
      that.images = newContent?.images;
      if (this.images == null) {
        return
      }
      that.forceDisplayAdd = false;
    });
  }

  displayAddForm() {
    this.forceDisplayAdd = true;
  }

  undisplayAddForm() {
    this.forceDisplayAdd = false;
  }

  delete(name: string) {
    if(confirm('You will delete the image "'+name+'". Continue?')) {
      const result = this.wasm.deleteImage(name);
      if (result.err != '') {
        alert(result.err);
      } else {
        this.state.changeDevfileYaml(result.value);
      }
    }
  }
}
