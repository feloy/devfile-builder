import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { DragDropModule } from '@angular/cdk/drag-drop';

import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AppComponent } from './app.component';
import { MetadataComponent } from './forms/metadata/metadata.component';
import { MultiTextComponent } from './controls/multi-text/multi-text.component';
import { ContainersComponent } from './tabs/containers/containers.component';
import { ContainerComponent } from './forms/container/container.component';
import { CommandsComponent } from './tabs/commands/commands.component';
import { CommandExecComponent } from './forms/command-exec/command-exec.component';
import { CommandApplyComponent } from './forms/command-apply/command-apply.component';
import { CommandCompositeComponent } from './forms/command-composite/command-composite.component';
import { SelectContainerComponent } from './controls/select-container/select-container.component';
import { ResourcesComponent } from './tabs/resources/resources.component';
import { ResourceComponent } from './forms/resource/resource.component';
import { ImagesComponent } from './tabs/images/images.component';
import { ImageComponent } from './forms/image/image.component';
import { CommandImageComponent } from './forms/command-image/command-image.component';
import { CommandsListComponent } from './lists/commands-list/commands-list.component';
import { MultiCommandComponent } from './controls/multi-command/multi-command.component';

declare const Go: any;

function loadWasmModule() {
  return () => {
    return new Promise<void>((resolve) => {
      const go = new Go();
      WebAssembly.instantiateStreaming(fetch("./assets/devfile.398d25b99846e2d994ae22ed3a786d7f.wasm"), go.importObject).then((result) => {
          go.run(result.instance);
          resolve();
      });
    });
  };
}

@NgModule({
  declarations: [
    AppComponent,
    MetadataComponent,
    MultiTextComponent,
    ContainersComponent,
    ContainerComponent,
    CommandsComponent,
    CommandExecComponent,
    CommandApplyComponent,
    CommandCompositeComponent,
    SelectContainerComponent,
    ResourcesComponent,
    ResourceComponent,
    ImagesComponent,
    ImageComponent,
    CommandImageComponent,
    CommandsListComponent,
    MultiCommandComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    
    DragDropModule,
    
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: loadWasmModule,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
