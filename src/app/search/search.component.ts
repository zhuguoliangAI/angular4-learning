import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductService, SearchParams} from "../shared/product.service";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  formModel: FormGroup;
  categories: string[];

  constructor(public productService: ProductService) {
    let fb = new FormBuilder();
    this.formModel = fb.group({
      title: ['', Validators.required],
      price: [null, this.positivePriceValidator],
      category: ['-1']
    });
  }

  ngOnInit() {
    this.productService.getAllCategories()
      .subscribe( (resp: Array<string>) => {
        this.categories = resp;
      });
  }

  positivePriceValidator(control: FormControl): {[key: string]: any} {
    if (!control.value) {
      return ;
    }
    let price = parseInt(control.value);
    if (price >= 0) {
      return ;
    } else {
      return {positivePriceValidator: '价格不能小于0'};
    }
  }

  onSearch() {
    debugger;
    if (this.formModel.valid) {
      console.log(this.formModel.value);
      this.productService.searchEvent.emit(this.formModel.value);
    }
  }

}
