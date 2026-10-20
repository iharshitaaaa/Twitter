import CommentService from '../services/comment-service.js';

const commentService = new CommentService();

export const createComment = async (req, res) => {
    try {
        const comment = await commentService.createComment(
            req.body.userId,
            req.query.modelType,
            req.query.modelId,
            req.body.content
        );
        res.status(201).json({
            success:true,
            data: comment,
            message: 'Comment created successfully',
            err: {}
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            data: {},
            message: 'Error in creating comment',
            err: error
        })
    }
}