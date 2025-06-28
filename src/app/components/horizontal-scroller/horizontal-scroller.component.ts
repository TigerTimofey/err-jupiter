import { Component, Input, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-horizontal-scroller',
  standalone: true,
  imports: [NgIf, NgFor, RouterModule],
  templateUrl: './horizontal-scroller.component.html',
  styleUrls: ['./horizontal-scroller.component.css']
})
export class HorizontalScrollerComponent {
  @Input() category: any;
  @ViewChild('scroller', { static: false }) scrollerRef!: ElementRef<HTMLDivElement>;
  cardWidth = 230; // fallback

  canScrollLeft = false;
  canScrollRight = false;

  constructor(private cdr: ChangeDetectorRef) {}

  private updateCardWidth() {
    if (this.scrollerRef?.nativeElement) {
      const card = this.scrollerRef.nativeElement.querySelector('.card');
      if (card) {
        this.cardWidth = (card as HTMLElement).offsetWidth;
      }
    }
  }

  private updateScrollArrows() {
    const scroller = this.scrollerRef?.nativeElement;
    if (!scroller) return;
    this.canScrollLeft = scroller.scrollLeft > 0;
    this.canScrollRight = scroller.scrollLeft + scroller.offsetWidth < scroller.scrollWidth - 1;
    this.cdr.markForCheck();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.updateCardWidth();
      this.updateScrollArrows();
      const scroller = this.scrollerRef?.nativeElement;
      if (scroller) {
        scroller.addEventListener('scroll', () => {
          this.updateScrollArrows();
        });
        window.addEventListener('resize', () => {
          this.updateScrollArrows();
        });
      }
    });
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
    setTimeout(() => this.updateScrollArrows(), 350);
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
    setTimeout(() => this.updateScrollArrows(), 350);
  }

  getBestPhotoUrl(item: any): string | null {
    type PhotoType = { url?: string; w?: number; h?: number };
    const photos: { [key: string]: PhotoType } | undefined = item.verticalPhotos?.[0]?.photoTypes;
    if (!photos) return null;
    if (photos[80]?.url) return photos[80].url;
    if (photos[60]?.url) return photos[60].url;
    const best = Object.values(photos)
      .filter((p: PhotoType) => p?.url)
      .sort((a: PhotoType, b: PhotoType) => ((b.w ?? 0) * (b.h ?? 0)) - ((a.w ?? 0) * (a.h ?? 0)))[0];
    return best?.url || null;
  }

  toggleFavourite(item: any) {
    item._favourite = !item._favourite;
  }
}
