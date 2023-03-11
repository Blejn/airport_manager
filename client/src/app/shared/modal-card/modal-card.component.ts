import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-modal-card',
  templateUrl: './modal-card.component.html',
  styleUrls: ['./modal-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalCardComponent implements OnInit {
  cardNumbers!: string;
  finalDateMM!: string;
  finalDateYY!: string;
  fullName!: string;
  formCard!: FormGroup;
  @HostListener('class') inputCardNumbers = 'input-card-numbers';
  // @ViewChild('background') background!: ElementRef;
  event!: any;
  @Output() closeEvent = new EventEmitter<boolean>();
  @Output() payEvent = new EventEmitter<boolean>();
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.addPaymentForm();
  }

  closeModal() {
    this.closeEvent.emit(false);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
  addPaymentForm() {
    this.formCard = this.fb.group({
      cardNumbers: [
        this.cardNumbers,
        [Validators.maxLength(16), , Validators.required],
      ],
      finalDateMM: [
        this.finalDateMM,
        [Validators.maxLength(3), , Validators.required],
      ],
      finalDateYY: [
        this.finalDateYY,
        [Validators.maxLength(3), , Validators.required],
      ],
      fullName: [
        this.fullName,
        [Validators.maxLength(30), Validators.required],
      ],
    });
  }
  addPayment() {
    if (this.formCard.invalid) {
      this.payEvent.emit(true);
      this.closeEvent.emit(false);
    } else {
      alert('Fill out form!');
    }
  }
  reset() {
    this.formCard.reset();
  }
  extraChange(cardNumbers: Event) {
    console.log(cardNumbers);
  }
}
