// Zadatak:

// Sa URL-a https://dummy.restapiexample.com/api/v1/employees dovuci sve zaposlene
// Od dobijenih podataka izgenerisati listu zaposlenih, u kojoj se prikazuju ime i zarada (html lista gde svaki <li> element sadrzi ime i zaradu zaposlenog)
// Na klik na dugme pored imena zaposlenog (dodati u li element i jedno dugme) treba obrisati listu iz HTML-a (removeChild() metoda), dovuci podatke tog zaposlenog sa URL-a https://dummy.restapiexample.com/api/v1/employee/<ID_zaposlenog> 
// i prikazati podatke samo tog jednog zaposlenog - ime, zarada i godine, kao i “link” za povratak (dugme Nazad)
// Klik na “Nazad” treba da obrise podatke zaposlenog, ponovo dovuce podatke za sve i prikaze listu

// Fajlove koje zadatak sadrzi push-ovati na neki novokreirani repo

// U nastavku je primer load funkcije koju mozete koristiti za dobavljanje podataka sa servera (linkovi su u zadatku)

var url = 'https://dummy.restapiexample.com/api/v1/employees';
var url1 = 'https://dummy.restapiexample.com/api/v1/employee'
buttonId = []
// funkcija koja dobavlja response sa servera
function load(url, callback) {
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      callback(xhr.response)
    }
  }

  xhr.open('GET', url, true);
  xhr.send('');
}
function povratakNazad(){
  let povratakNazad = document.getElementById('povratakNazad')
  povratakNazad.addEventListener('click',() => {
    document.body.innerHTML = ""
    let novaLista =document.createElement('ul')
    novaLista.id = 'list'
    novaLista.innerText= 'Zaposleni'
    document.body.appendChild(novaLista)
    pregledZaposlenih()
  })
}
function pregledZaposlenog(){
  let myButtons = document.getElementsByClassName('myBtn')
  Array.from(myButtons).forEach((ele, index) => ele.addEventListener("click", function() {
      document.getElementById("list").innerHTML = ""
      let employee= url1 + '/' + (index+1)
      
      load(employee, function(response) {
          responseData = JSON.parse(response).data 
         document.body.innerHTML = `${responseData.employee_name} ima platu u iznosu od ${responseData.employee_salary}, i ima ${responseData.employee_age} godina.<button id='povratakNazad' >Povratak nazad </button>`
         povratakNazad()
      })
  }))

}



function pregledZaposlenih(){
    load(url, function(response) {
      responseData = JSON.parse(response).data
      var listItem = document.getElementById('list')
  
          for (el of responseData) {
              var li =  document.createElement('li')
              li.innerHTML = ` ${el.employee_name} <button id=${el.id} class = myBtn >click </button> ima platu ${el.employee_salary}`
              listItem.appendChild(li)
              }
    pregledZaposlenog()
    })
  }

  
pregledZaposlenih()
       

        



 
