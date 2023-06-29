const express = require("express");
var fetchuser = require("../middleware/fetchUser");
const Note = require("../models/Notes");
const { body, validationResult } = require("express-validator");
const router = express.Router();
//Get all the notes using :Get localhost:5000/api/notes/fetchallnotes :Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {const notes = await Note.find({ user: req.user.id });

    res.json(notes);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
      }
  
});
//Add a  new note using :Post localhost:5000/api/notes/Addnote :Login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Enter a valid Email").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const { title, description, tag } = req.body;
    const errors = validationResult(req);
    //if there are error return bad request
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote=await note.save()
      res.json(savedNote)
    } catch (error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
      }
      }
);
//update note using :Put localhost:5000/api/notes/updatenote :Login required
// router.put(
//   "/updatenote/:id",
//   fetchuser,async (req, res) => {
//     const{title,description,tag}=req.body;
//     //crate new note object
//     const newNote={}
//     if(title){newNote.title=title}
//     if(description){newNote.description=description}
//     if(tag){newNote.tag=tag}
//     let note=await Note.findById(req.params.id)
//     if(!note){return res.status(404).send("Not found")}
//     if(note.user.toString()!==req.user.id){

//       return res.status(401).send("Not allowed")
//     }
//     note=await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
//     res.jason({note})


//   })
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    // getting the id from the getuser middleware
    const id = req.id;
    // getting note id to modify the node.
    const noteId = req.params.id;
    // Modifying notes with verification checking if the userId of notes matches with the id of the user so that the one who created the note can only modify the notes.
    const checkNoteOwner = await Note.findOne({ _id: noteId, userId: id });

    if (!checkNoteOwner) {
      return res.status(401).send("Not Allowed.");
    }
    const updatedNote = await Note.findByIdAndUpdate(
      noteId,
      {
        title: req.body.title,
        description: req.body.description,
        tag: req.body.tag,
      },
      { new: true }
    );
    // new true brings new updated data from the mongo db not the old one in res.
    return res.send(updatedNote);
  } catch (error) {
    return res.status(500).send("Internal Server Error.");
  }
});
//delete note using :localhost:5000/api/notes/deletenote/ :Login required
router.delete(
  "/deletenote/:id",
  fetchuser,async (req, res) => {
    try {
      let note=await Note.findById(req.params.id)
      if(!note){return res.status(404).send("Not found")}
      //allow deletion only if user is cerified
      if(note.user.toString()!==req.user.id){
  
        return res.status(401).send("Not allowed")
      }
      note=await Note.findByIdAndDelete(req.params.id)
      res.json({"Success":"note has been deleted",note:note})
  
      
    } catch (error) {
      return res.status(500).send("Internal Server Error.");
      
    }
    
   


  
  })
module.exports = router;
