import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Form, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { NgZorroAntdModule } from '../../ng-zorro-antd.module';

@Component({
  selector: 'app-to-do',
  standalone: true,
  imports: [NgZorroAntdModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './to-do.component.html',
  styleUrl: './to-do.component.less',
})
export class ToDoComponent implements OnInit {
  public Form: {
    Name: string;
    Email: string;
    Password: string;
    Course: string;
  }[] = [];
  public isAddVisible: boolean = false;
  selectedForm: any;
  public isVisible: boolean = false;
  currentForm: any;

  public studentForm = new FormGroup({
    Name: new FormControl(''),
    Email: new FormControl(''),
    Password: new FormControl(''),
    Course: new FormControl(''),
  });

  constructor() {
    if (localStorage.getItem('Form')) {
      this.Form = JSON.parse(localStorage.getItem('Form')!);
    }
  }
  ngOnInit(): void {}
 

  EditCancel(): void {
    this.isVisible = false;
  }
  Cancel(): void {
    this.isAddVisible = false;
  }
  addForm(): void {
    this.isAddVisible = true;
  }
  AddOk(): void {
    if (this.studentForm.valid) {
          const { Name, Email, Password, Course } = this.studentForm.value;

      this.Form.push({
      Name: Name ?? '',
      Email: Email ?? '',
      Password: Password ?? '',
      Course: Course ?? ''
    });

      localStorage.setItem('Form', JSON.stringify(this.Form));
      console.log(this.studentForm.value);
    }
    this.isAddVisible = false;
  }
  delete(index: number): void {
    this.Form.splice(index, 1);
    localStorage.removeItem('Form'); // Clear the local storage
    localStorage.setItem('Form', JSON.stringify(this.Form)); // Save updated Form
  }
  showModal(index: number): void {
  this.currentForm = index;         // ✅ Save index
  this.selectedForm = { ...this.Form[index] }; // Optional: clone for display
  this.isVisible = true;
}


Ok(): void {
  if (this.currentForm !== undefined && this.selectedForm) {
    this.Form[this.currentForm] = { ...this.selectedForm }; // Apply changes
    localStorage.setItem('Form', JSON.stringify(this.Form)); // Save
  }
  this.isVisible = false;
}

  onValueCahnge(value: any, key: string): void {
  if (!this.selectedForm) return;

  this.selectedForm[key] = value;
}


}
