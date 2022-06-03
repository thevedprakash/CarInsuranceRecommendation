import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarInfo } from "../model/formdata.model";
import { Router } from '@angular/router';
@Component({
  selector: 'app-car-info',
  templateUrl: './car-info.component.html',
  styleUrls: ['./car-info.component.css']
})
export class CarInfoComponent implements OnInit {
  public yearList: any;
  public carInfo: CarInfo;
  public form: any;
  public carmodel: Object;
  public carmodellist: any;
  public makedata: any;
  public carmakelist: any;
  submitted: boolean;
  constructor(private commonService: CommonService, private formBuilder: FormBuilder, private router: Router) { }
  contactForm = this.formBuilder.group({
    caryear: ['', Validators.required],
    makeId: ['' , Validators.required],
    modelId: ['' , Validators.required],
    usage: ['', Validators.required],
  });
  ngOnInit() {
    this.carInfo = this.commonService.getCarInfo();
    this.commonService.getData("./assets/json/year.json").subscribe(res => {
      this.yearList = res;
    });
    //  this.commonService.getCarMake("http://127.0.0.1:5000/getCarMake").subscribe(res => {    
    //   this.makedata = res;
    //   this.makedata =  this.makedata.data
    // });
  }
  onChangeCarMake(datacarmake) {
    let localyeardata = localStorage.getItem('year');
    let localusagedata = localStorage.getItem('usage');
    if (datacarmake.value) {
      this.commonService.postCarMake(datacarmake.value,localyeardata,localusagedata).subscribe(
        datamodel => {
          this.carmodellist = datamodel;
          this.carmodellist  = this.carmodellist.data;
         
        }
      );
      localStorage.setItem('makename',  datacarmake.options[datacarmake.options.selectedIndex].text);
    } else {
      this.carmodellist = null;
    }
  }
  onChangeCarYear(datacaryear) {
    if (datacaryear) {
      this.commonService.getCarMake("",datacaryear).subscribe(
        datamodel => {
          this.carmakelist = datamodel;
          this.carmakelist  = this.carmakelist.data;
        }
      );
      localStorage.setItem('year',  datacaryear);
    } else {
      this.carmodellist = null;
    }
  }
  onChangeCaruasage(data){
    let localyeardata = localStorage.getItem('year');
    if (data) {
      this.commonService.getCarMake(data,localyeardata).subscribe(
        datamodel => {
          this.carmakelist = datamodel;
          this.carmakelist  = this.carmakelist.data;
        }
      );
      localStorage.setItem('usage',  data);
    } else {
      this.carmodellist = null;
    }
    console.log(localyeardata);
  }
  onChangeCarmodel(data){
    localStorage.setItem('modelName', data.options[data.options.selectedIndex].text);
  }
  onSubmit(form: any) {
    this.submitted = false;
    if (!form.valid) {
      this.submitted = true;
      return false;
    }
    this.commonService.setCarInfo(this.carInfo);
    return true;
  }
  goToNext(form: any) {
    if (this.onSubmit(form)) {
      this.router.navigate(['/car-information-2']);
    }
  }
}