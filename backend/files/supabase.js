//Defines the supabase client configurations that will be used for all supabase connections.
import {createClient}from "@supabase/supabase-js";
import {configDotenv} from "dotenv";
configDotenv();
//the client will be used for all service role accesses
const client =createClient(
    process.env.url,process.env.secret_key
);
export default client;