import { Component, OnInit } from '@angular/core';
//  导入接口类型来重新渲染英雄数据
import { Hero } from '../hero';
//  导入模拟数据
// import { HEROES } from '../mock-heroes';
//  使用服务来获取数据
import { HeroService } from '../hero.service';
//  使用服务来获取消息
// import { MessageService } from '../message.service';

@Component({
  //  组件选择器，css选择器，也是使用使用时候的标签内容,<app-heroes>使用该组件
  selector: 'app-heroes',
  //  组件模板文件
  templateUrl: './heroes.component.html',
  //  私有css样式文件
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  //  英雄
  // hero: String = '陈·风暴烈酒';
  // hero: Hero = {
  //   id: 1,
  //   name: 'WindStorm'
  // }

  //  直接导入模拟数据
  // heroes = HEROES;

  //  导入服务，更改声明结构
  heroes: Hero[];

  // selectedHero: Hero;

  //  构造器,用来注入各种服务
  //  注意是服务是放到参数中的
  //  将导入的服务定义为私有服务进行使用
  constructor(
    private heroService: HeroService,
    // private messageService: MessageService
  ) {}

  //  组件渲染
  ngOnInit() {
    // console
    console.log('组件初始化了')
    //  调用服务方法，获取数据
    this.getHeroes();
  }

  // 从服务中直接获取数据
  // getHeroes(): void {
  //   this.heroes = this.heroService.getHeroes();
  // }

  //  订阅获取返回值
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe({
        next: heroes => {this.heroes = heroes; },
        error: err => {console.log(err); },
        complete: () => console.log('done')
      });
  }

  //  选择英雄
  // onSelect(hero: Hero): void {
  //   this.selectedHero = hero;
  //   this.messageService.add(`HeroService: Selected hero id=${hero.id}`);
  // }

  // 上传英雄
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero( { name } as Hero )
      .subscribe( hero => {
        this.heroes.push(hero);
      });
  }

  //  删除英雄
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }
}
