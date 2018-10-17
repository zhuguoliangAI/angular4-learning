import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Product, ProductService, Comment } from "../shared/product.service";
import { WebSocketService } from "../shared/web-socket.service";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  isCommentHidden: boolean = true;
  product: Product;
  comments: Array<Comment>;
  newRating: number = 5;
  newComment: string = '';
  isWatched: boolean = false;
  currentPrice: number;
  subscription: Subscription;
  prodId: number;

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private wsService: WebSocketService) {
    this.prodId = this.route.snapshot.params.prodId;
    this.productService.getProduct(this.prodId)
      .subscribe( (resp: Product) => {
        this.product = resp;
        this.currentPrice = this.product.price;
      });
    this.productService.getCommentsForProductId(this.prodId)
      .subscribe( (resp: Array<Comment>) => {
        this.comments = resp;
      });
  }

  ngOnInit() {
  }

  addComment() {
    let comment = new Comment(1, this.product.id, new Date().toISOString(), 'someone', this.newRating, this.newComment);
    this.comments.unshift(comment);

    let sum = this.comments.reduce( (sum, comment) => sum + comment.rating, 0);
    this.product.rating = sum / this.comments.length;

    this.newRating = 5;
    this.newComment = null;
    this.isCommentHidden = true;
  }

  // 当子组件的输入和输出属性不符合双向绑定的命名规范时，需要单独处理
  getNewRating(rating: number) {
    this.newRating = rating;
  }

  watchProduct() {
    debugger;
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.isWatched = false;
      this.subscription = null;
    } else {
      this.isWatched = true;
      // 返回的数据是个数组 数组中每个元素包含productId和最新价格
      this.subscription = this.wsService.createObservableSocket("ws://localhost:8085", this.product.id)
        .subscribe( products => {
          let product = products.find( p => p.productId === this.product.id);
          this.currentPrice = product.newBid;
        });
    }
  }
}
