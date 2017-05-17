import { Component, OnInit, Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from "rxjs/Observable";
import { ChatService } from "./events.service";
@Injectable()
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  providers: [ChatService]
})
export class EventsComponent implements OnInit {
  // socket = null;
  // socket = io('http://localhost:4444');
  test : any = '';

  infoMessage = {
    username : '',
    message : '',
  };

  constructor(private chatService : ChatService) {
  }

  ngOnInit() {
    // this.socket = io('http://localhost:4444');
    // this.socket.on('connect',() => {
    //   this.socket.on('postMessage', function(data){
    //        console.log(data);
    //    }.bind(this));
    //   Observable.fromEvent(this.socket,'postMessage')
    //             .subscribe((payload) => {
    //                 console.log(payload);
    //             });
    // });
  }

  sendMessage(){
    let data = {
      username: this.infoMessage.username,
      message: this.infoMessage.message,
    };
    // this.socket.emit('postMessage',data);
    this.infoMessage = {
      username : '',
      message : '',
    };
  }

}
