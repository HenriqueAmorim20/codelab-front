import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'cl-progress-loading',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule],
  templateUrl: './progress-loading.component.html',
  styleUrl: './progress-loading.component.scss',
})
export class ProgressLoadingComponent {
  @Input() loading = false;
}
