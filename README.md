# G36_Ordenacao_EDA2-2026.1

## Grupo 36
|Matrícula | Aluno |
| -- | -- |
| XXXXX  | Integrante 1 |
| XXXXX  | Integrante 2 |
| XXXXX  | Integrante 3 |

## Sobre 
Aplicação web de triagem para pronto-socorro que utiliza algoritmos clássicos de ordenação para gerenciar a fila de pacientes. O sistema ordena pacientes por gravidade (usando Bubble Sort) e por tempo de chegada (usando Selection Sort).

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
pronto_socorro_v2/
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
   cd G36_Ordenacao_EDA2-2026.1/pronto_socorro_v2
   ```

2. Instale as dependências do backend:
   ```bash
   cd backend
   npm install
   ```

## Como Usar

### Iniciar o Servidor Backend

```bash
cd pronto_socorro_v2/backend
npm start
```

A API rodará em: `http://localhost:3001`

### Abrir o Frontend

Abra o arquivo `frontend/index.html` em um navegador web.

Ou use um servidor local (Python):
```bash
cd pronto_socorro_v2/frontend
python -m http.server 8000
```

Acesse: `http://localhost:8000`

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
    "chegada": 20,
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

_Exemplos da interface_

## Video

_Link do vídeo de demonstração será adicionado em breve_

---

<p align="center">
  <b>Autores do Grupo 36</b>
</p>