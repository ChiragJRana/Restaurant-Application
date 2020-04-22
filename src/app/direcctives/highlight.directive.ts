import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private elemRef: ElementRef,
              private renderer:  Renderer2) { }

  @HostListener('mouseenter') onMouseEnter(){
    this.renderer.addClass(this.elemRef.nativeElement, 'highlight');
  }
  
  @HostListener('mouseleave') onMouseLeave(){
    this.renderer.removeClass(this.elemRef.nativeElement, 'highlight');
  }
  
}
