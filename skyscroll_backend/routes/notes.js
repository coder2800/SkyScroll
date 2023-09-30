const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const notes = require("../models/Notes");
//get all the notes using get: "/getnotes", Login required
router.get("/getnotes", fetchuser, async (req, res) => {
  try{
    const notes1 = await notes.find({ user: req.user.id });
    res.json(notes1);
  }catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});
//add the notes using post: "/addnotes", Login required
router.post(
  "/addnotes",
  fetchuser,
  [
    body("title", "Title must be atleast three letters long").isLength({
      min: 3,
    }),
    body("description", "Description must be atleast 5 letters long").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    //checking for basic requirements 
    const {title, description, tag} = req.body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
        const note = new notes({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();
    
        res.json(savedNote);
    }catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
  }
);
//ROUTE 3:update the notes using put: "/updatenotes", Login required
router.put(
  "/updatenotes/:id",fetchuser,async (req, res) => {
    try{
        const {title, description, tag} = req.body;
        const newNote = {};
        if(title) newNote.title = title
        if(description) newNote.description = description
        if(tag) newNote.tag = tag

        let note = await notes.findById(req.params.id);

        if(!note){
          return res.status(401).send("Not Allowed")
        }

        if(note.user.toString() !== req.user.id){
          return res.status(401).send("Not Allowed");
        }

        note = await notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});
        res.json({note});
        
    }catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
  }
);
//ROUTE 4:delete the notes using put: "/updatenotes", Login required
router.delete(
  "/deletenotes/:id",fetchuser,async (req, res) => {
    try{
        let note = await notes.findById(req.params.id);

        if(!note){
          return res.status(401).send("Not Allowed")
        }

        if(note.user.toString() !== req.user.id){
          return res.status(401).send("Not Allowed");
        }

        note = await notes.findByIdAndDelete(req.params.id);
        res.send("Note deleted succesfully")
        
    }catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
  }
);

module.exports = router;
