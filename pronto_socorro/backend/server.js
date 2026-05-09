const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;
const DATA_FILE = path.join(__dirname, 'data', 'pacientes.json');

app.use(cors());
app.use(express.json());

// ──────────────────────────────────────────
// UTILITÁRIOS
// ──────────────────────────────────────────
function lerPacientes() {
  const raw = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(raw);
}

function salvarPacientes(lista) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(lista, null, 2));
}

const PESO_GRAVIDADE = { vermelho: 3, amarelo: 2, verde: 1 };

// ──────────────────────────────────────────
// ALGORITMOS DE ORDENAÇÃO
// ──────────────────────────────────────────

// Bubble Sort — ordena por gravidade (mais crítico no topo)
function bubbleSort(arr) {
  const lista = [...arr];
  const n = lista.length;
  let trocas = 0;
  const passos = [];

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (PESO_GRAVIDADE[lista[j].gravidade] < PESO_GRAVIDADE[lista[j + 1].gravidade]) {
        [lista[j], lista[j + 1]] = [lista[j + 1], lista[j]];
        trocas++;
        passos.push(`Troca: "${lista[j + 1].nome}" (${lista[j + 1].gravidade}) ↔ "${lista[j].nome}" (${lista[j].gravidade})`);
      }
    }
  }

  return { resultado: lista, trocas, passos };
}

// Selection Sort — ordena por tempo de espera (maior tempo no topo)
function selectionSort(arr) {
  const lista = [...arr];
  const n = lista.length;
  let trocas = 0;
  const passos = [];

  for (let i = 0; i < n - 1; i++) {
    let maxIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (lista[j].chegada_min > lista[maxIdx].chegada_min) {
        maxIdx = j;
      }
    }
    if (maxIdx !== i) {
      passos.push(`Selecionado: "${lista[maxIdx].nome}" (${lista[maxIdx].chegada_min} min) → posição ${i + 1}`);
      [lista[i], lista[maxIdx]] = [lista[maxIdx], lista[i]];
      trocas++;
    }
  }

  return { resultado: lista, trocas, passos };
}

// ──────────────────────────────────────────
// ROTAS
// ──────────────────────────────────────────

// GET /pacientes — lista todos
app.get('/pacientes', (req, res) => {
  const pacientes = lerPacientes();
  res.json({ total: pacientes.length, pacientes });
});

// POST /pacientes — adiciona paciente
app.post('/pacientes', (req, res) => {
  const { nome, idade, chegada_min, gravidade, queixa } = req.body;

  if (!nome || !idade || chegada_min === undefined || !gravidade || !queixa) {
    return res.status(400).json({ erro: 'Campos obrigatórios: nome, idade, chegada_min, gravidade, queixa' });
  }

  if (!PESO_GRAVIDADE[gravidade]) {
    return res.status(400).json({ erro: 'Gravidade deve ser: vermelho, amarelo ou verde' });
  }

  const pacientes = lerPacientes();
  const novoId = pacientes.length > 0 ? Math.max(...pacientes.map(p => p.id)) + 1 : 1;
  const novoPaciente = { id: novoId, nome, idade, chegada_min, gravidade, queixa };

  pacientes.push(novoPaciente);
  salvarPacientes(pacientes);

  res.status(201).json({ mensagem: 'Paciente admitido com sucesso', paciente: novoPaciente });
});

// DELETE /pacientes/:id — remove (atendimento concluído)
app.delete('/pacientes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  let pacientes = lerPacientes();
  const idx = pacientes.findIndex(p => p.id === id);

  if (idx === -1) return res.status(404).json({ erro: 'Paciente não encontrado' });

  const removido = pacientes.splice(idx, 1)[0];
  salvarPacientes(pacientes);

  res.json({ mensagem: `Paciente "${removido.nome}" atendido e removido da fila`, paciente: removido });
});

// GET /ordenar/bubble — ordena por gravidade
app.get('/ordenar/bubble', (req, res) => {
  const pacientes = lerPacientes();
  const { resultado, trocas, passos } = bubbleSort(pacientes);

  salvarPacientes(resultado);

  res.json({
    algoritmo: 'Bubble Sort',
    criterio: 'Gravidade (vermelho > amarelo > verde)',
    total: resultado.length,
    trocas,
    passos,
    resultado
  });
});

// GET /ordenar/selection — ordena por tempo de espera
app.get('/ordenar/selection', (req, res) => {
  const pacientes = lerPacientes();
  const { resultado, trocas, passos } = selectionSort(pacientes);

  salvarPacientes(resultado);

  res.json({
    algoritmo: 'Selection Sort',
    criterio: 'Tempo de espera (maior tempo primeiro)',
    total: resultado.length,
    trocas,
    passos,
    resultado
  });
});

// GET /reset — restaura dados originais
app.get('/reset', (req, res) => {
  const original = [
    { "id": 1, "nome": "Maria Souza",    "idade": 72, "chegada_min": 45, "gravidade": "vermelho", "queixa": "Dor no peito" },
    { "id": 2, "nome": "Pedro Lima",     "idade": 34, "chegada_min": 10, "gravidade": "verde",    "queixa": "Dor de cabeça leve" },
    { "id": 3, "nome": "Ana Costa",      "idade": 58, "chegada_min": 30, "gravidade": "amarelo",  "queixa": "Febre alta" },
    { "id": 4, "nome": "Carlos Nunes",   "idade": 5,  "chegada_min": 25, "gravidade": "vermelho", "queixa": "Convulsão" },
    { "id": 5, "nome": "Lucia Ferreira", "idade": 44, "chegada_min": 5,  "gravidade": "verde",    "queixa": "Corte superficial" },
    { "id": 6, "nome": "Roberto Alves",  "idade": 61, "chegada_min": 55, "gravidade": "amarelo",  "queixa": "Tontura e náusea" },
    { "id": 7, "nome": "Julia Martins",  "idade": 28, "chegada_min": 15, "gravidade": "verde",    "queixa": "Torção no tornozelo" },
    { "id": 8, "nome": "Antônio Ramos",  "idade": 80, "chegada_min": 40, "gravidade": "vermelho", "queixa": "Falta de ar grave" }
  ];
  salvarPacientes(original);
  res.json({ mensagem: 'Dados restaurados com sucesso', pacientes: original });
});

app.listen(PORT, () => {
  console.log(`✅ Pronto Socorro API rodando em http://localhost:${PORT}`);
  console.log(`   GET  /pacientes`);
  console.log(`   POST /pacientes`);
  console.log(`   GET  /ordenar/bubble`);
  console.log(`   GET  /ordenar/selection`);
  console.log(`   DELETE /pacientes/:id`);
  console.log(`   GET  /reset`);
});
