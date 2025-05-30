# Eurovisão - Teste

## 1. Modificações no dataset

- O campo `id` foi renomeado para `_id` para adequar ao padrão do MongoDB.
- As chaves externas do objeto foram removidas, transformando o dataset em um array JSON (`jsonArray`), facilitando a importação.

## 2. Comandos para importar o dataset no MongoDB (Docker)

```bash
# Copiar o arquivo para dentro do container mongoEW
docker cp dataset_novo.json mongoEW:/tmp

# Importar o dataset no banco 'eurovisao', coleção 'edicoes'
mongoimport -d eurovisao -c edicoes /tmp/dataset_novo.json --jsonArray
```
## 3. Conteúdo do repositório

- [Dataset importado no MongoDB](./ex1/dataset_novo.json)
- Arquivo de queries: [queries.txt](./ex1/queries.txt)
- Pasta [ex1](./ex1) (API / backend)
- Pasta [ex2](./ex2) (Frontend)



## 4. Como executar a aplicação
### Instruções de Execução,
- Pré-requisitos
- Node.js
- MongoDB
- NPM

### Backend (API Eurovisão)
Num terminal correr:

```bash
cd ex1/apiEuroVisao
npm install
npm start
```

Noutro terminal em paralelo correr:
```bash
cd ex3/eurovisao
npm install
npm start
```

