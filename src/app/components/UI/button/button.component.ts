import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() variant: 'default' | 'secondary' | 'danger' | 'disabled' = 'default';
  @Input() label: string = '';
  @Input() disabled: boolean = false;
}
