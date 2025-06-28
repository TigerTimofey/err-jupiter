export function getFavourites(): Set<string> {
  try {
    const favs = localStorage.getItem('favourites');
    return new Set(favs ? JSON.parse(favs) : []);
  } catch {
    return new Set();
  }
}

export function saveFavourites(favs: Set<string>) {
  localStorage.setItem('favourites', JSON.stringify(Array.from(favs)));
}
