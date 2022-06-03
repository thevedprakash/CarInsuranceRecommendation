import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { aboutyou }from '../model/formData.model';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-you',
  templateUrl: './about-you.component.html',
  styleUrls: ['./about-you.component.css']
})
export class AboutYouComponent implements OnInit {
  public aboutyou: aboutyou;
  allformData: any;
  constructor(private commonService: CommonService, private formBuilder: FormBuilder, private router: Router) { }
  contactForm = this.formBuilder.group({
    firstname: [''],
    lastname: [''],
    dateofbirth: [''],
    gender: [''],
    maritialstatus: ['']
  });
  ngOnInit() {
    this.aboutyou = this.commonService.getAboutYou();
    this.allformData = this.commonService.getFormData();
    console.log(this.allformData);
  }
  save(form: any): boolean {
    // if (!form.valid) {
    //     return false;
    // }    
    this.commonService.setAboutYou(this.aboutyou);
    return true;
}

goToPrevious(form: any) {
    if (this.save(form)) {
        // Navigate to the work page
        this.router.navigate(['/car-information-3']);
    }
}

goToNext(form: any) {
    if (this.save(form)) {
        // Navigate to the result page
        this.router.navigate(['/education-and-employeement']);
    }
}
}
