let storeSicknessName;
let storeSicknessPrevention;
let storeSicknessDrugs;
class UI{
  static addSicknessOnBrowserLoad(){
    const sicknessess = JSON.parse(localStorage.getItem('sicknessess'));
    sicknessess.forEach((sickness)=>{
      UI.addSickness(sickness)
    })
  }
  static addSickness(sickness){
    const tBody = document.querySelector('#table-body')
    const row = document.createElement('tr');
    row.id = 'productRow';
    row.innerHTML = `
    <td>${sickness.name}</td>
    <td><button id="diagnose-button" class="btn btn-primary btn-sm p-1 text-light">Diagnose</button></td>
    `;
    tBody.appendChild(row)
  }
}

// LISTEN TO DIAGNOSE BUTTON

document.querySelector('#table-body').addEventListener('click',function(e){
  if(e.target.id === 'diagnose-button'){
    const sicknessName = e.target.parentElement.parentElement.children[0].textContent;
    const sicknessess = JSON.parse(localStorage.getItem('sicknessess'));

    sicknessess.forEach((sickness)=>{
      if(sickness.name === sicknessName){
        document.querySelector('.symptom-one').textContent = sickness.symptomOne;
        document.querySelector('.symptom-two').textContent = sickness.symptomTwo;
        document.querySelector('.symptom-three').textContent = sickness.symptomThree;
        storeSicknessName = sickness.name;
        storeSicknessPrevention = sickness.prevention;
        storeSicknessDrugs = sickness.drugs;
      }
    })
  }
  document.querySelector('#sickness-list').style.display = 'none';
  document.querySelector('.diagnose-sickness').style.display = 'block';
  document.querySelector('.solution-panel').style.display = 'none';
  document.querySelector('#check-symptoms').style.display = 'block';
  e.preventDefault();
})
 
document.querySelector('#diagnose-sickness-button').addEventListener('click', function(e){
  const yesAnswer = document.querySelectorAll('#yes');
  
  let counter = 0;
  yesAnswer.forEach((yes)=>{
    if(yes.checked === true){
      counter ++;
    }
  })
  if(counter === 0){
    document.querySelector('.diagnose-text').textContent = `You are definitely not having ${storeSicknessName}`;
    document.querySelector('#change').textContent = `Recommendations`;
    document.querySelector('.prevention-text').textContent = `Diagnose for other disease`;
    document.querySelector('#drugs-field').style.display = 'none';
  }else if(counter ===1){
  document.querySelector('#drugs-field').style.display = 'none';
  document.querySelector('.diagnose-text').textContent = `You may not be having ${storeSicknessName}`;
  document.querySelector('.prevention-text').textContent = `Diagnose for other disease or visit a doctor`;
  }else if(counter === 2){
    document.querySelector('#drugs-field').style.display = 'block';
    document.querySelector('.diagnose-text').textContent = `You may be having ${storeSicknessName}`;
    document.querySelector('.prevention-text').textContent = `Please ${storeSicknessPrevention}`;
    document.querySelector('.drug-text').textContent = `take ${storeSicknessDrugs} for a weeks`;
  }else if(counter === 3){
    document.querySelector('#drugs-field').style.display = 'block';
    document.querySelector('.diagnose-text').textContent = `You are definitely having ${storeSicknessName}`;
    document.querySelector('.prevention-text').textContent = `Please ${storeSicknessPrevention}`;
    document.querySelector('.drug-text').textContent = `take ${storeSicknessDrugs} for 3 weeks`;
  }
  document.querySelector('#check-symptoms').style.display = 'none';
  document.querySelector('.solution-panel').style.display = 'block';
  e.preventDefault();
})

document.querySelector('#add-sickness-button').addEventListener('click', function(e){
  document.querySelector('#sickness-list').style.display = 'block';
  document.querySelector('#sickness-list').style.display = 'block';
  document.querySelector('.diagnose-sickness').style.display = 'none';
})

// insert sickness names on dom content load
document.addEventListener('DOMContentLoaded', UI.addSicknessOnBrowserLoad);
