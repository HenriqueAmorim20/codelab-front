import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boolToText',
  standalone: true,
})
export class BoolToTextPipe implements PipeTransform {
  transform(value: boolean): string {
    if (value) return 'Sim';
    return 'Não';
  }
}
