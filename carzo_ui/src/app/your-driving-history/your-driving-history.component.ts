import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { yourDrivingHistory }from '../model/formData.model';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-your-driving-history',
  templateUrl: './your-driving-history.component.html',
  styleUrls: ['./your-driving-history.component.css']
})
export class YourDrivingHistoryComponent implements OnInit {
  public yourDrivingHistory: yourDrivingHistory;
  allformData: any;
  constructor(private commonService: CommonService, private formBuilder: FormBuilder, private router: Router) { }
  contactForm = this.formBuilder.group({
    DL_Suspended: [''],
    dui: [''],
    Financialdocument: [''],
    claims: ['']
  });
  ngOnInit() {
    this.yourDrivingHistory = this.commonService.getyourDrivingHistory();
    this.allformData = this.commonService.getFormData();
    console.log(this.allformData);
  }
  save(form: any): boolean {
    // if (!form.valid) {
    //     return false;
    // }    
    this.commonService.setyourDrivingHistory(this.yourDrivingHistory);
    return true;
}

goToPrevious(form: any) {
    if (this.save(form)) {
        // Navigate to the work page
        this.router.navigate(['/your-license']);
    }
}

goToNext(form: any) {
    if (this.save(form)) {
        // Navigate to the result page
        this.router.navigate(['/contact-information']);
    }
}
}
