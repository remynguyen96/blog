import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ad-host]',
})
export class BlogDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
