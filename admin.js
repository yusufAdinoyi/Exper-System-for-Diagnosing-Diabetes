let updatedName;
let deletedSicknessName;
class Sickness {
  constructor(name, symptomOne, symptomTwo, symptomThree, prevention, drugs) {
      this.name = name;
      this.symptomOne = symptomOne;
      this.symptomTwo = symptomTwo;
      this.symptomThree = symptomThree;
      this.prevention = prevention;
      this.drugs = drugs;
  }
}

// UI Class
class UI{
  addSicknessessToList(sickness){
    const tbody = document.querySelector('#table-body');
    const row = document.createElement('tr');
    row.innerHTML = `
    <td id="tdId">${sickness.name}</td>
    <td>${sickness.drugs}</td>
    <td>${sickness.symptomOne}</td>
    <td><a href="#" class="update" data-bs-toggle="modal" data-bs-target="#update"><i class="icon-edit"></i></a></td>
    <td><a href="#" class = "delete delete-item" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="icon-trash"></i></a></td>
    `;
    tbody.appendChild(row);
  }
  static showAlert(msg, className) {
    const div = document.getElementById("alert-box")
    div.className = `alert ${className}`;
    div.innerText = msg
    setTimeout(() => {
        document.querySelector("#alert-box").className = ""
        document.querySelector("#alert-box").innerText = "";
    }, 3000);
}
  static showAlertUpdate(msg, className) {
    const div = document.getElementById("alert-box-update")
    div.className = `alert ${className}`;
    div.innerText = msg
    setTimeout(() => {
        document.querySelector("#alert-box-update").className = ""
        document.querySelector("#alert-box-update").innerText = "";
    }, 3000);
}

static clearField(){
  document.querySelector('#sickness-name').value = ''
  document.querySelector('#sickness-symptom-one').value = ''
  document.querySelector('#sickness-symptom-two').value = ''
  document.querySelector('#sickness-symptom-three').value = ''
  document.querySelector('#sickness-prevention').value = ''
  document.querySelector('#sickness-drugs').value = ''
}
}

class StoreLs{
    static getSicknessess() {
      let sicknessess;
      if(localStorage.getItem('sicknessess') === null) {
        sicknessess = [];
      } else {
        sicknessess = JSON.parse(localStorage.getItem('sicknessess'));
      }
  
      return sicknessess;
    }
  
    static displaySicknessess() {
      const sicknessess = StoreLs.getSicknessess();
  
      sicknessess.forEach(function(sickness){
        const ui  = new UI;

      // Add sickness to UI
      ui.addSicknessessToList(sickness);
      });
    }
  
    static checkSickness(sickness) {
      const sicknessess = StoreLs.getSicknessess();
      if(sicknessess.length !== 0){
        for(let i = 0; i < sicknessess.length; i++){
          const currentSicknessess = sicknessess[i];
          if(currentSicknessess.name === sickness.name){
            UI.showAlert('Product ID or Name Must not be duplicate', 'error')
            break;
          }
          if(i === sicknessess.length - 1){
            StoreLs.addSickness(sickness);
            const ui = new UI;
            ui.addSicknessessToList(sickness);
            UI.clearField();
          }
      }
    }
    else{
      StoreLs.addSickness(sickness);
      const ui = new UI;
      ui.addSicknessessToList(sickness);
      UI.clearField();
    }
    }
  static addSickness(sickness){
    const sicknessess = StoreLs.getSicknessess();
    sicknessess.push(sickness);
    localStorage.setItem('sicknessess', JSON.stringify(sicknessess));
    UI.showAlert('Sickness Added Successfully', 'success')
  }
}
document.querySelector('#sickness-form').addEventListener('submit', sicknessForm);

function sicknessForm(e){
  e.preventDefault()
  const name = document.querySelector('#sickness-name').value;
  const symptomOne = document.querySelector('#sickness-symptom-one').value;
  const symptomTwo = document.querySelector('#sickness-symptom-two').value;
  const symptomThree = document.querySelector('#sickness-symptom-three').value;
  const sicknessPrevention = document.querySelector('#sickness-prevention').value;
  const sicknessDrugs = document.querySelector('#sickness-drugs').value;
 
  const sickness = new Sickness(name, symptomOne,symptomTwo, symptomThree, sicknessPrevention, sicknessDrugs);
  
  if(name ==='' || symptomOne === '' || symptomTwo === '' || symptomThree === '' || sicknessPrevention === '' || sicknessDrugs === ''){
    UI.showAlert("Please fill in all field", "error");
        return false;
    } else {
    StoreLs.checkSickness(sickness);
    }
}

