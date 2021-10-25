export default class User {
    constructor(password, userName, email, phone, birthYear, address,confidentiality) {
        this.password = password;
        this.userName = userName;
        this.email = email;
        this.phone = phone;
        this.birthYear = birthYear
        this.address = address;
        // this.status = status;
        this.confidentiality = confidentiality;//חסוי
    }
}

