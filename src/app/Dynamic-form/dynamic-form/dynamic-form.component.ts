import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl} from '@angular/forms';
import { FieldConfig, Validation } from './field-config.interface';


@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.css'
})
export class DynamicFormComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  formFields: FieldConfig[] = [];
  currentLang: string = 'en';
  

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<{ fields: FieldConfig[] }>('/assets/form-config.json').subscribe(response => {
      this.formFields = response.fields.sort((a, b) => a.priority - b.priority);
      this.formFields.forEach(field => {
        const control = new FormControl(
          '',
          this.getValidators(field.validations)
        );
        this.form.addControl(field.name, control);
      });
    });
  }
  

  getValidators(validations: Validation[]): any {
    return validations.map(val => {
      switch (val.name) {
       
        case 'maxLength':
          return Validators.maxLength(val.value);
        case 'required':
          return Validators.required; 

        default:
          return  Validators.required; 
        
      }
    });
  } 
  changeLang(){
    this.currentLang = this.currentLang === 'en' ? 'ar' : 'en';
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form Value:', this.form.value);
      // Handle the form submission, e.g., send to the server
    } else {
      console.log('Form Errors:', this.form.errors);
    }
  }
      


}
