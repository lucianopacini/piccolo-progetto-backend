require('dotenv').config(); // legge le variabili da .env
const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const app = express();
app.use(cors());
app.use(express.json());

// Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Endpoint test
app.get("/api/message", (req, res) => {
    res.json({ message: "Ciao dal backend Supabase!" });
});

// Endpoint login
app.get("/api/login/:username/:password", async (req, res) => {
    const { username, password } = req.params;

    // Verifica utente nella tabella 'utenti'
    const { data, error } = await supabase
        .from("utenti")
        .select("*")
        .eq("username", username)
        .eq("password", password)
        .single(); // single() ritorna un solo record

    if (error || !data) {
        res.json({ success: false, message: "Username o password errati" });
    } else {
        res.json({ success: true, message: `Benvenuto ${username}!` });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server attivo sulla porta " + PORT);
});