router.post('/addnote',fatchuser,
// [
//     body('title').isLength({min:3}),
//     body('description').isLength({min:5})

// ]
// ,async(req,res)=>{
//     try {
//    const {title,description,tag}=req.body;
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({errors:errors.array()});
//     }  
//     const note=new Note({
//         title,description,tag,user:req.user.id
//     })
//     const savedNote=await note.save();
//      res.json(savedNote);
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send("some error occured");
//     }
//  })