import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { carInfothree }from '../model/formData.model';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-car-info-three',
  templateUrl: './car-info-three.component.html',
  styleUrls: ['./car-info-three.component.css']
})
export class CarInfoThreeComponent implements OnInit {
  public allformData: any;
  public showAddress: boolean = false;
  carInfothree: carInfothree;
  states: any;
  carModelname: any;
  carMakename: any;

  constructor(private commonService: CommonService, private formBuilder: FormBuilder, private router: Router) { }
  contactForm = this.formBuilder.group({
    primaryusage: [''],
    miles: [''],
    annualmileage: [''], 
    parkcarhomeaddress: [''],
    zipcode: ['', Validators.pattern("/^[0-9]{5}(?:-[0-9]{4})?$/")]
  });
  ngOnInit() {
    this.commonService.getstates("./assets/json/states.json").subscribe(res => {
      this.states = res;
    });
   this.carInfothree = this.commonService.getCarInfothree();
    this.allformData = this.commonService.getFormData();
    this.carModelname = localStorage.getItem("modelName");
    this.carMakename = localStorage.getItem("makename");
    console.log(this.allformData);
    if(this.carInfothree.parkcarhomeaddress){
      this.showAddress = true;  
    }
  }
  save(form: any): boolean {
    // if (!form.valid) {
    //     return false;
    // }    
    this.commonService.setCarInfothree(this.carInfothree);
    return true;
}

goToPrevious(form: any) {
    if (this.save(form)) {
        // Navigate to the work page
        this.router.navigate(['/car-information-2']);
    }
}

goToNext(form: any) {
    if (this.save(form)) {
        // Navigate to the result page
        this.router.navigate(['/about-you']);
    }
}

}
