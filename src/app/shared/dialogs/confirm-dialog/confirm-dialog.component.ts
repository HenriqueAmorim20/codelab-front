import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

export interface DialogData {
  title?: string;
  contentText?: string;
  confirmText?: string;
  cancelText?: string;
}

@Component({
  selector: 'cl-confirm-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss',
})
export class ConfirmDialogComponent {
  title = 'Confirme sua ação';
  contentText = 'Deseja confirmar essa ação?';
  confirmText = 'Confirmar';
  cancelText = 'Cancelar';

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.title = this.data.title ?? this.title;
    this.contentText = this.data.contentText ?? this.contentText;
    this.confirmText = this.data.confirmText ?? this.confirmText;
    this.cancelText = this.data.cancelText ?? this.cancelText;
  }
}
