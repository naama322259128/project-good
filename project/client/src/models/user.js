export default class User {
    constructor(password, userName, email, phone, birthYear, city,confidentiality) {
        this.password = password;
        this.userName = userName;
        this.email = email;
        this.phone = phone;
        this.birthYear = birthYear
        this.city = city;
        // this.status = status;
        this.confidentiality = confidentiality;//חסוי
    }
}

