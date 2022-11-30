class AdminSignInDetails{
  constructor(adminSignInName, adminSignInEmail, adminSignInPassword, adminSignInConfirmPassword) {
      this.adminSignInName = adminSignInName;
      this.adminSignInEmail = adminSignInEmail;
      this.adminSignInPassword = adminSignInPassword;
      this.adminSignInConfirmPassword = adminSignInConfirmPassword;
  }
}
class PatientSignInDetails{
  constructor(patientSignInName, patientSignInEmail, patientSignInPassword, patientSignInConfirmPassword) {
      this.patientSignInName = patientSignInName
      this.patientSignInEmail = patientSignInEmail;
      this.patientSignInPassword = patientSignInPassword;
      this.patientSignInConfirmPassword = patientSignInConfirmPassword;
  }
}

class UI{
  static showAlertLogin(msg, className, divSelect) {
    const div2 = document.getElementById(divSelect)
    div2.className = `alert ${className}`;
    div2.innerText = msg
    setTimeout(() => {
        document.getElementById(divSelect).className = ""
        document.getElementById(divSelect).innerText = "";
    }, 3000);
}
static clearField(){
  document.querySelector('#patient-sign-in-name').value = '';
  document.querySelector('#patient-sign-in-email').value = '';
  document.querySelector('#patient-sign-in-password').value = '';
  document.querySelector('#patient-sign-in-confirm-password').value = '';
  document.querySelector('#admin-sign-in-name').value = '';
  document.querySelector('#admin-sign-in-email').value = '';
  document.querySelector('#admin-sign-in-password').value = '';
  document.querySelector('#admin-sign-in-confirm-password').value = '';
}
}

// STORAGE SECTION
class Store{
  static getPatientSignInDetails() {
    let patientDetails;
    if(localStorage.getItem('patientDetailsTable') === null) {
      patientDetails = [];
    } else {
      patientDetails = JSON.parse(localStorage.getItem('patientDetailsTable'));
    }
    return patientDetails;
  }
  static getAdminSignInDetails() {
    let adminDetails;
    if(localStorage.getItem('adminDetailsTable') === null) {
      adminDetails = [];
    } else {
      adminDetails = JSON.parse(localStorage.getItem('adminDetailsTable'));
    }
    return adminDetails;
  }
  static addToPatientStorage(patientSignInDetails) {
    const patientDetails = Store.getPatientSignInDetails();
    patientDetails.push(patientSignInDetails);
    localStorage.setItem('patientDetailsTable', JSON.stringify(patientDetails));
    console.log(patientDetails)
  }
  static addToAdminStorage(adminSignInDetails) {
    const adminDetails = Store.getAdminSignInDetails();
    adminDetails.push(adminSignInDetails);
    localStorage.setItem('adminDetailsTable', JSON.stringify(adminDetails));
    console.log(adminDetails)
  }
}
// PATIENT SIGN IN SECTION
document.querySelector('#patient-sign-in-form').addEventListener('submit',(e)=>{
  e.preventDefault();
  const patientSignInName = document.getElementById('patient-sign-in-name').value;
  const patientSignInEmail = document.getElementById('patient-sign-in-email').value;
   const patientSignInPassword = document.getElementById('patient-sign-in-password').value;
   const patientSignInConfirmPassword =  document.getElementById('patient-sign-in-confirm-password').value;
    const patientSignInDetails = new PatientSignInDetails(patientSignInName, patientSignInEmail, patientSignInPassword, patientSignInConfirmPassword);
    const patientDetails = Store.getPatientSignInDetails();
    let counter = 0;
    patientDetails.forEach((patientDetail)=>{
      if(patientDetail.patientSignInEmail === patientSignInEmail){
        counter++;
      }
    })
  if(patientSignInName == '' || patientSignInEmail == '' || patientSignInPassword == '' || patientSignInConfirmPassword == ''){
    UI.showAlertLogin("Please fill in all field", "error", "alert-patient-sign-up");
        return false;
  }else if(patientSignInConfirmPassword !== patientSignInPassword){
    UI.showAlertLogin("Password Unmatched", "error", "alert-patient-sign-up");
    return false;
  }else if(counter !== 0){
    UI.showAlertLogin("User already exist", "error", "alert-patient-sign-up");
        return false;
  }else{
    UI.showAlertLogin("You have successfully sign up", "success", "alert-patient-sign-up");
    Store.addToPatientStorage(patientSignInDetails)
    UI.clearField()
  }
})


// PATIENT LOGIN SECTION
document.querySelector('#patient-login-form').addEventListener('submit', function(e){
  e.preventDefault();
  const patientLoginEmail = document.querySelector('#patient-login-email').value;
  const patientLoginPassword = document.querySelector('#patient-login-password').value;
  if(patientLoginEmail === '' || patientLoginPassword === ''){
    UI.showAlertLogin("Please fill in all field", "error","alert-box-login");
        return false;
  }else{
    const patientDetails = Store.getPatientSignInDetails();
    let counter = 0;
    patientDetails.forEach((patientDetail)=>{
      if(patientLoginEmail === patientDetail.patientSignInEmail && patientLoginPassword === patientDetail.patientSignInPassword){
        counter++;
      }
    })
    if(counter !== 0){
      UI.showAlertLogin("Login Successful", "success","alert-box-login");
      setTimeout(()=>{
        window.location.replace("patient.html");
      },2000)
    }else{
      UI.showAlertLogin("User not exist", "error","alert-box-login");
      return false;
    }
  }
})

