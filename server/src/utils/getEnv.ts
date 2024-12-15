//This file for checking environment variables 

//It checks env s is it doesnt get value then it gives error here 

if(!process.env.PORT) throw new Error("Env err : Port not found");
const port = process.env.PORT;

if(!process.env.CLIENT_ID) throw new Error("Env err : client id not found");
const client_id = process.env.CLIENT_ID;

if(!process.env.CLIENT_SECRET) throw new Error("Env err: client secret not found");
const client_secret = process.env.CLIENT_SECRET;

if(!process.env.ORIGIN) throw new Error("Env err : Cors origin not found.");
const origin = process.env.ORIGIN

export {client_id, client_secret, port, origin};