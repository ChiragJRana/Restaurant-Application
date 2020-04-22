import { Component, OnInit, ViewChild, Inject} from '@angular/core';
import {Dish} from '../shared/Dish';
import { ActivatedRoute, Params } from '@angular/router';
import {Location } from '@angular/common';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Comment } from '../shared/comment';

@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.scss']
})

export class DishDetailComponent implements OnInit {

  dishi:Dish;
  dishcopy:Dish;
  dishIds: string[];
  dishIdLen:number;
  prev: string;
  next: string;

  commentform: FormGroup;
  comment: Comment;
  
  errMsgdishi: string;
  errMsgDishId: string;
  BaseURL: string;

  formErrors= {
    'author':'',
    'rating': '',
    'comment': '',
  }

  // All Possible Error messages
  validationMessages = {
      'rating': {
      'required':      ' Name is required.'
    },
    'comment': {
      'required':      'comment is required.',
      // 'whitespace':    'Whitespaces are not allowed',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
      'author': {
      'required':      'Author Name is required.',
      'minlength':     'Author Name must be at least 2 characters long.',
      'maxlength':     'Name cannot be more than 25 characters long.'
      // 'whitespace':    'Whitespaces are not allowed'
    }
  };
  @ViewChild('cform') commentFormDirective;

  //===============================================================================================================
  
  constructor(private route: ActivatedRoute,
              private location: Location,
              private dishService: DishService,
              private fb: FormBuilder,
              @Inject('BaseURL') BaseURL) {
                this.BaseURL = BaseURL
                this.createForm();  
      
  }

  ngOnInit(): void {
    this.dishService.getDishIds().subscribe(
      (dishIds) => {
        this.dishIds = dishIds; 
        this.dishIdLen = this.dishIds.length;},
      (error) => (this.errMsgDishId = <any>error)
      );
    this.route.params.pipe(switchMap( (params:Params) => this.dishService.getDish(params['id'])))
      .subscribe(
        (dish)=> {
        this.dishi = dish;
        this.dishcopy = dish;
        this.setPrevNext(dish.id);
      },
        (error) => (this.errMsgdishi = <any>error)
      );
  }
//=================================================================================================================
  goBack():void {
    this.location.back();
  }
  
  setPrevNext(dishId: string):void{
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIdLen + index - 1) % this.dishIdLen];
    this.next = this.dishIds[(this.dishIdLen + index + 1) % this.dishIdLen];
  }

  createForm(){
    this.commentform = this.fb.group({
    rating:[5,[Validators.required]],
    comment:['',[Validators.required,Validators.minLength(2),Validators.maxLength(100)]],
    author:['',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
    date: new Date().toISOString()
    })

    this.commentform.valueChanges.subscribe(data => this.onValueChanged());
    
    this.onValueChanged(); // reset Validation Changes 
  }

  onValueChanged(data?: any) {
    if (!this.commentform) { return; }
    const form = this.commentform;
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

  // public noWhitespaceValidator(control: FormControl) {
  //   if (control.value.length < 2){ return null}
  //   const isWhitespace = (control.value || '').trim().length <= 1;
  //   const isValid = !isWhitespace;
  //   return isValid ? null : { 'whitespace': true };
  // }

  
  onSubmit(){
    this.comment = this.commentform.value;
    // console.log(this.comment);
    // console.log(this.dishi.comments);
    this.commentform.reset({
      rating: 5,
      commment: '',
      author: '',
      date: new Date().toISOString
    });
    this.dishcopy.comments.push(this.comment);
    this.dishService.putDish(this.dishcopy)
    .subscribe(
      (dish) => {this.dishi = dish; this.dishcopy = dish;},
      (error) => {
        this.dishi = null;
        this.dishcopy = null;
        this.errMsgdishi = <any>error;
      }
    );
    this.commentFormDirective.resetForm();
  }
}
