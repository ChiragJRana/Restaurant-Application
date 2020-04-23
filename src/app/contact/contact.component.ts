import { Component, OnInit, ViewChild } from '@angular/core';
import { Feedback, ContactType } from '../shared/feedback';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { flyInOut } from '../animations/app.animation';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]':'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut()
  ]
})
export class ContactComponent implements OnInit {
  feedback: Feedback;
  feedbackForm: FormGroup;
  contactType = ContactType;
  
  formErrors= {
    'firstname':'',
    'lastname': '',
    'telnum': '',
    'email':''
  }

  
  // All Possible Error messages
  validationMessages = {
    'firstname': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.',
      'whitespace':    'Whitespaces are not allowed'
    },
    'lastname': {
      'required':      'Last Name is required.',
      'minlength':     'Last Name must be at least 2 characters long.',
      'maxlength':     'Last Name cannot be more than 25 characters long.',
      'whitespace':    'Whitespaces are not allowed'
    },
    'telnum': {
      'required':      'Tel. number is required.',
      'pattern':       'Tel. number must contain only numbers.',
      'whitespace':    'Whitespaces are not allowed'
    },
    'email': {
      'required':      'Email is required.',
      'email':         'Email not in valid format.',
      'whitespace':    'Whitespaces are not allowed'
    },
  };


  @ViewChild('fform') feedbackFormDirective;

  constructor(private fb: FormBuilder){
    this.createForm();
   }

  ngOnInit(): void { }
  createForm(){
    this.feedbackForm = this.fb.group({
    firstname: ['',[ Validators.required, Validators.minLength(2), Validators.maxLength(25),this.noWhitespaceValidator]],
      lastname: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(25),this.noWhitespaceValidator]],
      telnum: [,[Validators.required, Validators.pattern]],
      email: ['',[Validators.required, Validators.email,this.noWhitespaceValidator]],
      agree: false,
      contacttype: 'None',
      message: ''
    });
    
    this.feedbackForm.valueChanges.subscribe(data => this.onValueChanged());
    
    this.onValueChanged(); // reset Validation Changes 
  }
  
  public noWhitespaceValidator(control: FormControl) {
    if (control.value.length < 2){ return null}
    const isWhitespace = (control.value || '').trim().length <= 1;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  
  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  
  onSubmit(){
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: 0,
      email: '',
      agree: false,
      contacttype:'None',
      message: ''
    });
    this.feedbackFormDirective.resetForm();
  }

}
