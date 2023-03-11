import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit, AfterViewInit {
  // @ViewChild('background') background!: ElementRef;
  event!: any;
  @Output() closeEvent = new EventEmitter<boolean>();
  constructor(private router: Router) {}

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    // this.background.nativeElement.addEventListener('click', (e: Event) => {
    //   this.closeModal();
    // });
  }
  closeModal() {
    this.closeEvent.emit(false);
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }
}
