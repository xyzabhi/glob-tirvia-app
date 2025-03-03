import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { useEffect } from "react";
import Home from "./pages/Home/Home";
import Game from "./pages/Game/Game";
// Initialize Supabase client
const supabase = createClient(
  "https://blpbppoqzqyzratuoehg.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJscGJwcG9xenF5enJhdHVvZWhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA5NDQ0MDMsImV4cCI6MjA1NjUyMDQwM30.NDf-phCadvuLQ__OR1JR-4cTgNHQIypZSjIbVLshVag"
);

function App() {
  useEffect(() => {
    const getTrivia = async () => {
      try {
        const { data, error } = await supabase
          .from("trivias")
          .select("*")
          .filter("id", "not.in", "(1,2,3)")
          .order("id", { ascending: false })
          .limit(1);

        if (error) throw error;
        console.log(data, "data");
      } catch (error) {
        console.error("Error fetching trivia:", error.message);
      }
    };
    getTrivia();
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </Router>
  );
}

export default App;
