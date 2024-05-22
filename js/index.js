// Paso 1: Registro de Usuario
let username = localStorage.getItem('username');
if (!username) {
  username = prompt("Por favor, ingresa tu nombre:");
  localStorage.setItem('username', username);
}
document.write(`<p>Bienvenido ${username}, ¿qué deseas realizar?</p>`);
console.log(`Bienvenido ${username}, ¿qué deseas realizar?`);

// Función para mostrar el botón de "Volver al inicio"
function showRestartButton() {
  document.write('<button onclick="location.reload()">Volver al inicio</button>');
}

// Paso 2: Opciones de planificación financiera
document.write('<button id="option1">plan de ahorro 50/30/20</button>');
document.write('<button id="option2">balance general de finanzas</button>');
document.write('<br><button id="option3">plan para ahorrar a corto, medio o largo plazo para la compra de un objeto</button>');

document.getElementById('option1').addEventListener('click', function() {
  // Plan de ahorro 50/30/20
  let income = parseFloat(prompt("Por favor, ingresa tus ingresos mensuales:"));
  while (isNaN(income)) {
    income = parseFloat(prompt("No ingresaste un número, colocalo sin signos($ , .). Ingresa tus ingresos mensuales:"));
  }

  let needs = income * 0.50;
  let wants = income * 0.30;
  let savings = income * 0.20;

  document.write('<h2>Plan de ahorro 50/30/20</h2>');
  document.write(`<p>Ingresos mensuales: $${income.toFixed(2)}</p>`);
  document.write(`<p>Necesidades (50%): $${needs.toFixed(2)}</p>`);
  document.write(`<p>Gustos (30%): $${wants.toFixed(2)}</p>`);
  document.write(`<p>Ahorros (20%): $${savings.toFixed(2)}</p>`);

  showRestartButton();
});

document.getElementById('option2').addEventListener('click', function() {
  // Balance general de finanzas
  let income = parseFloat(prompt("Ingresa tus ingresos mensuales:"));
  while (isNaN(income)) {
    income = parseFloat(prompt("No ingresaste un número, colocalo sin signos($ , .). Ingresa tus ingresos mensuales:"));
  }

  let expenses = parseFloat(prompt("Por favor, ingresa tus gastos mensuales:"));
  while (isNaN(expenses)) {
    expenses = parseFloat(prompt("No ingresaste un número, colocalo sin signos($ , .). Ingresa tus gastos mensuales:"));
  }

  let hasSavings = prompt("¿Tienes ahorros actuales? Ingresa 1 para Sí o 2 para No:");
  while (hasSavings !== "1" && hasSavings !== "2") {
    hasSavings = prompt("Ingresaste una opción no válida. ¿Tienes ahorros actuales? Ingresa 1 para Sí o 2 para No:");
  }

  let savings = 0;
  if (hasSavings === "1") {
    savings = parseFloat(prompt("Por favor, ingresa tus ahorros actuales:"));
    while (isNaN(savings)) {
      savings = parseFloat(prompt("No ingresaste un número, colocalo sin signos($ , .). Ingresa tus ahorros actuales:"));
    }
  }

  let hasInvestments = prompt("¿Tienes inversiones actuales? Ingresa 1 para Sí o 2 para No:");
  while (hasInvestments !== "1" && hasInvestments !== "2") {
    hasInvestments = prompt("Ingresaste una opción no válida. ¿Tienes inversiones actuales? Ingresa 1 para Sí o 2 para No:");
  }

  let investments = 0;
  if (hasInvestments === "1") {
    investments = parseFloat(prompt("Por favor, ingresa tus inversiones actuales:"));
    while (isNaN(investments)) {
      investments = parseFloat(prompt("No ingresaste un número, colocalo sin signos($ , .). Ingresa tus inversiones actuales:"));
    }
  }

  let balance = income - expenses;
  let totalAssets = savings + investments;

  document.write('<h2>Balance general de finanzas</h2>');
  document.write(`<p>Ingresos mensuales: $${income.toFixed(2)}</p>`);
  document.write(`<p>Gastos mensuales: $${expenses.toFixed(2)}</p>`);
  document.write(`<p>Ahorros actuales: $${savings.toFixed(2)}</p>`);
  document.write(`<p>Inversiones actuales: $${investments.toFixed(2)}</p>`);
  document.write(`<p>Balance Mensual: $${balance.toFixed(2)}</p>`);
  document.write(`<p>Total de Activos: $${totalAssets.toFixed(2)}</p>`);

  showRestartButton();
});

document.getElementById('option3').addEventListener('click', function() {
  // Plan para ahorrar a corto, medio o largo plazo
  let item = prompt("¿Qué objeto deseas comprar?");
  let itemPrice = parseFloat(prompt("¿Cuál es el precio del objeto?"));
  while (isNaN(itemPrice)) {
    itemPrice = parseFloat(prompt("No ingresaste un número, colocalo sin signos($ , .). ¿Cuál es el precio del objeto?"));
  }

  let hasSavings = prompt("¿Tienes ahorros actuales? Ingresa 1 para Sí o 2 para No:");
  while (hasSavings !== "1" && hasSavings !== "2") {
    hasSavings = prompt("Ingresaste una opción no válida. ¿Tienes ahorros actuales? Ingresa 1 para Sí o 2 para No:");
  }

  let savings = 0;
  if (hasSavings === "1") {
    savings = parseFloat(prompt("Por favor, ingresa tus ahorros actuales:"));
    while (isNaN(savings)) {
      savings = parseFloat(prompt("No ingresaste un número, colocalo sin signos($ , .). Ingresa tus ahorros actuales:"));
    }
  }

  let timeframe = prompt("¿En cuántos meses deseas comprar el objeto?");
  let months = parseInt(timeframe);
  while (isNaN(months) || months <= 0) {
    timeframe = prompt("No ingresaste un número, colocalo sin signos($ , .). ¿En cuántos meses deseas comprar el objeto?");
    months = parseInt(timeframe);
  }

  let monthlySavings = (itemPrice - savings) / months;

  document.write('<h2>Plan de ahorro para compra</h2>');
  document.write(`<p>Objeto a comprar: ${item}</p>`);
  document.write(`<p>Precio del objeto: $${itemPrice.toFixed(2)}</p>`);
  document.write(`<p>Ahorros actuales: $${savings.toFixed(2)}</p>`);
  document.write(`<p>Tiempo para ahorrar: ${months} meses</p>`);
  document.write(`<p>Ahorro mensual necesario: $${monthlySavings.toFixed(2)}</p>`);

  showRestartButton();
});