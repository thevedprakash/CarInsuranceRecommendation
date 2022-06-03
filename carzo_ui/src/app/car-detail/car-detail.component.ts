import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  public data: any;
  contactForm: FormGroup;
  stateresponsedata: any;
  cardetailresponse: any;
  cardetailprediction: any;
  resultArray: any[];
  stringArray: any[];
  imgArray: any[];
  

  constructor( private commonService:CommonService,private formBuilder: FormBuilder, public route: ActivatedRoute) { }

  ngOnInit() {
   
    this.contactForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]]

  });
  this.commonService.currentMessage.subscribe(result => {
    this.cardetailresponse = result;
    this.cardetailprediction =  this.cardetailresponse.predictions;
    console.log(this.cardetailresponse);
    this.resultArray = [];
    this.stringArray = [];
    this.imgArray = []
   
    for(let item of this.cardetailprediction)
    {
        if(item.includes('/'))
        {
          this.resultArray.push(item);
        }
        else{          
          if(item.includes('Car Rental I')){
            item = 'Car Rental'
            this.imgArray.push(item.replace(/ /g,"_"));
            this.stringArray.push(item);
          }
          else if(item.includes("'Gap Insurance'")){
            item = 'Gap Insurance'
            this.imgArray.push(item.replace(/ /g,"_"));
            this.stringArray.push(item);
          }
          else{
            this.imgArray.push(item.replace(/ /g,"_"));
            this.stringArray.push(item);
          }
        }
    }
    return this.resultArray;
  });
  console.log(this.resultArray);
  console.log(this.imgArray);
  }

}
