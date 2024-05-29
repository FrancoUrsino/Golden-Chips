// Paso 1: Registro de Usuario
var username = localStorage.getItem('username');
if (!username) {
  username = prompt("Por favor, ingresa tu nombre:");
  localStorage.setItem('username', username);
}

document.getElementById('welcome').innerHTML = `<p>Bienvenido ${username}, ¿qué deseas realizar?</p>`;
console.log(`Bienvenido ${username}, ¿qué deseas realizar?`);

// Función para mostrar el botón de "Volver al inicio"
function showRestartButton() {
  document.getElementById('result').innerHTML += '<br><br><button onclick="restart()">Volver al inicio</button>';
}

// Función para reiniciar la aplicación sin pedir el nombre nuevamente
function restart() {
  document.getElementById('result').innerHTML = '';
  document.getElementById('options').style.display = 'block';
}

// Función para validar números
function validateNumber(value) {
  if (isNaN(value) || value === '') {
    return false;
  }
  return true;
}

// Función para agregar simulación al historial y guardarla en localStorage
function addSimulationToHistory(title, content) {
  const historyList = document.getElementById('historyList');
  const listItem = document.createElement('li');
  listItem.innerHTML = `<strong>${title}:</strong> ${content}`;
  historyList.appendChild(listItem);

  // Guardar en localStorage
  let history = JSON.parse(localStorage.getItem('history')) || [];
  history.push({ title: title, content: content });
  localStorage.setItem('history', JSON.stringify(history));
}

// Función para mostrar gráficos
function showChart(title, labels, data, canvasId) {
  const ctx = document.getElementById(canvasId).getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: title,
        data: data,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// Cargar historial desde localStorage
function loadHistory() {
  let history = JSON.parse(localStorage.getItem('history')) || [];
  const historyList = document.getElementById('historyList');
  history.forEach(entry => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `<strong>${entry.title}:</strong> ${entry.content}`;
    historyList.appendChild(listItem);
  });
}

// Inicializar historial al cargar la página
loadHistory();

// Paso 2: Opciones de planificación financiera
document.getElementById('option1').addEventListener('click', function() {
  document.getElementById('options').style.display = 'none';

  const resultHTML = `
    <h2>Plan de ahorro 50/30/20</h2>
    <label for="income">Ingresos mensuales:</label>
    <input type="number" id="income"><br><br>
    <button id="calculateOption1">Calcular</button>
    <div id="resultOption1"></div>
  `;

  document.getElementById('result').innerHTML = resultHTML;

  document.getElementById('calculateOption1').addEventListener('click', function() {
    const income = document.getElementById('income').value;

    if (!validateNumber(income)) {
      alert('Por favor, ingresa un valor numérico válido para los ingresos mensuales.');
      return;
    }

    const needs = income * 0.50;
    const wants = income * 0.30;
    const savings = income * 0.20;

    const resultOption1HTML = `
      <p>Ingresos mensuales: $${income}</p>
      <p>Necesidades (50%): $${needs}</p>
      <p>Gustos (30%): $${wants}</p>
      <p>Ahorros (20%): $${savings}</p>
      <canvas id="chart1"></canvas>
    `;

    document.getElementById('resultOption1').innerHTML = resultOption1HTML;

    showRestartButton();

    addSimulationToHistory('Plan de ahorro 50/30/20', `Ingresos: $${income}, Necesidades: $${needs}, Gustos: $${wants}, Ahorros: $${savings}`);

    showChart('Plan de ahorro 50/30/20', ['Necesidades', 'Gustos', 'Ahorros'], [needs, wants, savings], 'chart1');
  });
});

document.getElementById('option2').addEventListener('click', function() {
  document.getElementById('options').style.display = 'none';

  const resultHTML = `
    <h2>Balance general de finanzas</h2>
    <label for="income">Ingresos mensuales:</label>
    <input type="number" id="income"><br><br>
    <label for="expenses">Gastos mensuales:</label>
    <input type="number" id="expenses"><br><br>
    <label for="savings">Ahorros actuales:</label>
    <input type="number" id="savings"><br><br>
    <label for="investments">Inversiones actuales:</label>
    <input type="number" id="investments"><br><br>
    <button id="calculateOption2">Calcular</button>
    <div id="resultOption2"></div>
  `;

  document.getElementById('result').innerHTML = resultHTML;

  document.getElementById('calculateOption2').addEventListener('click', function() {
    const income = document.getElementById('income').value;
    const expenses = document.getElementById('expenses').value;
    const savings = document.getElementById('savings').value;
    const investments = document.getElementById('investments').value;

    if (!validateNumber(income) || !validateNumber(expenses) || !validateNumber(savings) || !validateNumber(investments)) {
      alert('Por favor, asegúrate de ingresar números en todos los campos.');
      return;
    }

    const balance = income - expenses;
    const totalAssets = parseFloat(savings) + parseFloat(investments);

    const resultOption2HTML = `
      <p>Ingresos mensuales: $${income}</p>
      <p>Gastos mensuales: $${expenses}</p>
      <p>Ahorros actuales: $${savings}</p>
      <p>Inversiones actuales: $${investments}</p>
      <p>Balance Mensual: $${balance}</p>
      <p>Total de Activos: $${totalAssets}</p>
      <canvas id="chart2"></canvas>
    `;

    document.getElementById('resultOption2').innerHTML = resultOption2HTML;

    showRestartButton();

    addSimulationToHistory('Balance general de finanzas', `Ingresos: $${income}, Gastos: $${expenses}, Ahorros: $${savings}, Inversiones: $${investments}, Balance: $${balance}, Total de Activos: $${totalAssets}`);

    showChart('Balance general de finanzas', ['Ingresos', 'Gastos', 'Ahorros', 'Inversiones'], [income, expenses, savings, investments], 'chart2');
  });
});