// PATIENT SECURITY SECTION
document.querySelector('#patient-security-form').addEventListener('submit', (e)=>{
  e.preventDefault()
  const patientSecEmail = document.querySelector('#patient-sec-email').value;
  let seePassword = document.querySelector('#see-password');

  if(patientSecEmail === ''){
    UI.showAlertLogin("Please fill in field", "error", "alert-box-security");
        return false;
  }else{
    const patientDetails = Store.getPatientSignInDetails();
    let retrievedPassword;
    patientDetails.forEach((patientDetail)=>{
      if(patientDetail.patientSignInEmail === patientSecEmail){
        retrievedPassword = patientDetail.patientSignInPassword;
      }
    })
    if(retrievedPassword === undefined){
      seePassword.className = 'text-danger';
      seePassword.textContent = "The email you enter doesn't exist";
    }else{
      seePassword.className = 'text-success';
      seePassword.textContent = `Your password is ${retrievedPassword}`;
    }
  }
})



// ADMIN SIGN IN
document.querySelector('#admin-sign-in-form').addEventListener('submit',(e)=>{
  e.preventDefault();
  const adminSignInName = document.getElementById('admin-sign-in-name').value;
  const adminSignInEmail = document.getElementById('admin-sign-in-email').value;
   const adminSignInPassword = document.getElementById('admin-sign-in-password').value;
   const adminSignInConfirmPassword =  document.getElementById('admin-sign-in-confirm-password').value;
    const adminSignInDetails = new AdminSignInDetails(adminSignInName, adminSignInEmail, adminSignInPassword, adminSignInConfirmPassword);
    const adminDetails = Store.getAdminSignInDetails();
    let counter = 0;
    adminDetails.forEach((adminDetail)=>{
      if(adminDetail.adminSignInEmail === adminSignInEmail){
        counter++;
      }
    })
  if(adminSignInName == '' || adminSignInEmail == '' || adminSignInPassword == '' || adminSignInConfirmPassword == ''){
    UI.showAlertLogin("Please fill in all field", "error", "alert-admin-sign-in-box");
        return false;
  }else if(adminSignInConfirmPassword !== adminSignInPassword){
    UI.showAlertLogin("Password Unmatched", "error", "alert-admin-sign-in-box");
    return false;
  }else if(counter !== 0){
    UI.showAlertLogin("User already exist", "error", "alert-admin-sign-in-box");
        return false;
  }else{
    UI.showAlertLogin("You have successfully sign up", "success", "alert-admin-sign-in-box");
    Store.addToAdminStorage(adminSignInDetails)
    UI.clearField()
  }
})


// PATIENT LOGIN SECTION
document.querySelector('#admin-login-form').addEventListener('submit', function(e){
  e.preventDefault();
  const adminLoginEmail = document.querySelector('#admin-login-email').value;
  const adminLoginPassword = document.querySelector('#admin-login-password').value;
  if(adminLoginEmail === '' || adminLoginPassword === ''){
    UI.showAlertLogin("Please fill in all field", "error","alert-admin-login-box");
        return false;
  }else{
    const adminDetails = Store.getAdminSignInDetails();
    let counter = 0;
    adminDetails.forEach((adminDetail)=>{
      if(adminLoginEmail === adminDetail.adminSignInEmail && adminLoginPassword === adminDetail.adminSignInPassword){
        counter++;
      }
    })
    if(counter !== 0){
      UI.showAlertLogin("Login Successful", "success","alert-admin-login-box");
      setTimeout(()=>{
        window.location.replace("admin.html");
      },2000)
    }else{
      UI.showAlertLogin("User not exist", "error","alert-admin-login-box");
      return false;
    }
  }
})

document.querySelector('#admin-security-form').addEventListener('submit', (e)=>{
  e.preventDefault()
  const adminSecEmail = document.querySelector('#admin-sec-email').value;
  let seeAdminPassword = document.querySelector('#see-admin-password');

  if(adminSecEmail === ''){
    UI.showAlertLogin("Please fill in field", "error", "alert-admin-security-box");
        return false;
  }else{
    const adminDetails = Store.getAdminSignInDetails();
    let retrieveAdminPassword;
    adminDetails.forEach((adminDetail)=>{
      if(adminDetail.adminSignInEmail === adminSecEmail){
        retrieveAdminPassword = adminDetail.adminSignInPassword;
      }
    })
    if(retrieveAdminPassword === undefined){
      seeAdminPassword.className = 'text-danger';
      seeAdminPassword.textContent = "The email you enter doesn't exist";
    }else{
      seeAdminPassword.className = 'text-success';
      seeAdminPassword.textContent = `Your password is ${retrieveAdminPassword}`;
    }
  }
})