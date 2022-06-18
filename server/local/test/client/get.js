const Client = require("../../src/modules/entities/client.js");
async function main() {
    try {
        let client = await Client.get({id:"6244c0cfd77f6dc3dacc0620"});
        if (client) {
            console.dir(client, { depth: null });
        } else {
            console.dir("No client with this id", { depth: null });
        }
    } catch (error) {
        console.log(error);
    } finally {
        process.exit();
    }
}
main();