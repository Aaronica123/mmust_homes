import { createClient } from "@supabase/supabase-js/dist/index.cjs"

const url=import.meta.env.VITE_SUPABASE_URL;
const key=import.meta.env.VITE_SUPABASE_KEY;
export const client=createClient(
    url,key
);