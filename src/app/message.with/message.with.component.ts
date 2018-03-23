import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
import {GroupMessage, Message} from '../models/message.with';
import { With } from '../models/message.with';
import {ActivatedRoute} from '@angular/router';
import {withIdentifier} from 'codelyzer/util/astQuery';

@Component({
  selector: 'app-message.with',
  templateUrl: './message.with.component.html',
  styleUrls: ['./message.with.component.css']
})
export class MessageWithComponent implements OnInit {
  messages: Message[] = new Array();
  groupMessages: GroupMessage[] = new Array();
  with: With;
  count: number;
  page: number;
  pagesize: number;
  withId: string;
  textValue: string;
  constructor(private _messageService: MessageService, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.getMessages();

  }

  getMessages(): void {
    this._route.params.subscribe(params => {
      this.withId = params.id;
      this._messageService.getMessagesWith(this.withId, this.page, this.pagesize).subscribe(
        res => {
          this.messages = res.messages;
          this.count = res.count;
          this.groupMsgs(res.messages);
          console.log(this.messages);
          console.log(this.groupMessages);
        },
        err => {
          console.error(err);
        }
      )
    });
  }
  sendMessage() {
    console.log(this.textValue);
    this._messageService.sendMessage(this.textValue, this.withId)
      .subscribe(res => {
        if (res.success) {
          this.messages.push(res.message);
          this.groupMsgsAddMessage(res.message);
          this.count++;
          this.textValue = '';
        } else {
          console.log(res.message);
        }
      });
  }
  onEnter(event) {
    if(event.keyCode === 13) {
      this.sendMessage();
    }
  }
  groupMsgs(msgs: Message[]): void {
    let change = msgs[0].is_send;
    this.groupMessages.push({
      is_send: msgs[0].is_send,
      messages: [msgs[0]]
    });
    msgs.forEach((msg, index) => {
      if (index !== 0) {
        if (change !== msg.is_send) {
          this.groupMessages.push({
            is_send: msg.is_send,
            messages: [msg]
          });
          change = !change;
        } else {
          this.groupMessages[this.groupMessages.length - 1].messages.push(msg);
        }
      }
    });
  }
  groupMsgsAddMessage(message: Message) {
    if (this.groupMessages[this.groupMessages.length - 1].is_send !== message.is_send) {
      this.groupMessages.push({
        is_send: message.is_send,
        messages: [message]
      });
    } else {
      this.groupMessages[this.groupMessages.length - 1].messages.push(message);
    }
  }
}
