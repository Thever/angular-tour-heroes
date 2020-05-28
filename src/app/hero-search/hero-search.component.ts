import { Component, OnInit } from '@angular/core';
//  rx相关
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
//  数据结构
import { Hero } from '../hero';
//  数据来源
import { HeroService } from '../hero.service';


@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {

  //  定义Observable
  heroes$: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private heroService: HeroService
  ) { }

  ngOnInit() {
    this.heroes$ = this.searchTerms.pipe(
      //  延迟300ms
      debounceTime(300),
      //  产品了变化才改变
      distinctUntilChanged(),
      //  变化后观察新数据
      switchMap((term: string) => this.heroService.searchHeroes(term))
    )
  }

  //  搜索添加新数据
  search(term: string): void {
    this.searchTerms.next(term);
  }
}
