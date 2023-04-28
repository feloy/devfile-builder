import { Injectable } from '@angular/core';

type ChartResult = {
  err: string;
  value: any;
};

type Result = {
  err: string;
  value: ResultValue;
};

export type ResultValue = {
  content: string;
  metadata: Metadata;
  commands: Command[];
  containers: Container[];
  images: Image[];
  resources: ClusterResource[];
  devEnvs: DevEnv[];
};

export type Metadata = {
  name: string | null;
  version: string | null;
  displayName: string | null;
  description: string | null;
  tags: string | null;
  architectures: string | null;
  icon: string | null;
  globalMemoryLimit: string | null;
  projectType: string | null;
  language: string | null;
  website: string | null;
  provider: string | null;
  supportUrl: string | null;
};

export type Command = {
  name: string;
  group: string;
  default: boolean;
  type: "exec" | "apply" | "image" | "composite";
  exec: ExecCommand | undefined;
  apply: ApplyCommand | undefined;
  image: ImageCommand | undefined;
  composite: CompositeCommand | undefined;
};

export type ExecCommand = {
  component: string;
  commandLine: string;
  workingDir: string;
  hotReloadCapable: boolean;
};

export type ApplyCommand = {
  component: string;
};

export type ImageCommand = {
  component: string;
};

export type CompositeCommand = {
  commands: string[];
  parallel: boolean;
};

export type Container = {
  name: string;
  image: string;
  command: string[];
  args: string[];
};

export type Image = {
  name: string;
  imageName: string;
  args: string[];
  buildContext: string;
  rootRequired: boolean;
  uri: string;
};

export type ClusterResource = {
  name: string;
  inlined: string;
  uri: string;
};

export type DevEnv = {
  name: string;
  image: string;
  command: string[];
  args: string[];
  userCommands: UserCommand[];
}

export type Group = '' | 'build' | 'test'| 'run'  | 'debug' | 'deploy';

export type UserCommand = {
  name: string;
  group: Group;
  default: boolean;
  commandLine: string;
  hotReloadCapable: boolean;
  workInSourceDir: boolean;
  workingDir: string;
};

declare const addContainer: (name: string, image: string, command: string[], args: string[]) => Result;
declare const addImage: (name: string, imageName: string, args: string[], buildContext: string, rootRequired: boolean, uri: string) => Result;
declare const addResource: (name: string, inlined: string) => Result;
declare const addExecCommand: (name: string, component: string, commmandLine: string, workingDir: string, hotReloadCapable: boolean) => Result;
declare const addApplyCommand: (name: string, component: string) => Result;
declare const addCompositeCommand: (name: string, parallel: boolean, commands: string[]) => Result;
declare const addUserCommand: (component: string, name: string, commandLine: string) => Result;
declare const getFlowChart: () => ChartResult;
declare const setDevfileContent: (devfile: string) => Result;
declare const setMetadata: (metadata: Metadata) => Result;
declare const updateContainer: (name: string, image: string, command: string[], args: string[], userCommands: UserCommand[]) => Result;
declare const moveCommand: (previousKind: string, newKind: string, previousIndex: number, newIndex: number) => Result;
declare const setDefaultCommand: (command: string, group: string) => Result;
declare const unsetDefaultCommand: (command: string) => Result;
declare const deleteCommand: (command: string) => Result;
declare const deleteContainer: (container: string) => Result;
declare const deleteImage: (image: string) => Result;
declare const deleteResource: (resource: string) => Result;

@Injectable({
  providedIn: 'root'
})
// WasmGoService uses the wasm module. 
// The module manages a single instance of a Devfile
export class WasmGoService {

  addContainer(container: Container): ResultValue {
    const result = addContainer(
      container.name,
      container.image,
      container.command,
      container.args,
    );
    return result.value;
  }

  addImage(image: Image): ResultValue {
    const result = addImage(
      image.name,
      image.imageName,
      image.args,
      image.buildContext,
      image.rootRequired,
      image.uri,
    );
    return result.value;
  }

  addResource(resource: ClusterResource): ResultValue {
    const result = addResource(
      resource.name,
      resource.inlined,
    );
    return result.value;
  }

  addExecCommand(name: string, cmd: ExecCommand): ResultValue {
    const result = addExecCommand(
      name,
      cmd.component,
      cmd.commandLine,
      cmd.workingDir,
      cmd.hotReloadCapable,
    );
    return result.value;
  }

  addApplyCommand(name: string, cmd: ApplyCommand): ResultValue {
    const result = addApplyCommand(
      name,
      cmd.component,      
    );
    return result.value;
  }

  addCompositeCommand(name: string, cmd: CompositeCommand): ResultValue {
    const result = addCompositeCommand(
      name,
      cmd.parallel,
      cmd.commands,      
    );
    return result.value;
  }

  addUserCommand(component: string, name: string, commandLine: string): ResultValue {
    const result = addUserCommand(component, name, commandLine);
    return result.value;
  }

  updateContainer(devEnv: DevEnv): ResultValue {
    const result = updateContainer(
      devEnv.name,
      devEnv.image,
      devEnv.command,
      devEnv.args,
      devEnv.userCommands,
    );
    if (result.err != "") {
      console.log(result.err);
    }
    return result.value;  
  }

  // getFlowChart calls the wasm module to get the lifecycle of the Devfile in mermaid chart format
  getFlowChart(): string {
    const result = getFlowChart();
    return result.value;
  }

  // setDevfileContent calls the wasm module to reset the content of the Devfile
  setDevfileContent(devfile: string): Result {
    const result = setDevfileContent(devfile);
    return result;  
  }

  setMetadata(metadata: Metadata): ResultValue {
    const result = setMetadata(metadata);
    return result.value;
  }

  moveCommand(previousKind: string, newKind: string, previousIndex: number, newIndex: number): ResultValue {
    const result = moveCommand(previousKind, newKind, previousIndex, newIndex);
    return result.value;
  }

  setDefaultCommand(command: string, group: string): ResultValue {
    const result = setDefaultCommand(command, group);
    return result.value;
  }

  unsetDefaultCommand(command: string): ResultValue {
    const result = unsetDefaultCommand(command);
    return result.value;
  }

  deleteCommand(command: string): Result {
    const result = deleteCommand(command);
    return result;
  }

  deleteContainer(container: string): Result {
    const result = deleteContainer(container);
    return result;
  }

  deleteImage(image: string): Result {
    const result = deleteImage(image);
    return result;
  }

  deleteResource(resource: string): Result {
    const result = deleteResource(resource);
    return result;
  }
}
