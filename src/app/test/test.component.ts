import { Component, OnInit } from '@angular/core';
import { Ask } from '../models/ask';

@Component({
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  ask: Ask;
  description: string;
  constructor() { }

  ngOnInit() {
  }

  addDesc()
  {
    this.ask.description = this.description;
  }
}
