import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BusyService {

  requestCount=signal(0);
  madeReq=signal(false);

  constructor(){
    this.madeReq.set(false);
  }

  busy(){
    this.requestCount.update(currentCount=>currentCount+1);
    this.madeReq.set(true);
  }

  idle(){
    this.requestCount.update(currentCount=>currentCount-1);
  }
  
}
