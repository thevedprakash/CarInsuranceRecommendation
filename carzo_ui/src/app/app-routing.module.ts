import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { CarInfoComponent } from './car-info/car-info.component';
import { CarInfoTwoComponent } from './car-info-two/car-info-two.component';
import { CarInfoThreeComponent } from './car-info-three/car-info-three.component';
import { YourDrivingHistoryComponent } from './your-driving-history/your-driving-history.component';
import { YourHomeComponent } from './your-home/your-home.component';
import { YourLicenseComponent } from './your-license/your-license.component';
import { AboutYouComponent } from './about-you/about-you.component';
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { CarDetailComponent } from './car-detail/car-detail.component';
import { EducationandemploymentComponent } from './educationandemployment/educationandemployment.component';


const routes: Routes = [

  { path: '',   redirectTo: 'home', pathMatch: 'full' },
  { path: 'home',  component: HomepageComponent },
  { path: 'car-information',  component: CarInfoComponent },
  { path: 'car-information-2',  component: CarInfoTwoComponent },
  { path: 'car-information-3',  component: CarInfoThreeComponent },
  { path: 'about-you',  component: AboutYouComponent },
  { path: 'education-and-employeement',  component: EducationandemploymentComponent },
  { path: 'your-driving-history',  component: YourDrivingHistoryComponent },
  { path: 'your-home',  component: YourHomeComponent },
  { path: 'your-license',  component: YourLicenseComponent },
  { path: 'contact-information',  component: ContactInfoComponent },
  { path: 'car-detail',  component: CarDetailComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
