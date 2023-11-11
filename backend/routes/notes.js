const express = require("express");
const router = express.Router()
const fetchuser = require("../middleware/fetchuser")
const Notes = require("../models/Notes")
const { body, validationResult } = require("express-validator")


//Route 1: Get all the notes at "/api/notes/fetchallnotes"
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id})
        res.json([notes])
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured")
    }
})
//Route 2:Add notes at "/api/notes/addnote"
router.post('/addnote', fetchuser, [
    body("title", "Title can not be this short").isLength({ min: 3 }),
    body("description", "Description can not be this short").isLength({ min: 5 }),

], async (req, res) => {
    try {
        const { title, tag, description } = req.body;

        const errors = validationResult(req);
        // If there are any errors return bad request
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const note = new Notes({
            title, description, tag, user: req.user.id
        })

        const savedNote = await note.save();

        res.json(savedNote)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured")
    }
})

//Route 3 : Update notes at "/api/notes/updatenote"
router.post('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    //create a new note
    const newNote = {};
    if (title) {
        newNote.title = title;
    }
    if (description) {
        newNote.description = description;
    }
    if (tag) {
        newNote.tag = tag;
    }


    var note = await Notes.findById(req.params.id);
    if (!note) {
        return res.status(404).send("Note not found");
    }

    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not allowed")
    }

    note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
    // res.status(200).send("Update Successfully")
    res.send(note)
})

// Route 4: Delete a note at : /api/notes/delete
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    //Find the note to be deleted and delete it
    var note = await Notes.findById(req.params.id);
    if (!note) {
        return res.status(404).send("Note not found");
    }
    //Allow deletion if user owns the note  
    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not allowed")
    }

    note = await Notes.findByIdAndDelete(req.params.id)
    // res.status(200).send("Update Successfully")
    res.json({"Success": "Note has been deleted",note:note});
})

module.exports = router