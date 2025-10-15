import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BusyService {

  requestCount=signal(0);

  busy(){
    this.requestCount.update(currentCount=>currentCount+1);
  }

  idle(){
    this.requestCount.update(currentCount=>currentCount-1);
  }
  
}
