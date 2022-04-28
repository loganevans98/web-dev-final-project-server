import commentsDao from "../database/comments/comments-dao.js";

const postComment = async (req, res) => {
  const comment = req.body
  const bookID = req.params.bookID
  const userId = req.params.userId
  const insertedComment = await commentsDao.postComment(userId, bookID, comment)
  res.json(insertedComment)
}

const findCommentsByBookID = async (req, res) => {
  const bookID = req.params.bookID
  const comments = await commentsDao.findCommentsByBookID(bookID)
  res.json(comments)
}

const findCommentsByUserId = async (req, res) => {
  const userId = req.params.userId
  const comments = await commentsDao.findCommentsByUserId(userId)
  res.json(comments)
}

const deleteCommentById = async (req,res) =>{
  const id = req.params.id
  const status = await commentsDao.deleteCommentById(id);
  res.json(status)
}

const findAllComments = async(req,res)=>{
  const comments = await commentsDao.findAllComments()
  res.json(comments)
}

const deleteComment = async(req,res)=>{
  const userId = req.params.userId
  const bookID = req.params.bookID
  const status = await commentsDao.deleteComment(userId, bookID);
  res.json(status)
}

const commentController = (app) => {
  app.post('/api/books/:bookID/comments/:userId', postComment)
  app.get('/api/books/:bookID/comments', findCommentsByBookID)
  app.get('/api/users/:userId/comments', findCommentsByUserId)
  app.get('/api/comments', findAllComments)
  app.delete('/api/comments/:id', deleteCommentById)
  app.delete('/api/books/:bookID/comments/:userId', deleteComment)
}

export default commentController