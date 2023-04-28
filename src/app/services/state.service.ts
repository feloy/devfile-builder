import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { ResultValue } from './wasm-go.service';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private _state = new BehaviorSubject<ResultValue | null>(null);
  public state = this._state.asObservable(); 

  changeDevfileYaml(newValue: ResultValue) {
    localStorage.setItem("devfile", newValue.content);
    this._state.next(newValue);
  }
}
