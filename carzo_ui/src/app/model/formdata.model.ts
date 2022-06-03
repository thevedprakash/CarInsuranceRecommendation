export class FormData {
    caryear: any = '';
    makeId: any = '';
    modelId: any = '';
    usage: any = '';
    ownorlease: any = '';
    yearsofcar: any = '';
    Anti_Theft: any = '';
    firstname: any = '';
    lastname: any = '';
    dateofbirth: any = '10/10/1984';
    gender: any = 'Male';
    maritialstatus: any = '';
    usLicense: any = '';
    firstLicense: any = '';
    voluntarydrivingclass: any = '';
    DL_Suspended : any = '';
    dui: any = '';
    Financialdocument: any = '';
    claims: any = '';
    email: any = '';
    phoneNumber: any = '';
    hightleveleducation: any = '';
    profile: any = '';
    annualsalary: any = '';
    occupation: any = '';
    address: any = {} ;
    residence: any = '';
    rentorown: any = '';
    accommodation: any = '';
    primaryusage: any = '';
    miles: any = '';
    annualmileage: any = '';
    parkcarhomeaddress: any = '';
   

    clear() {
        this.caryear = '';
        this.makeId = '';
        this.modelId = '';
        this.usage = '';
        this.ownorlease = '';
        this.yearsofcar = '';
        this.Anti_Theft = '';
        this.firstname = '';
        this.lastname = '';
        this.dateofbirth = '';
        this.gender = '';
        this.maritialstatus = '';
    }
}

export class CarInfo {
    caryear: any = '';
    makeId: any = '';
    modelId: any = '';
    usage: any = '';
}

export class carInfotwo {
    ownorlease: any = '';
    yearsofcar: any = '';
    Anti_Theft: any = '';
}
export class carInfothree {
    primaryusage: any = '';
    miles: any = '';
    annualmileage: any = '';
    parkcarhomeaddress: any = '';
}
export class aboutyou {
    firstname: any = '';
    lastname: any = '';
    dateofbirth: any = '';
    gender: any = '';
    maritialstatus: any = '';
}
export class yourLicense {
    usLicense: any = '';
    firstLicense: any = '';
    voluntarydrivingclass: any = '';
}

export class yourDrivingHistory {
    DL_Suspended : any = '';
    dui: any = '';
    Financialdocument: any = '';
    claims: any = '';
}

export class contactinfo {
    email: any = '';
    phoneNumber: any = '';
}

export class educationAndEmployment {
    hightleveleducation: any = '';
    profile: any = '';
    annualsalary: any = '';
    occupation: any = '';
}
export class yourHome {
    address: any ; 
    residence: any = '';
    rentorown: any = '';
    accommodation: any = '';
}
