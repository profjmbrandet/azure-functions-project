# Azure Functions - Integração com Azure Storage e CosmosDB

Este repositório contém um conjunto de **Azure Functions** para demonstrar como realizar a integração entre **Azure Functions**, **Azure Storage Account** e **Azure Cosmos DB**. O projeto abrange as seguintes funcionalidades:

1. **Criar uma infraestrutura em nuvem (Azure)**.
2. **Criar uma Azure Function para salvar arquivos no Azure Storage Account**.
3. **Criar uma Azure Function para salvar registros no Cosmos DB**.
4. **Criar uma Azure Function para filtrar registros no Cosmos DB**.
5. **Criar uma Azure Function para listar registros no Cosmos DB**.

## Tecnologias Utilizadas

- **Azure Functions**
- **Azure Storage Account**
- **Azure Cosmos DB**
- **Node.js / Python** (dependendo da sua preferência de linguagem)
- **Azure CLI** para criação da infraestrutura
- **Azure SDKs** para interação com os serviços da Azure

## Estrutura do Projeto

- `src/`: Contém as funções do Azure.
- `requirements.txt`: Lista de dependências para instalar pacotes Python (caso você esteja usando Python).
- `function.json`: Arquivo de configuração de cada função.

## Como Configurar

1. **Criar a Infraestrutura na Azure**:

    - Use o Azure CLI ou o Portal para criar os recursos necessários:
      - **Storage Account**
      - **Cosmos DB** (com a API SQL)

2. **Deploy das Functions**:

    - Para cada uma das funções, você pode configurar a **Azure Function App** e configurar os arquivos de código.

## Funcionalidades

### 1. **Criando uma Azure Function para Salvar Arquivos no Storage Account**

Esta Azure Function recebe um arquivo e o armazena no **Azure Blob Storage**.

### 2. **Criando uma Azure Function para Salvar no Cosmos DB**

Esta Azure Function recebe dados e os salva no **Cosmos DB**.

### 3. **Criando uma Azure Function para Filtrar Registros no Cosmos DB**

Esta função realiza consultas ao **Cosmos DB** com base em um critério de filtro (por exemplo, ID ou nome).

### 4. **Criando uma Azure Function para Listar Registros no Cosmos DB**

Esta função lista todos os registros armazenados no **Cosmos DB**.

---

### 2. **Código das Azure Functions**

Aqui está um exemplo de como o código pode ser estruturado.

#### 2.1 **Função para Salvar Arquivos no Azure Storage** (`src/Function_CreateStorageFile/index.js`)

Esta função vai armazenar arquivos recebidos via HTTP no **Blob Storage**.

```javascript
const { BlobServiceClient } = require("@azure/storage-blob");

module.exports = async function (context, req) {
    const fileContent = req.body;
    const containerName = 'arquivos';
    const blobName = req.query.filename || 'file.txt';

    // Credenciais do Azure Storage Account
    const connectionString = process.env['AzureWebJobsStorage'];

    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.upload(fileContent, fileContent.length);

    context.res = {
        status: 200,
        body: `Arquivo ${blobName} salvo com sucesso no Storage!`
    };
};
