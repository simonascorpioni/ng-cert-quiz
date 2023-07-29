import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, combineLatest, map, withLatestFrom } from 'rxjs';
import { DropdownOption } from 'src/app/models/data.models';

@Component({
  selector: 'app-auto-filter-dropdown',
  templateUrl: './auto-filter-dropdown.component.html',
  styleUrls: ['./auto-filter-dropdown.component.css']
})
export class AutoFilterDropdownComponent<T extends DropdownOption> implements OnInit {

  @Input() placeholder!: string;
  @Input() inputArray$!: Observable<T[] | null>;

  @Input()
  set inputSelection(input: T | undefined) {
    input ? this.inputControl.setValue(input.name) : this.inputControl.setValue('')
  }

  @Output() inputSelectionChange = new EventEmitter<T>();

  inputControl = new FormControl();
  filteredInputs$!: Observable<T[]>;

  ngOnInit() {
    this.filteredInputs$ = combineLatest([this.inputControl.valueChanges, this.inputArray$]).pipe(
      map(([userInput, inputs]) => inputs!.filter(i => i.name.toLowerCase().indexOf(userInput!.toLowerCase()) !== -1))
    );
  }

  updateInput(input: T){
    this.inputControl.setValue(input.name);
    this.inputSelectionChange.emit(input);
  }
}