// delete event
document.querySelector('#table-body').addEventListener('click',function(e){
  if(e.target.parentElement.className === 'update'){
    const updateName = e.target.parentElement.parentElement.parentElement.children[0].textContent;
    updatedName = updateName;
    const sicknessess = StoreLs.getSicknessess();
    sicknessess.forEach(function(sickness){
      if(sickness.name === updateName){
        document.querySelector('#update-name').value = sickness.name;
        document.querySelector('#update-symptom-one').value = sickness.symptomOne;
        document.querySelector('#update-symptom-two').value = sickness.symptomTwo;
        document.querySelector('#update-symptom-three').value = sickness.symptomThree;
        document.querySelector('#update-prevention').value = sickness.prevention;
        document.querySelector('#update-drugs').value = sickness.drugs;
      }
    })
  }else if(e.target.parentElement.classList.contains('delete-item')){
        const deleteSicknessName = e.target.parentElement.parentElement.parentElement.children[0].textContent;
        const alertMessageBox = document.querySelector('#alert-message-box');
        alertMessageBox.textContent = `Are you sure you want to delete ${deleteSicknessName}?`
        deletedSicknessName = deleteSicknessName;
      }
  e.preventDefault();
})

document.querySelector('#update-form').addEventListener('submit', function(e){
  e.preventDefault()
  const newUpdateName = document.querySelector('#update-name').value;
  const newUpdateSymptomOne = document.querySelector('#update-symptom-one').value;
  const newUpdateSymptomTwo = document.querySelector('#update-symptom-two').value;
  const newUpdateSymptomThree = document.querySelector('#update-symptom-three').value;
  const newUpdatePrevention = document.querySelector('#update-prevention').value;
  const newUpdateDrugs = document.querySelector('#update-drugs').value;
  const lsDatas = StoreLs.getSicknessess();
  for(let i = 0; i < lsDatas.length; i++ ){
    currentLsData = lsDatas[i];
    if(currentLsData.name === updatedName){
      currentLsData.name = newUpdateName;
      currentLsData.symptomOne = newUpdateSymptomOne;
      currentLsData.symptomTwo = newUpdateSymptomTwo;
      currentLsData.symptomThree = newUpdateSymptomThree;
      currentLsData.prevention = newUpdatePrevention;
      currentLsData.drugs = newUpdateDrugs;
      let counter = 0;
      lsDatas.forEach((item)=>{
        if(item.name === newUpdateName){
          counter ++;
        }
      })
      if(counter === 1){
        localStorage.setItem('sicknessess', JSON.stringify(lsDatas))
        UI.showAlertUpdate('sickness Updated Successfully', 'success');
        setTimeout(function(){window.location.reload();},3000)
      }else{
        UI.showAlertUpdate("You cant't update to already exist sickness name", 'error')
      }
    }
  }
})

// delete product
document.querySelector('#delete-product-btn').addEventListener('click', function(e){
  // UI.deleteFromUI();
  const lsDatas = StoreLs.getSicknessess();
  lsDatas.forEach(function(item, index){
    if(item.name === deletedSicknessName) {
     lsDatas.splice(index, 1);
    }
   });
   document.querySelector('#alert-message-box').textContent = 'Deleted';
   localStorage.setItem('sicknessess', JSON.stringify(lsDatas))
   setTimeout(function(){window.location.reload();},1000);
})
// Dom content loaded
document.addEventListener('DOMContentLoaded', StoreLs.displaySicknessess);

// listen to view saved reciept button
document.querySelector('#add-sickness-button').addEventListener('click', (e)=>{
  document.querySelector('#addProduct').style.display = 'block';
  document.querySelector('#tableContainer').style.display = 'none';
  e.preventDefault()
})
document.querySelector('#view-sickness-button').addEventListener('click', (e)=>{
  document.querySelector('#addProduct').style.display = 'none';
  document.querySelector('#tableContainer').style.display = 'block';
  e.preventDefault()
})