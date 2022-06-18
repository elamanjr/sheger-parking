const Client = require("../../src/modules/entities/client.js");
// @ts-ignore
let c = new Client({ fullName: "fn", phone: "+25176978", email: "e@g", passwordHash: "any", defaultPlateNumber: "023" });

async function main() {
    try {
        let client = await c.add();
          console.dir(client, { depth: null });
    } catch (error) {
        console.log(error.message);
    } finally {
        process.exit();
    }
}
main();