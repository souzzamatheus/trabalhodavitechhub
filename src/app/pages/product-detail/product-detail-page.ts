import { DecimalPipe, TitleCasePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-detail-page',
  imports: [DecimalPipe, RouterLink, TitleCasePipe],
  templateUrl: './product-detail-page.html',
  styleUrl: './product-detail-page.css'
})
export class ProductDetailPage implements OnInit {
  product: Product | null = null;
  isLoading = true;
  errorMessage = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly productService: ProductService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');

    if (!productId) {
      this.errorMessage = 'Produto nao encontrado.';
      this.isLoading = false;
      return;
    }

    this.productService.getProductById(productId).subscribe({
      next: (product) => {
        this.product = product;
        this.isLoading = false;
        this.changeDetectorRef.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Nao foi possivel carregar os detalhes do produto. Verifique sua internet ou tente novamente.';
        this.isLoading = false;
        this.changeDetectorRef.detectChanges();
      }
    });
  }
}
