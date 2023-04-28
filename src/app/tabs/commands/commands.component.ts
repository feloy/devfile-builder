import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { StateService } from 'src/app/services/state.service';
import { Command, WasmGoService } from 'src/app/services/wasm-go.service';

@Component({
  selector: 'app-commands',
  templateUrl: './commands.component.html',
  styleUrls: ['./commands.component.css']
})
export class CommandsComponent {

  forceDisplayExecForm: boolean = false;
  forceDisplayApplyForm: boolean = false;
  forceDisplayImageForm: boolean = false;
  forceDisplayCompositeForm: boolean = false;

  commands: Command[] | undefined = [];

  constructor(
    private state: StateService,
    private wasm: WasmGoService,
  ) {}

  ngOnInit() {
    const that = this;
    this.state.state.subscribe(async newContent => {
      that.commands = newContent?.commands;
      if (this.commands == null) {
        return
      }
      that.forceDisplayExecForm = false;
      this.forceDisplayApplyForm = false;
      this.forceDisplayCompositeForm = false;
    });
  }

  displayExecForm() {
    this.forceDisplayExecForm = true;
  }

  displayApplyForm() {
    this.forceDisplayApplyForm = true;
  }

  displayImageForm() {
    this.forceDisplayImageForm = true;
  }

  displayCompositeForm() {
    this.forceDisplayCompositeForm = true;
  }

  undisplayExecForm() {
    this.forceDisplayExecForm = false;
  }

  undisplayApplyForm() {
    this.forceDisplayApplyForm = false;
  }

  undisplayImageForm() {
    this.forceDisplayImageForm = false;
  }

  undisplayCompositeForm() {
    this.forceDisplayCompositeForm = false;
  }

  drop(event: CdkDragDrop<string>) {
    this.moveCommand(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex,
    );
  }

  moveCommand(previousKind: string, newKind: string, previousIndex: number, newIndex: number) {
    const newDevfile = this.wasm.moveCommand(previousKind, newKind, previousIndex, newIndex);
    this.state.changeDevfileYaml(newDevfile);
  }
}
