import { Component, OnInit } from '@angular/core';
import { Title, Meta } from "@angular/platform-browser";
import { trigger, state, style, animate, transition, keyframes, AnimationEvent } from '@angular/animations';
// import { routerTransition } from "../global-shared/global.animation";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // animations: [routerTransition()],
})
export class AppComponent implements OnInit {

  constructor(
    private titleService : Title,
    private metaService : Meta,
  ){
    titleService.setTitle('Demo Blog By Angular 4');
    metaService.addTags([
      {name: 'author', content: 'Remy Nguyen'},
      {name: 'keywords', content: 'App blogs'},
      {name: 'description', content: 'This is app blogs !'},
    ]);
  }

  ngOnInit(){
  }
}
