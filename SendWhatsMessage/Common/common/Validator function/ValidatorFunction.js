export const IsPasswordValid = (password) => {

    //     Minimum eight characters, at least one letter and one number:

    // "^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
    // Minimum eight characters, at least one letter, one number and one special character:

    // "^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
    // Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:

    // "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
    // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:

    // "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
    // Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character:

    // "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$"
    const reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!password) {
        alert('Please fill Password');
        return false
    }
    if (reg.test(password) === false & password != null) {
        alert("Please fill Minimum eight characters, at least one letter and one number ");
        return false
    }
    if (reg.test(password) === true & password != null) {
        return true
    }
}

export const IsEmailValid = (Email) => {
    // console.log(text);
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (!Email) {
        alert('Please fill Email');
        return false
    }
    if (reg.test(Email) === false & Email != null) {
        alert("This is not a valid email address");
        return false
    }
    if (reg.test(Email) === true & Email != null) {

        return true
    }

}

// /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
export const IsPhoneValid = (phone) => {
    // console.log(text);
    const reg = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if (!phone) {
        alert('Please fill phone Number');
        return false
    }
    if (reg.test(phone) === false & phone != null) {
        alert("This is not a valid phone Number");
        return false
    }
    if (reg.test(phone) === true & phone != null) {

        return true
    }

}

export const IsFullNameValid = (FullName) => {
    // console.log(text);
    const reg = /^[a-zA-Z]+ [a-zA-Z]+$/;
    if (!FullName) {
        alert('Please fill Full Name');
        return false
    }
    if (reg.test(FullName) === false ) {
        alert("This is not a valid Name");
        return false
    }
    if (reg.test(FullName) === true) {

        return true
    }

}