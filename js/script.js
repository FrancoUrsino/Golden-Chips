// Paso 1: Registro de Usuario

const username = prompt('Por favor, escribe tu nombre de usuario:');
document.write(`<p>Bienvenido, ${username}!</p>`);

// Paso 2: Simulador Financiero
// Solicitar datos financieros mediante prompts
let income = parseFloat(prompt('escribe tu ingreso mensual:'));
while (isNaN(income)) {
  income = parseFloat(prompt('Escribiste un valor no válido. Escribe tu ingreso mensual:'));
}

let expenses = parseFloat(prompt('Escribe el total de tus gastos mensuales:'));
while (isNaN(expenses)) {
  expenses = parseFloat(prompt('Escribiste un valor no válido. Escribe tus gastos mensuales:'));
}

let savings = parseFloat(prompt('Escribe tus ahorros actuales, si no tenes colocá 0:'));
while (isNaN(savings)) {
  savings = parseFloat(prompt('Escribiste un valor no válido. Escribe tus ahorros actuales:'));
}

let hasInvestments = prompt('¿Tienes inversiones actuales? Escribe 1 para Sí o 2 para No:');
while (hasInvestments !== '1' && hasInvestments !== '2') {
  hasInvestments = prompt('Escribiste una opción inválida. ¿Tienes inversiones actuales? escribe 1 para Sí o 2 para No:');
}

let investments = 0;
if (hasInvestments === '1') {
  investments = parseFloat(prompt('Escriba tus inversiones actuales:'));
  while (isNaN(investments)) {
    investments = parseFloat(prompt('Escribiste un valor incorrecto. Escribe tus inversiones actuales:'));
  }
}

// Mostrar los datos ingresados
document.write(`<h2>${username} debajo se verán los datos ingresados</h2>`);
document.write('<p>Ingresos mensuales: $' + income.toFixed(2) + '</p>');
document.write('<p>Gastos mensuales: $' + expenses.toFixed(2) + '</p>');
document.write('<p>Ahorros actuales: $' + savings.toFixed(2) + '</p>');
if (hasInvestments === '1') {
  document.write('<p>Inversiones actuales: $' + investments.toFixed(2) + '</p>');
} else {
  document.write('<p>No tienes inversiones actuales.</p>');
}

document.write('<button id="calculate-button">Calcular</button>');

// Paso 3: Mostrar Resultados
document.getElementById('calculate-button').addEventListener('click', function() {

  let balance = income - expenses;
  let totalAssets = savings + investments;
  
  // Mostrar resultados
  document.write(`<h2>${username} ¡Estos son tus resultados!</h2>`);
  document.write('<p>Ingresos mensuales: $' + income.toFixed(2) + '</p>');
  document.write('<p>Gastos mensuales: $' + expenses.toFixed(2) + '</p>');
  document.write('<p>Ahorros actuales: $' + savings.toFixed(2) + '</p>');
  if (hasInvestments === '1') {
    document.write('<p>Inversiones actuales: $' + investments.toFixed(2) + '</p>');
  }
  document.write('<p>Balance Mensual: $' + balance.toFixed(2) + '</p>');
  document.write('<p>Total de Activos: $' + totalAssets.toFixed(2) + '</p>');
});