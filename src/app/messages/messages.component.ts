import { Component, OnInit } from '@angular/core';
//  导入消息服务
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  //  这里使用public是因为模板中会用到该属性服务
  constructor(
    public messageService: MessageService
  ) { }

  ngOnInit() {
  }

}
