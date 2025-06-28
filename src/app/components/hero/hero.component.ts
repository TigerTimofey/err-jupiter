import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

interface PhotoType {
  url?: string;
  w?: number;
  h?: number;
  [key: string]: any;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [NgIf],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})

export class HeroComponent {
  @Input() item: any;

  getBestPhotoUrl(): string | null {
    // Try to get a large photo from verticalPhotos or fallback to photos
    const photos: { [key: string]: PhotoType } | undefined = this.item?.verticalPhotos?.[0]?.photoTypes || this.item?.photos?.[0]?.photoTypes;
    if (!photos) return null;
    // Try to get the largest available
    const preferred = [1920, 1440, 1280, 1024, 768, 480, 320];
    for (const w of preferred) {
      if (photos[w]?.url) return photos[w].url;
    }
    // fallback to any available
    const best = Object.values(photos)
      .filter((p: PhotoType) => p?.url)
      .sort((a: PhotoType, b: PhotoType) => ((b.w ?? 0) * (b.h ?? 0)) - ((a.w ?? 0) * (a.h ?? 0)))[0];
    return best?.url || null;
  }
}
