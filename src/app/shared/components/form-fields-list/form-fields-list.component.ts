import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IFormField } from '../../interfaces/form-field.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { IMaskModule } from 'angular-imask';
import { Subject, debounceTime, takeUntil, tap } from 'rxjs';
import { FormFieldComponent } from '../form-field/form-field.component';

const form = [ReactiveFormsModule, FormsModule, FormFieldComponent];
const components = [
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatIconModule,
];

@Component({
  selector: 'cl-form-fields-list',
  standalone: true,
  imports: [...form, ...components, CommonModule, IMaskModule],
  templateUrl: './form-fields-list.component.html',
  styleUrl: './form-fields-list.component.scss',
})
export class FormFieldsListComponent implements OnInit, OnDestroy {
  @Input({ required: true }) form!: FormGroup;
  @Input({ required: true }) fields!: IFormField[];
  @Input() disableWatch = false;
  @Output() searchEmitter = new EventEmitter<void>();

  private readonly unsubscribe$ = new Subject<void>();

  ngOnInit(): void {
    this.watchChanges();
  }

  private watchChanges() {
    if (this.disableWatch) return;

    this.form.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        debounceTime(1000),
        tap(() => this.searchEmitter.emit()),
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
