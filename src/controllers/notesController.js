import Note from '../models/Note.js'; // Change to ES6 import

// Get all notes
export const getNotes = async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get note by ID
export const getNoteById = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create new note
export const createNote = async (req, res) => {
    const note = new Note({
        title: req.body.title,
        content: req.body.content
    });
    
    try {
        const newNote = await note.save();
        res.status(201).json(newNote);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update note
export const updateNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        if (req.body.title != null) {
            note.title = req.body.title;
        }
        if (req.body.content != null) {
            note.content = req.body.content;
        }

        const updatedNote = await note.save();
        res.json(updatedNote);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete note
export const deleteNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        await Note.findByIdAndDelete(req.params.id);
        res.json({ message: 'Note deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};