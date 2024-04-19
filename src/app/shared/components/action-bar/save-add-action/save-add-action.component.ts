import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'cl-save-add-action',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './save-add-action.component.html',
})
export class SaveAddActionComponent {
  @Output() saveAddEmitter = new EventEmitter<void>();

  saveAdd(): void {
    this.saveAddEmitter.emit();
  }
}
