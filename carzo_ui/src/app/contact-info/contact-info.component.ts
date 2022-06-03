import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { contactinfo }from '../model/formData.model';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.css']
})
export class ContactInfoComponent implements OnInit {
  private data: any;
  public contactinfo: contactinfo;
  allformData: any;
  spinnerShow: any;
  submitted: boolean;
  constructor(private commonService: CommonService, private formBuilder: FormBuilder, private router: Router) { }
  contactForm = this.formBuilder.group({
    email: ['', [Validators.required,Validators.email]],
    phoneNumber: ['', Validators.required]

});

  ngOnInit() {
    this.contactinfo = this.commonService.getcontactinfo();
    this.allformData = this.commonService.getFormData();
    console.log(this.allformData);
  }
  save(form: any): boolean {
    this.submitted = false;
    if (!form.valid) {
      this.submitted = true;
      return false;
    }  
    this.commonService.setcontactinfo(this.contactinfo);
    return true;
}
numericOnly(event): boolean {    
  let patt = /^([0-9])$/;
  let result = patt.test(event.key);
  return result;
}
goToPrevious(form: any) {
    if (this.save(form)) {
        // Navigate to the work page
        this.router.navigate(['/your-driving-history']);
    }
}

goToNext(form: any) {
  
    if (this.save(form)) {
     const json = JSON.stringify(this.allformData);
     this.spinnerShow = true;
    this.commonService.postData("http://127.0.0.1:5000/predictions" ,json).subscribe(res => {
      this.spinnerShow = false;
      this.router.navigate(['/car-detail']);
      this.commonService.changeMessage(res);
    });  
   }
  }
}
