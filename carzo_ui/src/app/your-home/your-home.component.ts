import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { yourHome }from '../model/formData.model';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-your-home',
  templateUrl: './your-home.component.html',
  styleUrls: ['./your-home.component.css']
})
export class YourHomeComponent implements OnInit {
  public yourHome: yourHome;
  allformData: any;
  submitted: boolean;
  constructor(private commonService: CommonService, private formBuilder: FormBuilder, private router: Router) { }
  contactForm = this.formBuilder.group({
      address: this.formBuilder.group({
      streetAddress: [''],
      apt: [''],
      city: [''],
      state: ['', Validators.required],
      zipCode: ['85287'],
    }),
    residence: [''],
    rentorown: [''],
    accommodation: [''],
  
  });
  ngOnInit() {
   this.yourHome = this.commonService.getyourHome();
    this.allformData = this.commonService.getFormData();    
    console.log(this.allformData);
  }
  save(form: any): boolean {
    this.submitted = false;
    if (!form.valid) {
      this.submitted = true;
      return false;
    }
   this.commonService.setyourHome(this.yourHome);
    return true;
  }

  goToPrevious(form: any) {
    if (this.save(form)) {
      // Navigate to the work page
      this.router.navigate(['/education-and-employeement']);
    }
  }

  goToNext(form: any) {
    if (this.save(form)) {
      // Navigate to the result page
      this.router.navigate(['/your-license']);
    }
  }
}
