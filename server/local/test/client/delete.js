const Client = require("../../src/modules/entities/client.js");
async function main() {
    try {
        console.log(await Client.delete({ id: "6244c0cfd77f6dc3dacc0620" }));
    } catch (error) {
        console.log(error);
    } finally {
        process.exit();
    }
}
main();