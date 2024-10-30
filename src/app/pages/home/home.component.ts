import { Component } from '@angular/core';
import { BarComponent } from '../../components/bar/bar.component';
import { ApiService } from '../../service/api-service.service';
import { provideHttpClient } from '@angular/common/http';
import { ICategory } from '../../common/interfaces/ICategory';
import { CommonModule } from '@angular/common';
import { IProduct } from '../../common/interfaces/IProduct';
import { IBrand } from '../../common/interfaces/IBrand';
import { ISale } from '../../common/interfaces/ISale';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BarComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  categories: ICategory[] = []
  products: IProduct[] = []
  brands: IBrand[] = []
  sales: ISale[] = []
  pageLoaded: boolean = false

  constructor(private apiService: ApiService) {}

  async ngOnInit() {
    this.updateCategories()

    this.pageLoaded = true
  }

  async onCategoriaChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;

    this.updateProducts(+selectedValue)
  }

  async onProductChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;

    this.updateBrands(+selectedValue)
  }

  async onBrandChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;

    this.updateSales(+selectedValue)
  }

  async updateCategories() {
    this.categories = await this.apiService.getCategories()
    this.updateProducts(this.categories[0].id)
  }

  async updateProducts(category_id: number) {
    this.products = await this.apiService.getProductsByCategoryId(category_id)
    this.updateBrands(this.products[0].id)
    
  }

  async updateBrands(product_id: number) {
    this.brands = await this.apiService.getBrandsByProductId(product_id)
    
    this.updateSales(this.brands[0].id)
  }

  async updateSales(brand_id: number) {
    this.sales = await this.apiService.getSalesByBrandId(brand_id)
  }
}
