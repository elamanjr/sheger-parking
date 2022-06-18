const Client = require("../../src/modules/entities/client.js");
async function main() {
    try {
        let clients = await Client.getAll();
        if (clients.length != 0) {
            clients.forEach(client => console.log(client.id));
        } else {
            console.dir("No clients found!", { depth: null });
        }
    } catch (error) {
        console.log(error);
    } finally {
        process.exit();
    }
}
main();