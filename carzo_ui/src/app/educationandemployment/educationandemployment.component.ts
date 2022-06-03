import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { educationAndEmployment }from '../model/formData.model';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-educationandemployment',
  templateUrl: './educationandemployment.component.html',
  styleUrls: ['./educationandemployment.component.css']
})
export class EducationandemploymentComponent implements OnInit {
  public educationAndEmployment: educationAndEmployment;
  allformData: any;
  occupation: any;
  submitted: boolean;
  constructor(private commonService: CommonService, private formBuilder: FormBuilder, private router: Router) { }
  contactForm = this.formBuilder.group({
    hightleveleducation: [''],
    profile: [''],
    annualsalary: ['',Validators.required],
    occupation: ['']
  });
  ngOnInit() {
    this.educationAndEmployment = this.commonService.geteducationAndEmployment();
    this.allformData = this.commonService.getFormData();
    console.log(this.allformData);
    this.commonService.getData("./assets/json/occupation.json").subscribe(res => {
      this.occupation = res[0];
    });
  }
  save(form: any): boolean {
    this.submitted = false;
    if (!form.valid) {
      this.submitted = true;
      return false;
    }  
    this.commonService.seteducationAndEmployment(this.educationAndEmployment);
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
        this.router.navigate(['/about-you']);
    }
}

goToNext(form: any) {
    if (this.save(form)) {
        // Navigate to the result page
        this.router.navigate(['/your-home']);
    }
}
}
