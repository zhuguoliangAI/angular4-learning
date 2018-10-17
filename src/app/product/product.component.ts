import { Component, OnInit } from '@angular/core';
import {Product, ProductService, SearchParams} from '../shared/product.service';
import { FormControl } from '@angular/forms';
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  private products: Observable<Array<Product>>;
  private keyword: string;
  private titleFilter: FormControl = new FormControl();

  constructor(private productService: ProductService) {
    this.titleFilter.valueChanges
      .debounceTime(500)
      .subscribe(
        value => this.keyword = value
      );
  }

  ngOnInit() {
    this.products = this.productService.getProducts();

    this.productService.searchEvent
      .subscribe( (params: SearchParams) => {
        debugger;
        this.products = this.productService.search(params);
      });
  }
}

