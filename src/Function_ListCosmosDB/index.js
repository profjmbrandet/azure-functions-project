const { CosmosClient } = require('@azure/cosmos');

module.exports = async function (context, req) {
    const cosmosEndpoint = process.env['COSMOS_DB_ENDPOINT'];
    const cosmosKey = process.env['COSMOS_DB_KEY'];
    const client = new CosmosClient({ endpoint: cosmosEndpoint, key: cosmosKey });
    const database = client.database('meuDatabase');
    const container = database.container('meuContainer');

    const query = 'SELECT * FROM c';
    const { resource: results } = await container.items.query(query).fetchAll();

    context.res = {
        status: 200,
        body: results
    };
};
