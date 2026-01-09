import Carcomment from "../models/carCommentModel.js"; 


export const createcommentforcar = async (req, res) => {
  try {
    const { carcomment: carcommentText, rating, carId  } = req.body; 

    if (!carcommentText || !rating || !carId) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const newcarComment = new Carcomment({
      user: req.user._id,
      car : carId,
      name: req.user.name,
      email: req.user.email,
      profilePic: req.user.profilePic,
      carcomment: carcommentText,
      rating,
    });
    await newcarComment.save();

    res.status(201).json({
      message: "Comment added successfully",
      carcomment: newcarComment,
      ...newcarComment._doc,
      profilePic: newcarComment.profilePic,

    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all comments
export const getcommentforcar = async (req, res) => {
  try {
    const { carId } = req.params;
    const carcomments = await Carcomment.find({ car: carId })
      .populate("user", "name email profilePic")
      .sort({ createdAt: -1 });
    res.status(200).json({
      message: "Comments fetched successfully",
      carcomments,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
