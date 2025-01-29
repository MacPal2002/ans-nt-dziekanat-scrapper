import "https://deno.land/std@0.224.0/dotenv/load.ts";

export const LOGIN = Deno.env.get("LOGIN") ?? ""; 
export const PASSWORD = Deno.env.get("PASSWORD") ?? "";