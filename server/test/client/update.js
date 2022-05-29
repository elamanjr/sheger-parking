const Client = require("../../src/modules/entities/client.js");
async function main() {
    try {
        console.log(await Client.update({ id: "6244ae898d763eb7ddd5d97f", updates: { phone: "909n900490" } }));
    } catch (error) {
        console.log(error);
    } finally {
        process.exit();
    }
}
main();