import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeroesComponent } from './heroes/heroes.component';
//  导入form双向绑定模块,放到顶层AppModule类中
import { FormsModule } from '@angular/forms';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
//  http请求
import { HttpClientModule } from '@angular/common/http';

//  angular-in-memory-web-api包拦截http请求
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { HeroSearchComponent } from './hero-search/hero-search.component';
@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    // HttpClientInMemoryWebApiModule拦截HTTP请求，返回模拟数据，如果接口服务器准备好了就删除
    HttpClientModule,
    // 从内存中获取返回数据
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    HeroSearchComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
