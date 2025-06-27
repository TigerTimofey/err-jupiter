import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-horizontal-scroller',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './horizontal-scroller.component.html',
  styleUrls: ['./horizontal-scroller.component.css']
})
export class HorizontalScrollerComponent {
  @Input() category: any;
  @ViewChild('scroller', { static: false }) scrollerRef!: ElementRef<HTMLDivElement>;
  cardWidth = 230; // fallback

  private updateCardWidth() {
    if (this.scrollerRef?.nativeElement) {
      const card = this.scrollerRef.nativeElement.querySelector('.card');
      if (card) {
        this.cardWidth = (card as HTMLElement).offsetWidth;
      }
    }
  }

  scrollLeft(event: Event) {
    event.preventDefault();
    this.updateCardWidth();
    const scroller = this.scrollerRef.nativeElement;
    const cards = Array.from(scroller.querySelectorAll('.card')) as HTMLElement[];
    const scrollLeft = scroller.scrollLeft;
    let target = 0;
    for (let i = cards.length - 1; i >= 0; i--) {
      if (cards[i].offsetLeft < scrollLeft - 1) {
        target = cards[i].offsetLeft;
        break;
      }
    }
    scroller.scrollTo({ left: target, behavior: 'smooth' });
  }

  scrollRight(event: Event) {
    event.preventDefault();
    this.updateCardWidth();
    const scroller = this.scrollerRef.nativeElement;
    const cards = Array.from(scroller.querySelectorAll('.card')) as HTMLElement[];
    const scrollLeft = scroller.scrollLeft;
    let target = scroller.scrollWidth;
    for (let i = 0; i < cards.length; i++) {
      if (cards[i].offsetLeft > scrollLeft + 1) {
        target = cards[i].offsetLeft;
        break;
      }
    }
    scroller.scrollTo({ left: target, behavior: 'smooth' });
  }
}
