import {
  Directive,
  ElementRef,
  HostListener,
  Renderer2,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[highlight]',
})
export class FillOut {
  onChange!: (value: string) => void;

  colors = ['red', 'blue', 'green', 'yellow'];

  constructor(el: ElementRef) {
    this.changeColor(el);
  }

  changeColor(el: ElementRef) {
    setInterval(() => {
      el.nativeElement.style.color =
        this.colors[Math.floor(Math.random() * this.colors.length)];
    }, 1000);
  }

  // @HostListener('input') valueChange() {
  //   this.onChange(this.element.nativeElement.value);
  // }
}
