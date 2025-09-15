const { CosmosClient } = require('@azure/cosmos');

module.exports = async function (context, req) {
    const cosmosEndpoint = process.env['COSMOS_DB_ENDPOINT'];
    const cosmosKey = process.env['COSMOS_DB_KEY'];
    const client = new CosmosClient({ endpoint: cosmosEndpoint, key: cosmosKey });
    const database = client.database('meuDatabase');
    const container = database.container('meuContainer');

    const record = req.body;

    try {
        const { resource: createdItem } = await container.items.create(record);
        context.res = {
            status: 201,
            body: `Registro criado: ${createdItem.id}`
        };
    } catch (error) {
        context.res = {
            status: 500,
            body: `Erro ao criar registro: ${error.message}`
        };
    }
};
