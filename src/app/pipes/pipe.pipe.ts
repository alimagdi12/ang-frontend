import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten',
  pure: true,
})
export class ShortenPipePipe implements PipeTransform {
  transform(value: string, ...args: number[]): unknown {
    if (value.length <= 10) return value;

    const length = args[0];
    const newValue = value.slice(0, length) + '...';

    return newValue;
  }
}
