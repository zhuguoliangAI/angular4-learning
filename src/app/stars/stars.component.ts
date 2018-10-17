import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit, OnChanges {
  @Input()
  private rating = 0;
  // 只有当输出属性是输入属性加Change的时候才可直接使用双向绑定，否则需要在父组件中用事件去接受处理子组件发射的事件
  @Output()
  private ratingChange: EventEmitter<number> = new EventEmitter<number>();
  // @Output()
  // private ratingOutput: EventEmitter<number> = new EventEmitter<number>();
  @Input()
  private readonly: boolean = true;
  private stars: Array<boolean>; // boolean[]

  constructor() { }

  ngOnInit() {
    /*this.stars = [];
    for (let i = 1; i <= 5; i++) {
      this.stars.push(i > this.rating);
    }*/
  }

  // 当子组件的输入属性发生变化时,会触发这个钩子，重新对星级进行计算
  ngOnChanges() {
    this.stars = [];
    for (let i = 1; i <= 5; i++) {
      this.stars.push(i > this.rating);
    }
  }

  clickStar(i: number) {
    if (!this.readonly) {
      this.rating = i + 1;
      // this.ngOnChanges();  // 不需要手动调用了，当rating变化的时候，angular会检测到，并自动调用ngOnChanges
      this.ratingChange.emit(this.rating);
      // this.ratingOutput.emit(this.rating);
    }
  }
}
