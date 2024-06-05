import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IFilterField } from '../../interfaces/filter-field.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { IMaskModule } from 'angular-imask';

const form = [ReactiveFormsModule, FormsModule];
const components = [
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatIconModule,
];

@Component({
  selector: 'cl-table-filters',
  standalone: true,
  imports: [...form, ...components, CommonModule, IMaskModule],
  templateUrl: './table-filters.component.html',
  styleUrl: './table-filters.component.scss',
})
export class TableFiltersComponent {
  @Input({ required: true }) formGroup!: FormGroup;
  @Input({ required: true }) fields!: IFilterField[];
  @Output() searchEmitter = new EventEmitter<void>();

  search() {
    this.searchEmitter.emit();
  }
}
