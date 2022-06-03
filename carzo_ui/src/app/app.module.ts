import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CarInfoComponent } from './car-info/car-info.component';
import { CarInfoTwoComponent } from './car-info-two/car-info-two.component';
import { CarInfoThreeComponent } from './car-info-three/car-info-three.component';
import { AboutYouComponent } from './about-you/about-you.component';
import { EducationandemploymentComponent } from './educationandemployment/educationandemployment.component';
import { YourHomeComponent } from './your-home/your-home.component';
import { YourLicenseComponent } from './your-license/your-license.component';
import { YourDrivingHistoryComponent } from './your-driving-history/your-driving-history.component';
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { CarDetailComponent } from './car-detail/car-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonService } from './common.service';
import {CalendarModule} from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomepageComponent,
    CarInfoComponent,
    CarInfoTwoComponent,
    CarInfoThreeComponent,
    AboutYouComponent,
    EducationandemploymentComponent,
    YourHomeComponent,
    YourLicenseComponent,
    YourDrivingHistoryComponent,
    ContactInfoComponent,
    CarDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CalendarModule,
    BrowserAnimationsModule,
    
  ],
  providers: [ CommonService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
