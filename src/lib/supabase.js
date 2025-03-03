import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://blpbppoqzqyzratuoehg.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJscGJwcG9xenF5enJhdHVvZWhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA5NDQ0MDMsImV4cCI6MjA1NjUyMDQwM30.NDf-phCadvuLQ__OR1JR-4cTgNHQIypZSjIbVLshVag";

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing environment variables for Supabase configuration");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Add caching for trivia questions
const CACHE_KEY = "trivia_cache";
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

export async function getRandomTrivia() {
  try {
    const seenQuestionIds = JSON.parse(
      localStorage.getItem("seenQuestionIds") || "[]"
    );

    // Check cache first
    const cache = JSON.parse(localStorage.getItem(CACHE_KEY) || "null");
    if (cache && cache.timestamp > Date.now() - CACHE_DURATION) {
      const availableQuestions = cache.questions.filter(
        (q) => !seenQuestionIds.includes(q.id)
      );
      if (availableQuestions.length) {
        return availableQuestions[0];
      }
    }

    // Fetch from Supabase if cache miss
    const { data, error } = await supabase
      .from("trivias")
      .select("*")
      .filter("id", "not.in", `(${seenQuestionIds.join(",")})`)
      .order("id", { ascending: false })
      .limit(10); // Fetch 10 questions at once for caching

    if (error) throw error;
    if (!data?.length) return null;

    // Update cache
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({
        questions: data,
        timestamp: Date.now(),
      })
    );

    return data[0];
  } catch (error) {
    console.error("Error in getRandomTrivia:", error);
    throw new Error("Failed to fetch trivia question");
  }
}
