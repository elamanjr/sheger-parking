const Client = require("../src/modules/entities/client.js");
async function main() {
    try {
        let correctPass = await Client.verifyPassword({id:"6244c08b4f5f302592b0e38b", passwordHash:"any"});
        console.log(correctPass?"correct":"incorrect");
    } catch (error) {
        console.log(error);
    } finally {
        process.exit();
    }
}
main();