document.getElementById('option3').addEventListener('click', function() {
  document.getElementById('options').style.display = 'none';

  const resultHTML = `
    <h2>Plan para ahorrar para la compra de un objeto</h2>
    <label for="item">Objeto a comprar:</label>
    <input type="text" id="item"><br><br>
    <label for="itemPrice">Precio del objeto:</label>
    <input type="number" id="itemPrice"><br><br>
    <label for="savingsOption3">Ahorros actuales:</label>
    <input type="number" id="savingsOption3"><br><br>
    <label for="goalPeriod">Meses para ahorrar:</label>
    <input type="number" id="goalPeriod"><br><br>
    <button id="calculateOption3">Calcular</button>
    <div id="resultOption3"></div>
  `;

  document.getElementById('result').innerHTML = resultHTML;

  document.getElementById('calculateOption3').addEventListener('click', function() {
    const item = document.getElementById('item').value;
    const itemPrice = document.getElementById('itemPrice').value;
    const savings = document.getElementById('savingsOption3').value;
    const goalPeriod = document.getElementById('goalPeriod').value;

    if (!validateNumber(itemPrice) || !validateNumber(savings) || !validateNumber(goalPeriod)) {
      alert('Por favor, asegúrate de ingresar números en todos los campos.');
      return;
    }

    const monthlySavings = (parseFloat(itemPrice) - parseFloat(savings)) / parseInt(goalPeriod);

    const resultOption3HTML = `
      <p>Objeto a comprar: ${item}</p>
      <p>Precio del objeto: $${itemPrice}</p>
      <p>Ahorros actuales: $${savings}</p>
      <p>Meses para ahorrar: ${goalPeriod}</p>
      <p>Ahorro mensual necesario: $${monthlySavings.toFixed(2)}</p>
      <canvas id="chart3"></canvas>
    `;

    document.getElementById('resultOption3').innerHTML = resultOption3HTML;

    showRestartButton();

    addSimulationToHistory(`Plan para ahorrar para ${item}`, `Precio: $${itemPrice}, Ahorros: $${savings}, Período: ${goalPeriod} meses,
    Ahorro mensual: $${monthlySavings.toFixed(2)}`);

    showChart(`Plan para ahorrar para ${item}`, ['Ahorros actuales', 'Ahorro mensual necesario'], [parseFloat(savings), monthlySavings], 'chart3');
  });
});

// Función para mostrar el botón de "Volver al inicio"
function showRestartButton() {
  document.getElementById('result').innerHTML += '<br><br><button onclick="restart()">Volver al inicio</button>';
}

// Función para reiniciar la aplicación sin pedir el nombre nuevamente
function restart() {
  document.getElementById('result').innerHTML = '';
  document.getElementById('options').style.display = 'block';
}

// Función para validar números
function validateNumber(value) {
  if (isNaN(value) || value === '') {
    return false;
  }
  return true;
}

// Función para agregar simulación al historial y guardarla en localStorage
function addSimulationToHistory(title, content) {
  const historyList = document.getElementById('historyList');
  const listItem = document.createElement('li');
  listItem.innerHTML = `<strong>${title}:</strong> ${content}`;
  historyList.appendChild(listItem);

  // Guardar en localStorage
  let history = JSON.parse(localStorage.getItem('history')) || [];
  history.push({ title: title, content: content });
  localStorage.setItem('history', JSON.stringify(history));
}

// Función para mostrar gráficos
function showChart(title, labels, data, canvasId) {
  const ctx = document.getElementById(canvasId).getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: title,
        data: data,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// Cargar historial desde localStorage
function loadHistory() {
  let history = JSON.parse(localStorage.getItem('history')) || [];
  const historyList = document.getElementById('historyList');
  history.forEach(entry => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `<strong>${entry.title}:</strong> ${entry.content}`;
    historyList.appendChild(listItem);
  });
}

// Inicializar historial al cargar la página
loadHistory();