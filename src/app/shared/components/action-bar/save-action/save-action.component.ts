import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'cl-save-action',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './save-action.component.html',
})
export class SaveActionComponent {
  @Output() saveEmitter = new EventEmitter<void>();

  save(): void {
    this.saveEmitter.emit();
  }
}
