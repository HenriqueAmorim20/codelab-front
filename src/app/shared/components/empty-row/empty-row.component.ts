import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'cl-empty-row',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './empty-row.component.html',
  styleUrl: './empty-row.component.scss',
})
export class EmptyRowComponent {}
