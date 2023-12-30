import { Directive, HostListener } from '@angular/core';
import { ModalService } from './modal.sercive';

@Directive({
  selector: '[appOpenModal]',
})
export class OpenModalDirective {
  constructor(private modalService: ModalService) {}

  @HostListener('click')
  onClick() {
    this.modalService.openModal();
  }
}
