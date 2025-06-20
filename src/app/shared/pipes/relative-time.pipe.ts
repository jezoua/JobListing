import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'relativeTime',
  standalone: true,
})
export class RelativeTimePipe implements PipeTransform {
  transform(value: Date | string): string {
    const now = new Date();
    const date = new Date(value);
    const diffMs = now.getTime() - date.getTime();

    if (isNaN(date.getTime())) return 'Invalid date';

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);

    const parts: string[] = [];

    if (months > 0) parts.push(`${months} month${months > 1 ? 's' : ''}`);
    if (days % 30 > 0)
      parts.push(`${days % 30} day${days % 30 > 1 ? 's' : ''}`);
    if (hours % 24 > 0)
      parts.push(`${hours % 24} hour${hours % 24 > 1 ? 's' : ''}`);

    return parts.length > 0 ? parts.join(', ') + ' ago' : 'Just now';
  }
}
