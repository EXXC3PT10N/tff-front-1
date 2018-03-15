import { Component, OnInit } from '@angular/core';
import { Ask } from '../models/ask';

@Component({
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  ask: Ask = {
    description: "",
    "salary": 0,
    "work_time": 0,
    "categories": [],
    "languages": [],
    "software": [],
    "specs": [],
    "certifications": []
};
  description: string;
  constructor() { }

  ngOnInit() {
  }

  addDesc()
  {
    this.ask.description = this.description;
    console.log("Obiekt: "+JSON.stringify(this.ask));
  }
}
