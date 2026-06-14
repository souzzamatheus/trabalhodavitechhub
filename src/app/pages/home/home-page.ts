import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductCard } from '../../components/product-card/product-card';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-home-page',
  imports: [CommonModule, FormsModule, ProductCard],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})
export class HomePage implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];
  isLoading = true;
  errorMessage = '';
  
  // Filters
  searchQuery = '';
  selectedCategory = '';
  sortBy: 'relevance' | 'price-asc' | 'price-desc' | 'rating' = 'relevance';
  sidebarOpen = false;
  cartCount = 0;

  constructor(
    private readonly productService: ProductService,
    private readonly cartService: CartService,
    private readonly favoritesService: FavoritesService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.cartService.getCart().subscribe(() => {
      this.cartCount = this.cartService.getItemsCount();
      this.changeDetectorRef.detectChanges();
    });
  }

  loadProducts(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.extractCategories();
        this.applyFilters();
        this.isLoading = false;
        this.changeDetectorRef.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Não foi possível carregar os produtos. Verifique sua internet ou tente novamente.';
        this.isLoading = false;
        this.changeDetectorRef.detectChanges();
      }
    });
  }

  extractCategories(): void {
    const unique = [...new Set(this.products.map(p => p.category))];
    this.categories = unique.sort();
  }

  applyFilters(): void {
    let filtered = this.products;

    // Filter by search
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (this.selectedCategory) {
      filtered = filtered.filter(p => p.category === this.selectedCategory);
    }

    // Sort
    filtered = this.sortProducts(filtered);

    this.filteredProducts = filtered;
    this.changeDetectorRef.detectChanges();
  }

  sortProducts(products: Product[]): Product[] {
    const sorted = [...products];
    
    switch (this.sortBy) {
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'rating':
        return sorted.sort((a, b) => b.rating.rate - a.rating.rate);
      default:
        return sorted;
    }
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  onCategoryChange(): void {
    this.applyFilters();
  }

  onSortChange(): void {
    this.applyFilters();
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  clearFilters(): void {
    this.searchQuery = '';
    this.selectedCategory = '';
    this.sortBy = 'relevance';
    this.applyFilters();
  }
}

