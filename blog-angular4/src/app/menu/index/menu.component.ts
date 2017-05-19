import { Component, OnInit, NgZone } from '@angular/core';
import { Title, Meta } from "@angular/platform-browser";
import { routerTransition } from "../../global-shared/global.animation";
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [routerTransition()],
  host:{ '[@routerTransition]' : ''},
})
export class MenuComponent implements OnInit {
  progress: number = 0;

  label: string;

  constructor(
    private titleService : Title,
    private metaService : Meta,
    private _ngZone: NgZone
  ) {
      titleService.setTitle('Menu Infomation');
      metaService.addTags([
        {name: 'author', content: 'Remy Nguyen'},
        {name: 'keywords', content: 'Menu for blogs'},
        {name: 'description', content: 'This is menu page !'},
      ]);
   }

  ngOnInit() {
  }

  // Loop inside the Angular zone
  // so the UI DOES refresh after each setTimeout cycle
  processWithinAngularZone() {
    this.label = 'inside';
    this.progress = 0;
    this._increaseProgress(() => console.log('Inside Done!'));
  }


  // Loop outside of the Angular zone
  // so the UI DOES NOT refresh after each setTimeout cycle
  processOutsideOfAngularZone() {
    this.label = 'outside';
    this.progress = 0;
    this._ngZone.runOutsideAngular(() => {
      this._increaseProgress(() => {
      // reenter the Angular zone and display done
        this._ngZone.run(() => {
          console.log('Outside Done!')
        });
      })
    });
  }


  _increaseProgress(doneCallback: () => void) {
    this.progress += 1;
    console.log(`Current progress: ${this.progress}%`);
    if (this.progress < 100) {
      window.setTimeout(() => {
         this._increaseProgress(doneCallback)
      },10);
    } else {
      doneCallback();
    }
  }


}
