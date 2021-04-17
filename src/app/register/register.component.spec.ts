import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import {Component} from '@angular/core';

/** @title Form field with prefix & suffix */
@Component({
  selector: 'form-field-prefix-suffix-example',
  templateUrl: 'form-field-prefix-suffix-example.html',
  styleUrls: ['form-field-prefix-suffix-example.css'],
})
export class FormFieldPrefixSuffixExample {
  hide = true;
}
