import Comment from "../models/Comment.js"; 


export const createcomment = async (req, res) => {
  try {
    const { comment: commentText } = req.body; 

    if (!commentText) {
      return res.status(400).json({ message: "Please fill the comment field" });
    }

    const newComment = new Comment({
      user: req.user._id,
      name: req.user.name,
      email: req.user.email,
      profilePic: req.user.profilePic,
      comment: commentText,
    });
    await newComment.save();

    res.status(201).json({
      message: "Comment added successfully",
      comment: newComment,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all comments
export const getcomment = async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Comments fetched successfully",
      comments,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
