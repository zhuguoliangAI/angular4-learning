import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class ProductService {

  searchEvent: EventEmitter<SearchParams> = new EventEmitter();


  constructor(public http: HttpClient) {}

  getProducts(): Observable<Array<Product>> {
    return this.http.get('/api/products');
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get('/api/products/' + id);
  }

  getCommentsForProductId(id: number): Observable<Array<Comment>> {
    return this.http.get('/api/comments/' + id);
  }

  getAllCategories(): Observable<Array<string>> {
    return this.http.get('/api/category');
  }

  search(param: SearchParams): Observable<Array<Product>> {
    debugger;
    let params = Object.keys(param)
      .filter( key => param[key])
      .reduce( (sum: HttpParams, key) => sum.append(key, param[key]), new HttpParams());
    return this.http.get('/api/search', {params});
  }
}

export class SearchParams {
  constructor(
    public title: string,
    public price: number,
    public category: string
  ) {}
}

export class Product {
  constructor(
    public id: any,
    public title: string,
    public price: number,
    public rating: number,
    public desc: string,
    public categories: Array<string>
  ) {}
}

export class Comment {
  constructor(public id: number,
              public productId: number,
              public timestamp: string,
              public user: string,
              public rating: number,
              public content: string) {}
}
