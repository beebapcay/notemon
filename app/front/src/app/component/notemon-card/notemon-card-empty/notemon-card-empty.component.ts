import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-notemon-card-empty',
  templateUrl: './notemon-card-empty.component.html',
  styleUrls: ['./notemon-card-empty.component.scss']
})
export class NotemonCardEmptyComponent implements OnInit {

  emptyMessage = 'You don\'t have any notes yet. Click the button below to create one.';


  constructor() {
  }

  ngOnInit(): void {
  }

}
