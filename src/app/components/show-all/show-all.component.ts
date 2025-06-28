import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { getFavourites, saveFavourites } from '../../utils/favourites.util';

@Component({
  selector: 'app-show-all',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './show-all.component.html',
  styleUrls: ['./show-all.component.css']
})
export class ShowAllComponent {
  category: any;

  constructor(private router: Router, private route: ActivatedRoute) {
    const nav = this.router.getCurrentNavigation();
    this.category = nav?.extras?.state?.['category'];
    if (!this.category) {
      const categoryName = this.route.snapshot.paramMap.get('categoryName');
      const header = (categoryName || '')
        .replace(/-/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase());
    }
    window.scrollTo({ top: 0, behavior: 'auto' });

    const favs = getFavourites();
    if (this.category?.data) {
      for (const item of this.category.data) {
        item._favourite = favs.has(item.canonicalUrl);
      }
    }
  }

  goBack() {
    this.router.navigateByUrl('/');
  }

  getBestPhotoUrl(item: any): string | null {
    const photos = item.verticalPhotos?.[0]?.photoTypes;
    if (!photos) return null;
    if (photos[80]?.url) return photos[80].url;
    if (photos[60]?.url) return photos[60].url;
    const best = Object.values(photos as { [key: string]: { url?: string; w?: number; h?: number } })
      .filter((p: { url?: string }) => p?.url)
      .sort((a: { w?: number; h?: number }, b: { w?: number; h?: number }) => ((b.w ?? 0) * (b.h ?? 0)) - ((a.w ?? 0) * (a.h ?? 0)))[0];
    return best?.url || null;
  }

  toggleFavourite(item: any) {
    item._favourite = !item._favourite;
    const favs = getFavourites();
    if (item._favourite) {
      favs.add(item.canonicalUrl);
    } else {
      favs.delete(item.canonicalUrl);
    }
    saveFavourites(favs);

    if (window.innerWidth <= 960) {
      item._showBadge = true;
      setTimeout(() => {
        item._showBadge = false;
      }, 1000);
    }
  }
}
