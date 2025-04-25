let buttonCalculateData = document.getElementById("buttonCalculate");
let table = document.getElementById("table");

let balance;
let interestPorcent;
let time;
let interestSumatory;
let capitalPaymentSumatory;
let monthlyPaymentSumatory;
let variable;
let repeat;
let newInterest;

let cadena = [];
let month;
let balanceP;

buttonCalculateData.onclick = ShowData;

function ShowData(){

    balance = document.getElementById("balance").value;
    interestPorcent = (document.getElementById("interestPorcent").value)/100;
    time = document.getElementById("time").value;
    variable = document.getElementById("fixedOrVariable").value;
    console.log(variable);
    balanceP = balance;
    if(variable == 1){
        repeat = 0;
    }

    completeData();
    if(variable == 0){
        repeat = 1;
        completeData();
    }
}

function completeData(){

    if(repeat == 1){
        newInterest = Math.ceil(interestSumatory/time);
        balance = balanceP;
    }

    month = 0;
    interestSumatory = 0;
    capitalPaymentSumatory = 0;
    monthlyPaymentSumatory = 0;
    

    while(table.rows.length > 1){
        table.deleteRow(1); 
    }   

    let tr0 = document.createElement("tr");
    for(let rep=0; rep<4; rep++){
        let th0 = document.createElement("td")
        th0.textContent = "-";
        tr0.appendChild(th0);
    }

    let th0Balance = document.createElement("td")
    th0Balance.textContent = balance;
    tr0.appendChild(th0Balance);
    document.getElementById("tableBody").appendChild(tr0);

    while(balance > 0){
        calculateData();
    }
    totalSumatory();
}

function calculateData(){
    let tr = document.createElement("tr");
    let thMonth = document.createElement("td");
    thMonth.textContent = ++month;
    tr.appendChild(thMonth);
    let thInterest = document.createElement("td");
    let interest = Math.ceil((balance*interestPorcent)/time);
    if(repeat == 1){
        interest = newInterest;
    }
    thInterest.textContent = interest;
    interestSumatory += interest;
    tr.appendChild(thInterest);
    let thCapitalPayment = document.createElement("td");
    let capitalPayment = Math.ceil(balanceP/time);
    if(balance - capitalPayment < 0){
        capitalPayment += balance - capitalPayment;
    }
    thCapitalPayment.textContent = capitalPayment;
    capitalPaymentSumatory += capitalPayment;
    tr.appendChild(thCapitalPayment);
    let thMonthlyPayment = document.createElement("td");
    const monthlyPayment = interest + capitalPayment;
    thMonthlyPayment.textContent = monthlyPayment;
    monthlyPaymentSumatory += monthlyPayment;
    tr.appendChild(thMonthlyPayment);
    let thBalance = document.createElement("td");
    balance-= capitalPayment;
    thBalance.textContent = balance;
    tr.appendChild(thBalance);
    document.getElementById("tableBody").appendChild(tr);
}

function totalSumatory(){
    let trF = document.createElement("tr");
    
    let tdEmpty = document.createElement("td");
    tdEmpty.textContent = "Total";
    trF.appendChild(tdEmpty);
    
    let tdInterest = document.createElement("td");
    tdInterest.textContent = interestSumatory;
    trF.appendChild(tdInterest);
    
    let tdCapital = document.createElement("td");
    tdCapital.textContent = capitalPaymentSumatory;
    trF.appendChild(tdCapital);
    
    let tdMonthly = document.createElement("td");
    tdMonthly.textContent = monthlyPaymentSumatory;
    trF.appendChild(tdMonthly);
    
    let tdEmpty2 = document.createElement("td");
    tdEmpty2.textContent = "-";
    trF.appendChild(tdEmpty2);
    
    document.getElementById("tableBody").appendChild(trF);
}

async function exportarPDF() {
    const { jsPDF } = window.jspdf;

    // Capturar la tabla como imagen usando html2canvas
    const canvas = await html2canvas(document.getElementById("contenedor"), {
        ignoreElements: (element) => element.id === "ignorar" // Ignorar el div con el párrafo
      });
    const imgData = canvas.toDataURL("image/png");
    
    const pdf = new jsPDF();

    // Configurar dimensiones de la imagen y del PDF
    const imgWidth = 190; // Ancho de la imagen en el PDF
    const pageHeight = pdf.internal.pageSize.height; // Altura de la página
    const imgHeight = (canvas.height * imgWidth) / canvas.width; // Altura proporcional de la imagen

    let position = 0; // Posición inicial de la imagen en el PDF
    while (position < imgHeight) {
        pdf.addImage(imgData, "PNG", 10, -position, imgWidth, imgHeight);
        position += pageHeight; // Avanzar a la siguiente página
        if (position < imgHeight) pdf.addPage(); // Agregar nueva página
    }


    pdf.save("tabla.pdf");
  }
