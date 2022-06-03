import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { yourLicense }from '../model/formData.model';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-your-license',
  templateUrl: './your-license.component.html',
  styleUrls: ['./your-license.component.css']
})
export class YourLicenseComponent implements OnInit {
  public yourLicense: yourLicense;
  allformData: any;
  constructor(private commonService: CommonService, private formBuilder: FormBuilder, private router: Router) { }
  contactForm = this.formBuilder.group({
    usLicense: [''],
    firstLicense: [''],
    voluntarydrivingclass: ['']
  });
  ngOnInit() {
    this.yourLicense = this.commonService.getyourLicense();
    this.allformData = this.commonService.getFormData();
    console.log(this.allformData);
  }
  save(form: any): boolean {
    // if (!form.valid) {
    //     return false;
    // }    
    this.commonService.setyourLicense(this.yourLicense);
    return true;
}

goToPrevious(form: any) {
    if (this.save(form)) {
        // Navigate to the work page
        this.router.navigate(['/your-home']);
    }
}

goToNext(form: any) {
    if (this.save(form)) {
        // Navigate to the result page
        this.router.navigate(['/your-driving-history']);
    }
}
}
