import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favorites: number[] = [];
  private favoritesSubject = new BehaviorSubject<number[]>([]);
  
  constructor() {
    this.loadFavorites();
  }

  private loadFavorites(): void {
    const saved = localStorage.getItem('techhub-favorites');
    if (saved) {
      try {
        this.favorites = JSON.parse(saved);
        this.favoritesSubject.next(this.favorites);
      } catch {
        this.favorites = [];
      }
    }
  }

  private saveFavorites(): void {
    localStorage.setItem('techhub-favorites', JSON.stringify(this.favorites));
    this.favoritesSubject.next(this.favorites);
  }

  getFavorites(): Observable<number[]> {
    return this.favoritesSubject.asObservable();
  }

  getFavoriteIds(): number[] {
    return this.favorites;
  }

  isFavorite(productId: number): boolean {
    return this.favorites.includes(productId);
  }

  toggleFavorite(productId: number): void {
    if (this.isFavorite(productId)) {
      this.removeFavorite(productId);
    } else {
      this.addFavorite(productId);
    }
  }

  addFavorite(productId: number): void {
    if (!this.isFavorite(productId)) {
      this.favorites.push(productId);
      this.saveFavorites();
    }
  }

  removeFavorite(productId: number): void {
    this.favorites = this.favorites.filter(id => id !== productId);
    this.saveFavorites();
  }

  clearFavorites(): void {
    this.favorites = [];
    this.saveFavorites();
  }
}
