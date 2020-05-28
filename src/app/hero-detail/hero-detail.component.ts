import { Component, OnInit, Input } from '@angular/core';
//  用来处理跳转，获取路径的值
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

//  导入数据结构
import { Hero } from '../hero';
//  获取服务
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  //  获取外部传入的值
  @Input() hero: Hero;

  //  指定hero
  // hero: Hero;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getHero();
  }

  getHero(): void {
    //  从地址栏获取参数
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  // 保存上传
  save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }
}
