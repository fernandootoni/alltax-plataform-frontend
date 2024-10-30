import { Injectable } from '@angular/core';
import { environment } from '../environment/enviroment';
import { HttpClient } from '@angular/common/http';
import { ICategory } from '../common/interfaces/ICategory';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseApiURL: string = environment.baseApiUrl

  constructor(private http: HttpClient) { }

  async getCategories(): Promise<any> {
    return await this.http.get<ICategory[]>(`${this.baseApiURL}/categories`).toPromise()
  }

  async getProductsByCategoryId(id: number): Promise<any> {
    return await this.http.get<ICategory[]>(`${this.baseApiURL}/products?category_id=${id}`).toPromise()
  }

  async getBrandsByProductId(id: number): Promise<any> {
    return await this.http.get<ICategory[]>(`${this.baseApiURL}/brands?product_id=${id}`).toPromise()
  }

  async getSalesByBrandId(id: number): Promise<any> {
    return await this.http.get<ICategory[]>(`${this.baseApiURL}/sales?brand_id=${id}`).toPromise()
  }
}
