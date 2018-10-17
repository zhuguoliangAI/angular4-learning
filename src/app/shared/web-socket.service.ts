import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';

@Injectable()
export class WebSocketService {

  ws: WebSocket;

  constructor() { }

  createObservableSocket(url: string, id: string): Observable<any> {
    this.ws = new WebSocket(url);
    return new Observable<string>(
      observer => {
        this.ws.onmessage = (event) => observer.next(event.data);
        this.ws.onerror = (event) => observer.error(event);
        this.ws.onclose = (event) => observer.complete();
        this.ws.onopen = (event) => this.sendMeaage({productId: id});
        return () => this.ws.close();
      }
    ).map((message: string) => JSON.parse(message));
  }

  sendMeaage(message: any) {
    this.ws.send(JSON.stringify(message));
  }

}
