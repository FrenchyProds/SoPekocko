exports.reactToSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
    .then(sauce => { 
              if (req.body.like == 1 && !sauce.usersLiked.includes(req.body.userId)) {
                Sauce.updateOne({_id: req.params.id}, {$inc: {likes: 1}, $push: {usersLiked: req.body.userId}, _id: req.params.id})
                .then(() => res.status(201).json({ message: 'Like ajouté avec succès !' }))
                .catch((error) => {res.status(400).json({error: error});});
                return;
              }
              else if (req.body.like == -1 && !sauce.usersDisliked.includes(req.body.userId)) {
                Sauce.updateOne({_id: req.params.id}, {$inc: {dislikes: 1}, $push: {usersDisliked: req.body.userId}, _id: req.params.id})
                .then(() => res.status(201).json({ message: 'Dislike ajouté avec succès !' }))
                .catch(error => res.status(400).json({ error }));
                return;
              }
              else if (req.body.like == 0 && sauce.usersLiked.includes(req.body.userId)) {
                Sauce.updateOne({_id: req.params.id}, {$inc: {likes: -1}, $pull: {usersLiked: req.body.userId}, _id: req.params.id})
                .then(() => res.status(201).json({ message: 'Like annulé avec succès !' }))
                .catch(error => res.status(400).json({ error }));
                return;
              } else if (req.body.like == 0 && sauce.usersDisliked.includes(req.body.userId)) {
                Sauce.updateOne({_id: req.params.id}, {$inc: {dislikes: -1}, $pull: {usersDisliked: req.body.userId}, _id: req.params.id})
                .then(() => res.status(201).json({ message: 'Dislike annulé avec succès !' }))
                .catch(error => res.status(400).json({ error })); 
                return;
              }          
    })
    .catch(error => res.status(400).json({ error }));
  };