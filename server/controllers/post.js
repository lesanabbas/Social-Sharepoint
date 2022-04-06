const formidable = require('formidable')
const fs = require('fs')
const _ = require('lodash');
const { off } = require('process');

const Post = require('../models/post')

exports.postById = (req, res, next, id) => {
    Post.findById(id)
    .populate("postedBy", "_id name")
    .populate('comments.postedBy', '_id name')
    .populate('postedBy', '_id name')
    .populate('_id title body created likes comments photo')
    .exec((err, posts)=>  {
        if(err || !posts) {
            return res.status(400).json({
                error: err
            });
        }
        req.post = posts;
        next();
    });
};

exports.getPosts = (req, res) => {
    const skip = req.body.skip;
    console.log(skip)
    const posts = Post.find()
    .skip(parseInt(skip))
    .limit(2)
    .populate('postedBy', '_id name')
    .populate('comments', 'text created')
    .populate('comments.postedBy', '_id name')
    .populate('_id title body created likes')
    .sort({ created: -1})
    .then((posts) => {
        res.json(posts);
    })
    .catch(err => console.log(err))
};

exports.getAllPostsRn = (req, res) => {
    const posts = Post.find()
    .populate('comments.posted', '_id name updated')
    .populate('postedBy', '_id name updated')
    .select('_id title body created likes comments updated')
    .sort({created: -1})
    .then((posts) => {
        res.json(posts);
    })
    .catch(err => console.log(err))
}

exports.countPosts = (req, res) => {
    Post.count()
    .then((data) => {
        res.json({data});
    })
    .catch(err => console.log(err))
}

exports.createPost = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    console.log(form)
    form.parse(req, (err, fields, files) => {
        if(err) {
            return res.status(400).json({
                error: "Image could not be uploaded"
            });
        }
        let post = new Post(fields)
        console.log(fields)
        req.profile.hashed_password = undefined;
        req.profile.salt = undefined;
        post.postedBy = req.profile;
        console.log(files)
        if(files.photo) {
            post.photo.data = fs.readFileSync(files.photo.path);
            post.photo.contentType = files.photo.type;
        }

        post.save((err, result) => {
            if(err) {
                return res.status(400).json({
                    error: err
                })
            }
            res.json(result);
        });
    });
};


exports.getPostPhotoRn = (req, res) => {
    var base64 = 'iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAAAAACPAi4CAAAAB3RJTUUH1QEHDxEhOnxCRgAAAAlwSFlzAAAK8AAACvABQqw0mAAAAXBJREFUeNrtV0FywzAIxJ3+K/pZyctKXqamji0htEik9qEHc3JkWC2LRPCS6Zh9HIy/AP4FwKf75iHEr6eU6Mt1WzIOFjFL7IFkYBx3zWBVkkeXAUCXwl1tvz2qdBLfJrzK7ixNUmVdTIAB8PMtxHgAsFNNkoExRKA+HocriOQAiC+1kShhACwSRGAEwPP96zYIoE8Pmph9qEWWKcCWRAfA/mkfJ0F6dSoA8KW3CRhn3ZHcW2is9VOsAgoqHblncAsyaCgcbqpUZQnWoGTcp/AnuwCoOUjhIvCvN59UBeoPZ/AYyLm3cWVAjxhpqREVaP0974iVwH51d4AVNaSC8TRNNYDQEFdlzDW9ob10YlvGQm0mQ+elSpcCCBtDgQD7cDFojdx7NIeHJkqi96cOGNkfZOroZsHtlPYoR7TOp3Vmfa5+49uoSSRyjfvc0A1kLx4KC6sNSeDieD1AWhrJLe0y+uy7b9GjP83l+m68AJ72AwSRPN5g7uwUAAAAAElFTkSuQmCC';
    var img = Buffer.from(base64, 'base64');

    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': img.length
    });
    res.end(img)
}

exports.postsByUses = (req, res) => {
    Post.find({postedBy: req.profile._id})
    .populate('postedBy', '_id name')
    .populate('comment.postedBy', '_id name')
    .populate('_id title body comments updated')
    .sort({created: -1})
    .exec((err, posts) => {
        if(err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json(posts)
    });
};


exports.isPoster = (req, res, next) => {
    let isPoster = req.post && req.auth && req.post.postById._id == req.auth._id;
    if(!isPoster) {
        return res.status(403).json({
            error: "User is not authorized !"
        });
    }
    next();
}


exports.updatePost = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if(err) {
            return res.status(400).json({
                error: "Photo could not be uploaded"
            })
        }

        let post = req.post;
        post = _.extend(post, fields);
        post.updated = Date.now()

        if(files.photo) {
            post.photo.data = fs.readFileSync(files.photo.path);
            post.photo.contentType = files.photo.type;
        }
        post.save((err, result) => {
            if(err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(post);
        });
    });
};


exports.updatePostRn = (req, res) => {
    let post = req.post;
    post = _.extend(post, req.body);

    post.updated = Data.now();

    if(req.body.base64Date && req.body.imageType) {
        post.photo.date = Buffer.from(req.body.base64Date, 'based64');
        post.photo.contentType = req.body.imageType;
    }

    post.save((err, result) => {
        if(err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json(result);
    });
};



exports.deletePost = (req, res) => {
    let post = req.post;
    post.remove((err, post) => {
        if(err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json({
            message: "Successfully deleted the post"
        });
    });
};


exports.photo = (req, res, next) => {
    res.set('Content-Type', req.post.photo.contentType);
    return res.send(req.post.photo.data);
    next();
};


exports.singlePost = (req, res) => {
    return res.json(req.post);
}


exports.like = (req, res) => {

    Post.findByIdAndUpdate(req.body.postById, { $push: {likes: req.body.userId} }, {new: true})
    .exec((err, result) => {
        if(err) {
            return res.status(400).json({
                error: err
            })
        } else {
            res.json(result);
        }
    });
};


exports.unlike = (req, res) => {

    Post.findByIdAndUpdate(req.body.postId, { $pull: {likes: req.body.userId}}, {new: true})
    .exec((err, result) => {
        if(err) {
            return res.status(400).json({
                error: err
            })
        } else {
            res.json(result);
        }
    });
};


exports.comment = (req, res) => {

    let comment = req.body.comment;
    comment.postedBy = req.body.userId;
    Post.findByIdAndUpdate(req.body.postId, { $push: {comment: comment}}, {new: true})
    .populate('comments.postedBy', '_id name')
    .populate('posedBy', '_id name')
    .exec((err, result) => {
        if(err) {
            return res.status(400).json({
                error: err
            })
        } else {
            res.json(result);
        }
    });
};


exports.uncomment = (req, res) => {
    
    let comment = req.body.comment;
    Post.findByIdAndUpdate(req.body.postId, {$push: {comments: {_id: comment._id}} }, {new: true})
    .populate('comments.postedBy', '_id name')
    .populate('postedBy', '_id name')
    .exec((err, result) => {
        if(err) {
            return res.status(400).json({
                error: err
            })
        } else {
            res.json(result);
        }
    });
};