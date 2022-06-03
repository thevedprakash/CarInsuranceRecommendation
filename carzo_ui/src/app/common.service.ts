import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FormData, CarInfo, carInfotwo, aboutyou, yourLicense, yourDrivingHistory, contactinfo, educationAndEmployment } from './model/formData.model';
import { carInfothree,yourHome } from './model/formData.model';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class CommonService {
  private url: any = "";
  private formData: FormData = new FormData();
  private isCarInfoFormValid: boolean = false;
  private isCarInfotwoFormValid: boolean = false;
  
  private messageSource = new BehaviorSubject({});
  public currentMessage = this.messageSource.asObservable();

  constructor(private http: HttpClient) { }

  getCarMake(data: any, year: any) {
    return this.http.get("http://127.0.0.1:5000/getCarMake?year="+year+"&usage="+data).pipe(
      catchError(this.handleError)
    );
  }
  getstates(data: any) {
    return this.http.get(data);
  }
  postCarMake(data: number, year: any, usage: any) {
    return this.http.get("http://127.0.0.1:5000/getCarModel?modelId="+data +"&year="+year+"&usage="+usage).pipe(
      catchError(this.handleError)
    );
  }

  getCarModel(countryId: number) {
    return this.http.get("").pipe(
      // catchError(this.handleError)
    );
  }

  getCarInfo(): CarInfo {
    var carInfo: CarInfo = {
      caryear: this.formData.caryear,
      makeId: this.formData.makeId,
      modelId: this.formData.modelId,
      usage: this.formData.usage
    };
    return carInfo;
  }

  setCarInfo(data: CarInfo) {
    this.isCarInfoFormValid = true;
    this.formData.caryear = data.caryear;
    this.formData.makeId = data.makeId;
    this.formData.modelId = data.modelId;
    this.formData.usage = data.usage;

  } 
  getCarInfotwo(): carInfotwo {
    var carInfotwo: carInfotwo = {
      ownorlease: this.formData.ownorlease,
      yearsofcar: this.formData.yearsofcar,
      Anti_Theft: this.formData.Anti_Theft,
    };
    return carInfotwo;
  }
  setCarInfotwo(data: carInfotwo, value) {

    this.formData.ownorlease = data.ownorlease;
    this.formData.yearsofcar = data.yearsofcar;
    this.formData.Anti_Theft = value;
  }
  getCarInfothree(): carInfothree {
    var carInfothree: carInfothree = {
      primaryusage: this.formData.primaryusage,
      miles: this.formData.miles,
      annualmileage: this.formData.annualmileage,
      parkcarhomeaddress: this.formData.parkcarhomeaddress,
    };
    return carInfothree;
  }
  setCarInfothree(data: carInfothree) {

    this.formData.primaryusage = data.primaryusage;
    this.formData.miles = data.miles;
    this.formData.annualmileage = data.annualmileage;
    this.formData.parkcarhomeaddress = data.parkcarhomeaddress;
  }
  getAboutYou(): aboutyou {
    var aboutyou: aboutyou = {
      firstname: this.formData.firstname,
      lastname: this.formData.lastname,
      dateofbirth: this.formData.dateofbirth,
      gender: this.formData.gender,
      maritialstatus: this.formData.maritialstatus
    };
    return aboutyou;
  }
  setAboutYou(data: aboutyou) {
    this.formData.firstname = data.firstname;
    this.formData.lastname = data.lastname;
    this.formData.dateofbirth = data.dateofbirth;
    this.formData.gender = data.gender;
    this.formData.maritialstatus = data.maritialstatus;
  }
  getyourLicense(): yourLicense {
    var yourLicense: yourLicense = {
      usLicense: this.formData.usLicense,
      firstLicense: this.formData.firstLicense,
      voluntarydrivingclass: this.formData.voluntarydrivingclass
    };
    return yourLicense;
  }
  setyourLicense(data: yourLicense) {

    this.formData.usLicense = data.usLicense;
    this.formData.firstLicense = data.firstLicense;
    this.formData.voluntarydrivingclass = data.voluntarydrivingclass;
  }
  getyourDrivingHistory(): yourDrivingHistory {
    var yourDrivingHistory: yourDrivingHistory = {
      DL_Suspended : this.formData.DL_Suspended ,
      dui: this.formData.dui,
      Financialdocument: this.formData.Financialdocument,
      claims: this.formData.claims,
    };
    return yourDrivingHistory;
  }
  setyourDrivingHistory(data: yourDrivingHistory) {
    this.formData.DL_Suspended  = data.DL_Suspended ;
    this.formData.dui = data.dui;
    this.formData.Financialdocument = data.Financialdocument;
    this.formData.claims = data.claims;
  }
  getcontactinfo(): contactinfo {
    var contactinfo: contactinfo = {
      email: this.formData.email,
      phoneNumber: this.formData.phoneNumber,
    };
    return contactinfo;
  }
  setcontactinfo(data: contactinfo) {

    this.formData.email = data.email;
    this.formData.phoneNumber = data.phoneNumber;

  }
  getyourHome(): yourHome {
    var yourHome: yourHome = {
      residence: this.formData.residence,
      rentorown: this.formData.rentorown,
      accommodation: this.formData.accommodation,
      address:this.formData.address
    };
    return yourHome;

  }
  setyourHome(data: yourHome) {
    this.formData.residence = data.residence;
    this.formData.rentorown = data.rentorown;
    this.formData.accommodation = data.accommodation;
    this.formData.address = data.address;

  }
  geteducationAndEmployment(): educationAndEmployment {
    var educationAndEmployment: educationAndEmployment = {
      hightleveleducation: this.formData.hightleveleducation,
      profile: this.formData.profile,
      annualsalary: this.formData.annualsalary,
      occupation: this.formData.occupation,
    };
    return educationAndEmployment;
  }
  seteducationAndEmployment(data: educationAndEmployment) {
    this.formData.hightleveleducation = data.hightleveleducation;
    this.formData.profile = data.profile;
    this.formData.annualsalary = data.annualsalary;
    this.formData.occupation = data.occupation;
  }

  postData(url: any, data: any) {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    let options = {
      headers: httpHeaders
    };
    return this.http.post(url, data, options);
  }
  getData(data: any) {
    return this.http.get(data);
  }
  getFormData(): FormData {
    // Return the entire Form Data
    return this.formData;
  }

  // isFormValid() {
  //   // Return true if all forms had been validated successfully; otherwise, return false
  //   return this.isCarInfoFormValid && this.isCarInfotwoFormValid;
  // }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened. Please try again later.');
  }

  changeMessage(message: any) {
    this.messageSource.next(message)
  }

}
