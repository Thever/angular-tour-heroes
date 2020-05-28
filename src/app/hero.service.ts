//  来来来，自己搞服务了
//  引用可注入标识
import { Injectable } from '@angular/core';
//  导入数据结构
import { Hero } from './hero';
//  导入模拟数据
// import { HEROES } from './mock-heroes';
//  使用rx库返回Observable
import { Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
//  获取message服务
import { MessageService } from './message.service';
//  导入http请求组件
import { HttpClient, HttpHeaders } from '@angular/common/http';

//  注入到根容器
@Injectable({
  providedIn: 'root'
})
export class HeroService {

  //  私有地址
  private heroesUrl = 'api/heroes';

  //  自定义请求头
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) { }

  //  提供直接返回英雄数据的方法
  // getHeroes(): Hero[] {
  //   return HEROES;
  // }

  //  因为频繁调用保过到方法中
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  //  返回observable观察对象,返回英雄数据
  // getHeroes(): Observable<Hero[]> {
  //   //  给服务发送消息
  //   this.messageService.add('HeroService: fetched heroes');
  //   //  这里用of来生成了一个Observable
  //   return of(HEROES);
  // }

  //  通过HttpClient获取数据
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    )
  }

  //  传入参数id请求数据
  // getHero(id: number): Observable<Hero> {
  //   this.messageService.add(`HeroService: fetched heroes`);
  //   return of(HEROES.find(hero => hero.id === id));
  // }

  //  请求获取英雄数据
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    )
  }

  //  404没找到错误
  getHeroNo404<Data>(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/?id=${id}`;
    return this.http.get<Hero[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

  //  处理错误
  private handleError<T> (operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  //  上传数据
  updateHero (hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    )
  }

  //  添加英雄
  addHero (hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  //  删除英雄
  deleteHero (hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  //  搜索英雄
  searchHeroes(term: string): Observable<Hero[]>{
    //  没有搜索项返回空
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ? this.log('found heroes matching "${term}"') : this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }
}
