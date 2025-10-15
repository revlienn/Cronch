import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BusyService {

  requestCount=signal(0);

  busy(){
    this.requestCount.update(currentCount=>currentCount+1);
    console.log(`💫 {{requestCount()}} BUSY 🔴`);
  }

  idle(){
    this.requestCount.update(currentCount=>currentCount-1);
    console.log(`💫 {{requestCount()}} IDLE 🟢`);
  }
  
}
