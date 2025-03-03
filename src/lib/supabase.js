import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://blpbppoqzqyzratuoehg.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJscGJwcG9xenF5enJhdHVvZWhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA5NDQ0MDMsImV4cCI6MjA1NjUyMDQwM30.NDf-phCadvuLQ__OR1JR-4cTgNHQIypZSjIbVLshVag";

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing environment variables for Supabase configuration");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

console.log(supabaseUrl, supabaseAnonKey);

export async function getRandomTrivia() {
  let { data, error } = await supabase.from("trivias").select("*").range(0, 9);

  if (error) {
    console.error("Error fetching random trivia:", error);
    throw error;
  }

  return data?.[0] || null;
}
