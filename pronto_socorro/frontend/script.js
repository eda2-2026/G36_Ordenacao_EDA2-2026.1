const API = 'http://localhost:3001';
let gravSel = 'vermelho';

// ──────────────────────────────────────────
// RELÓGIO
// ──────────────────────────────────────────
function atualizarRelogio() {
  document.getElementById('relogio').textContent =
    new Date().toLocaleTimeString('pt-BR');
}
setInterval(atualizarRelogio, 1000);
atualizarRelogio();

// ──────────────────────────────────────────
// SELEÇÃO DE GRAVIDADE
// ──────────────────────────────────────────
function selGrav(g) {
  gravSel = g;
  document.getElementById('g-r').className = 'gbtn' + (g === 'vermelho' ? ' sr' : '');
  document.getElementById('g-y').className = 'gbtn' + (g === 'amarelo'  ? ' sy' : '');
  document.getElementById('g-g').className = 'gbtn' + (g === 'verde'    ? ' sg' : '');
}

// ──────────────────────────────────────────
// FETCH UTILITÁRIO
// ──────────────────────────────────────────
async function apiFetch(path, opts = {}) {
  try {
    const res  = await fetch(API + path, opts);
    const data = await res.json();
    setApiStatus(true);
    return { ok: res.ok, data };
  } catch (e) {
    setApiStatus(false);
    setLog('<span class="err">⚠ Backend offline. Rode: npm start na pasta backend.</span>');
    return { ok: false, data: null };
  }
}

function setApiStatus(online) {
  const el = document.getElementById('api-status');
  el.textContent  = online ? 'API OK' : 'API OFFLINE';
  el.className    = 'api-status ' + (online ? 'api-ok' : 'api-err');
}

// ──────────────────────────────────────────
// CARREGAR FILA
// ──────────────────────────────────────────
async function carregarFila() {
  const { ok, data } = await apiFetch('/pacientes');
  if (!ok || !data) return;
  setLog(`Sistema online. <span class="inf">${data.total} paciente(s)</span> na fila.`);
  renderFila(data.pacientes);
}

// ──────────────────────────────────────────
// ADMITIR PACIENTE
// ──────────────────────────────────────────
async function admitirPaciente() {
  const nome        = document.getElementById('i-nome').value.trim();
  const idade       = parseInt(document.getElementById('i-idade').value);
  const queixa      = document.getElementById('i-queixa').value.trim();
  const chegada_min = parseInt(document.getElementById('i-chegada').value);

  if (!nome || isNaN(idade) || !queixa || isNaN(chegada_min)) {
    setLog('<span class="err">⚠ Preencha todos os campos.</span>');
    return;
  }

  const { ok, data } = await apiFetch('/pacientes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, idade, queixa, chegada_min, gravidade: gravSel })
  });

  if (!ok) return;

  // Limpa formulário
  document.getElementById('i-nome').value    = '';
  document.getElementById('i-idade').value   = '';
  document.getElementById('i-queixa').value  = '';
  document.getElementById('i-chegada').value = '';

  setLog(`<span class="ok">✔ Paciente "${data.paciente.nome}" admitido. ID #${data.paciente.id}.</span>`);
  hideTag();
  hidePasses();
  carregarFila();
}

// ──────────────────────────────────────────
// ORDENAR (BUBBLE / SELECTION)
// ──────────────────────────────────────────
async function ordenar(tipo) {
  const { ok, data } = await apiFetch(`/ordenar/${tipo}`);
  if (!ok || !data) return;

  const tag = document.getElementById('atag');

  if (tipo === 'bubble') {
    tag.textContent = 'BUBBLE SORT — Gravidade';
    tag.className   = 'atag atag-b';
    setLog(`<span class="warn">Bubble Sort:</span> ${data.total} pacientes, ${data.trocas} trocas. Critério: ${data.criterio}.`);
  } else {
    tag.textContent = 'SELECTION SORT — Chegada';
    tag.className   = 'atag atag-s';
    setLog(`<span class="inf">Selection Sort:</span> ${data.total} pacientes, ${data.trocas} trocas. Critério: ${data.criterio}.`);
  }

  tag.style.display = '';
  mostrarPassos(data.passos);
  renderFila(data.resultado);
}

// ──────────────────────────────────────────
// ATENDER (REMOVER)
// ──────────────────────────────────────────
async function atender(id, nome) {
  const { ok } = await apiFetch(`/pacientes/${id}`, { method: 'DELETE' });
  if (!ok) return;
  setLog(`<span class="ok">✔ Paciente "${nome}" atendido e removido da fila.</span>`);
  hidePasses();
  hideTag();
  carregarFila();
}

// ──────────────────────────────────────────
// RESETAR
// ──────────────────────────────────────────
async function resetar() {
  const { ok, data } = await apiFetch('/reset');
  if (!ok) return;
  setLog('Fila resetada com dados originais.');
  hidePasses();
  hideTag();
  renderFila(data.pacientes);
}

// ──────────────────────────────────────────
// RENDERIZAÇÃO
// ──────────────────────────────────────────
function renderFila(lista) {
  const el = document.getElementById('queue');

  if (!lista || lista.length === 0) {
    el.innerHTML = '<div class="empty">🏥 Nenhum paciente na fila.</div>';
    atualizarStats([]);
    return;
  }

  el.innerHTML = lista.map((p, i) => {
    const cor = p.gravidade === 'vermelho' ? 'r' : p.gravidade === 'amarelo' ? 'y' : 'g';
    return `
      <div class="pcard card-${cor}">
        <div class="pos-b">${i + 1}º</div>
        <div class="pinfo">
          <div class="pname">${p.nome}, ${p.idade} anos</div>
          <div class="pmeta">
            <span>⏱ ${p.chegada_min} min</span>
            <span>💬 ${p.queixa}</span>
            <span>ID #${p.id}</span>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;gap:6px;align-items:flex-end">
          <span class="pill ${p.gravidade}">${p.gravidade}</span>
          <button class="btn-atender" onclick="atender(${p.id},'${p.nome}')">✓ Atendido</button>
        </div>
      </div>`;
  }).join('');

  atualizarStats(lista);
}

function atualizarStats(lista) {
  document.getElementById('ct-r').textContent = lista.filter(p => p.gravidade === 'vermelho').length;
  document.getElementById('ct-y').textContent = lista.filter(p => p.gravidade === 'amarelo').length;
  document.getElementById('ct-g').textContent = lista.filter(p => p.gravidade === 'verde').length;
  document.getElementById('ct-t').textContent = lista.length;
}

function mostrarPassos(passos) {
  if (!passos || passos.length === 0) { hidePasses(); return; }
  document.getElementById('passos-wrap').style.display = '';
  document.getElementById('passos-box').innerHTML =
    passos.map((p, i) => `<p><span>Passo ${i + 1}:</span> ${p}</p>`).join('');
}

// ──────────────────────────────────────────
// HELPERS
// ──────────────────────────────────────────
function setLog(msg) { document.getElementById('log').innerHTML = msg; }
function hideTag()   { document.getElementById('atag').style.display = 'none'; }
function hidePasses(){ document.getElementById('passos-wrap').style.display = 'none'; }

// ──────────────────────────────────────────
// INIT
// ──────────────────────────────────────────
carregarFila();
