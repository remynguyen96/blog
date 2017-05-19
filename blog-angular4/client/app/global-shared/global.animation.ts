import { trigger, state, style, animate, transition } from '@angular/animations';
export function routerTransition(){
  return slideToRight();
}

function slideToRight(){
  return trigger('routerTransition', [
      // state('void', style({ position:'fixed', width:'100%' })),
      // state('*', style({ position:'fixed', width:'100%' })),
      transition(':enter', [
        style({ opacity : 0, transform: 'translate3d(-100%, 0, 0)' }),
        animate('400ms ease-in', style({ opacity : 1, transform: 'none' }))
      ]),
      transition(':leave', [
        style({ opacity : 1, transform: 'none' }),
        animate('400ms ease-out', style({ opacity : 0, transform: 'translate3d(100%, 0, 0)' }))
      ])
  ]);
}

function slideToLeft(){
  return trigger('routerTransition', [
    state('void', style({position:'fixed', width:'100%'}) ),
    state('*', style({position:'fixed', width:'100%'}) ),
    transition(':enter', [  // before 2.1: transition('void => *', [
      style({transform: 'translateX(100%)'}),
      animate('0.5s ease-in-out', style({transform: 'translateX(0%)'}))
    ]),
    transition(':leave', [  // before 2.1: transition('* => void', [
      style({transform: 'translateX(0%)'}),
      animate('0.5s ease-in-out', style({transform: 'translateX(-100%)'}))
    ])
  ]);
}
