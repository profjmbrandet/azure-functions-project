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
