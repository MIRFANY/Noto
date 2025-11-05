import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

// debug


const app = express();
const PORT = process.env.PORT || 5002; 


// add root route here (before database connection)

app.get("/", (req, res) =>{
    res.json({
        message: "Notes app API is working!",
        endpoints: {
            get_all_notes: "GET/api/notes",
            create_note: "POST/api/notes",
            
        }
    });
});


connectDB().then(() =>{
    //middleware
    app.use(express.json());
    app.use(rateLimiter);

    // routes 
    app.use("/api/notes", notesRoutes);


    //start the server
    app.listen(PORT, ()=>{
        console.log("server started on PORT:", PORT);
    });
    
}).catch((error) =>{
    console.error("database connection failed: ", error);
    process.exit(1);
});













