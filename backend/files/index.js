//Executes the app express object and opens the port starting the server.
import app from "./app.js";

function start(){
    app.listen(3001);
    console.log("Server is listending");
}
start();