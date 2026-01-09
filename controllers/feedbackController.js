import Feedback from "../models/Feedback.js";

export const  createFeedback  = async (req, res) => {
    try {
        const { name , number , comment } = req.body;

        if(!name || !number || !comment ) {
            return res.status(400).json ({ message : "please fill all the fields"})
        }

        const newFeddback = new Feedback({
            name, number, comment
        })
        res.statu(201).json({
            message : "Feedback submitted successfully",
            feedback : newFeddback,
            data : await newFeddback.save()
        })

    } catch (error) {
        res.status(500).json({ message : "Server error", error : error.message});
    }
}
export const getallFeedback = async( req, res) => {
    try{
        const feedbacks = await Feedback.find().sort({ createdAt : -1 });
        res.status(200).json({ message :" Fedback fetched sucessfully", feedbacks });
    }catch(error){
        res.status(500).json({ message : " Server error", error : error.message});
    }
}
export const  getsingleFedback = async ( req, res ) => {
    try{
         const feedback = await Feedback.findById(req.params.id);
       if (!feedback) {
           return res.status(404).json({ success: false, message: "Not found" });
        }
         res.status(200).json({ success: true, feedback });
        }catch(error){
           res.status(500).json({ message : " Server error", error : error.message})
         }
       }
export const replyFeedback = async ( req, res ) => {
    try{
         const feedback = await Feedback.findById(req.params.id);

    if (!feedback) {
      return res.status(404).json({ success: false, message: "Feedback not found" });
    }

    feedback.adminReply = reply;
    feedback.repliedBy = adminName;
    feedback.isReplied = true;

    await feedback.save();

    res.status(200).json({
      success: true,
      message: "Reply sent successfully",
      feedback,
    });


    }catch(error){
        res.status(500).json({ message : " Server error", error : error.message});
    }
}