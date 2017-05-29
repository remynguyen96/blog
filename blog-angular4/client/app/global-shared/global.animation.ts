import {trigger, animate, style, transition, animateChild, group, query, stagger, state} from '@angular/animations';

export const routerAnimation =

  trigger('routerTransition', [
      transition(':enter', [
        style({transform: 'translateX(-300px)', opacity: 0}),
        group([
          animate('.8s cubic-bezier(.35,0,.25,1)'),
          animate('.8s .2s ease-in', style({opacity: 1})),
          animateChild(),
        ]),
      ]),
      transition(':leave',[
          group([
            animateChild(),
            animate('.5s .3s ease-out', style({opacity: 0})),
            animate('.5s cubic-bezier(.35,0,.25,1)',style({ transform: 'translateX(200px)' })),
          ]),
      ]),
  ])
