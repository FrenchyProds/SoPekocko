let hasBeenLiked = {usersLiked: { $elemMatch: { $eq: user._id }}};
let hasBeenDisliked = {usersDisliked: { $elemMatch: { $eq: user._id }}};

Sauce.findOne({_id: req.params.id})
.then(sauce => {
    const liked = req.body.likes;
    const disliked = req.body.dislikes;
    if (hasBeenLiked === false && hasBeenDisliked === false && liked === true) {
        Sauce.updateOne({_id: req.params.id}, {$inc: {likes: 1}}, [{$push: {usersLiked: req.body.userId}}])
        .then(
            () => {
            res.status(201).json({
                message: 'Sauce liked!'
            });
            }
        ).catch(
            (error) => {
            res.status(400).json({
                error: error
            }
        );
        });
    } else if (hasBeenLiked === true && hasBeenDisliked === false && disliked === true) {
        Sauce.updateOne({_id: req.params.id}, {$inc: {likes: -1}}, [{$pull: {usersLiked: req.body.userId}}])
        .then(
            () => {
            res.status(201).json({
                message: 'Sauce unliked!'
            });
            }
        ).catch(
            (error) => {
            res.status(400).json({
                error: error
            }
        );
        });
    } else if (hasBeenDisliked === true && hasBeenliked === false && liked === true) {
        Sauce.updateOne({_id: req.params.id}, {$inc: {dislikes: -1}}, [{$pull: {usersDisliked: req.body.userId}}])
        .then(
            () => {
            res.status(201).json({
                message: 'Sauce un-disliked!'
            });
            }
        ).catch(
            (error) => {
            res.status(400).json({
                error: error
            }
        );
        });
    } else if (hasBeenLiked === false && hasBeenDisliked === false && disliked === true) {
        Sauce.updateOne({_id: req.params.id}, {$inc: {dislikes: 1}}, [{$push: {usersDisliked: req.body.userId}}])
    }
})