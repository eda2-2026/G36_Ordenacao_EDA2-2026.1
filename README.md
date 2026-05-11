# G36_Ordenacao_EDA2-2026.1

## Grupo 36
|Matrícula | Aluno |
| -- | -- |
| 231026616  | Davi Emanuel Ribeiro de Oliveira |
| 202045769  | Gabriel Saraiva Canabrava |


## Sobre 
Aplicação web de triagem para pronto-socorro que utiliza algoritmos clássicos de ordenação para gerenciar a fila de pacientes. O sistema ordena pacientes por gravidade (usando Bubble Sort) e por tempo de chegada (usando Selection Sort).

## ⚡ Quick Start

```bash
# Terminal 1: Backend
cd pronto_socorro/backend
npm install
npm start

# Terminal 2: Frontend
cd pronto_socorro/frontend
python3 -m http.server 8000
```

Acesse: **`http://localhost:8000`** 🎉

## Tecnologias Utilizadas

- **Backend:** Node.js + Express.js
- **Frontend:** HTML5 + CSS3 + JavaScript (Vanilla)
- **APIs:** RESTful
- **Algoritmos:** Bubble Sort e Selection Sort

## Funcionalidades

- 📋 **Gerenciamento de Fila:** Adicionar, visualizar e remover pacientes
- 🔴 **Ordenação por Gravidade:** Bubble Sort - críticos borbulham ao topo
- ⏱️ **Ordenação por Tempo de Espera:** Selection Sort - quem esperou mais vai ao topo
- 📊 **Dashboard:** Visualização de estatísticas da fila em tempo real
- ✓ **Marcar Atendimento:** Remover pacientes da fila após atendimento
- 🔄 **Reset de Fila:** Limpar todos os pacientes

## Estrutura do Projeto

```
pronto_socorro/
├── backend/
│   ├── server.js              # API Express
│   ├── data/
│   │   └── pacientes.json     # Base de dados de pacientes
│   ├── package.json
│   └── package-lock.json
└── frontend/
    ├── index.html             # Interface principal
    ├── script.js              # Lógica JavaScript
    └── style.css              # Estilos
```

## Pré-requisitos

- Node.js 14.0+
- npm ou yarn

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/eda2-2026/G36_Ordenacao_EDA2-2026.1.git
   cd G36_Ordenacao_EDA2-2026.1
   ```

2. Instale as dependências do backend:
   ```bash
   cd pronto_socorro/backend
   npm install
   cd ../..
   ```

## Como Usar

### Passo 1: Instalar Dependências

```bash
cd pronto_socorro/backend
npm install
```

### Passo 2: Iniciar o Backend (Terminal 1)

```bash
cd pronto_socorro/backend
npm start
```

✅ Backend rodará em: **`http://localhost:3001`**

### Passo 3: Iniciar o Frontend (Terminal 2)

```bash
cd pronto_socorro/frontend
python3 -m http.server 8000
```

✅ Frontend rodará em: **`http://localhost:8000`**

Abra seu navegador e acesse: `http://localhost:8000`

## API Endpoints

| Método | Endpoint | Descrição |
| -- | -- | -- |
| GET | `/pacientes` | Lista todos os pacientes |
| POST | `/pacientes` | Adiciona novo paciente |
| DELETE | `/pacientes/:id` | Remove paciente |
| GET | `/ordenar/bubble` | Ordena por gravidade (Bubble Sort) |
| GET | `/ordenar/selection` | Ordena por tempo de chegada (Selection Sort) |
| GET | `/reset` | Reseta a fila inicial |

### Exemplo de Requisição

```bash
# Adicionar paciente
curl -X POST http://localhost:3001/pacientes \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "idade": 45,
    "queixa": "Dor no peito",
    "chegada_min": 20,
    "gravidade": "vermelho"
  }'

# Ordenar por gravidade
curl http://localhost:3001/ordenar/bubble

# Ordenar por tempo de chegada
curl http://localhost:3001/ordenar/selection
```

## Algoritmos de Ordenação

### Bubble Sort (Gravidade)
- **Complexidade:** O(n²)
- **Uso:** Ordena pacientes por nível de gravidade
- **Lógica:** Pacientes críticos (vermelho) borbulham ao topo

### Selection Sort (Tempo de Chegada)
- **Complexidade:** O(n²)
- **Uso:** Ordena pacientes por tempo de espera
- **Lógica:** Quem esperou mais tempo vai para o topo

## Screenshots

![Interface do Pronto Socorro](pronto_socorro/frontend/image/Captura%20de%20tela%202026-05-10%20203319.png)

_Exemplos da interface_

## Video

[Link do vídeo ](https://drive.google.com/file/d/1pfE6mnuN0JDR0N4Y2XpiqQG-bMv49dWM/view?usp=sharing)

---

<p align="center">
  <b>Autores do Grupo 36</b>
</p>