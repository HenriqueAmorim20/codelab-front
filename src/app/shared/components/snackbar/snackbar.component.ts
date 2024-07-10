import { Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { ISnackbarData } from '../../interfaces/snackbar-data.interface';

@Component({
  selector: 'cl-snackbar',
  standalone: true,
  imports: [
    MatSnackBarLabel,
    MatSnackBarActions,
    MatSnackBarAction,
    MatButtonModule,
  ],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.scss',
})
export class SnackbarComponent {
  message = '';
  snackBarRef = inject(MatSnackBarRef);

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: ISnackbarData) {
    this.message = data.message;
  }
}
