import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
// 响应式编程
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './search/search.component';
import { CarouselComponent } from './carousel/carousel.component';
import { ProductComponent } from './product/product.component';
import { StarsComponent } from './stars/stars.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductService } from './shared/product.service';
import { WebSocketService } from "./shared/web-socket.service";
import { FilterPipe } from './pipe/filter.pipe';
import { AboutUsComponent } from './about-us/about-us.component';
import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { HighlightDirective } from './directive/highlight.directive';

const routeConfig: Routes = [
  {path: '', component: HomeComponent},
  {path: 'product/:prodId', component: ProductDetailComponent},
  {path: 'aboutUs', component: AboutUsComponent}
];

@NgModule({
  // 组件、指令、管道
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SearchComponent,
    CarouselComponent,
    ProductComponent,
    StarsComponent,
    ProductDetailComponent,
    HomeComponent,
    FilterPipe,
    AboutUsComponent,
    HighlightDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routeConfig),
    ReactiveFormsModule
  ],
  // 服务
  providers: [ProductService, HttpClient, WebSocketService, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
