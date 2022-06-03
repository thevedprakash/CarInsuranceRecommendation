import { Component, OnInit,Input } from '@angular/core';
import { CommonService } from '../common.service';
import { carInfotwo }from '../model/formData.model';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-info-two',
  templateUrl: './car-info-two.component.html',
  styleUrls: ['./car-info-two.component.css']
})
export class CarInfoTwoComponent implements OnInit {
  // @Input() formData: FormData;
  public allformData: any;
  public carInfotwo: carInfotwo;
  carModelname: any;
  carMakename: any;
  selectedvalue: any = [];

  constructor(private commonService: CommonService, private formBuilder: FormBuilder, private router: Router) { }
 
  contactForm = this.formBuilder.group({
    ownorlease: [''],
    yearsofcar: [''],
    // antitheftfeatures: this.formBuilder.array([])
  });
  ngOnInit() {
    this.carInfotwo = this.commonService.getCarInfotwo();
    this.allformData = this.commonService.getFormData();
    this.carModelname = localStorage.getItem("modelName");
    this.carMakename = localStorage.getItem("makename");
  }
  getantitheftfeatures(data: any, checkeddata){
    if(checkeddata){
      this.selectedvalue.push(data);
    }
    else{
      this.selectedvalue.pop(data);
    }
  }
  save(form: any): boolean {
    // if (!form.valid) {
    //     return false;
    // }    
    console.log(this.selectedvalue.length);
    if(this.selectedvalue.length == 0){
      this.commonService.setCarInfotwo(this.carInfotwo,"Yes");
    }
    else{
      this.commonService.setCarInfotwo(this.carInfotwo,"No");
    }
    
    return true;
}

goToPrevious(form: any) {
    if (this.save(form)) {
        // Navigate to the work page
        this.router.navigate(['/car-information']);
    }
}

goToNext(form: any) {
    if (this.save(form)) {
        // Navigate to the result page
        this.router.navigate(['/car-information-3']);
    }
}
}
