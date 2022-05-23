import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-sidebar-input',
  templateUrl: './sidebar-input.component.html',
  styleUrls: ['./sidebar-input.component.scss']
})
export class SidebarInputComponent implements OnInit {
  @Input() label: string = '';
  @Input() type: string = 'number';
  @Input() placeholder: string = '';
  @Input() value: string = '';
  @Input() name: string = '';
  @Input() control: string = '';
  @Input() required: boolean = false;
  @Input() formGroup: FormGroup;

  constructor() {
  }

  ngOnInit(): void {
  }

}
