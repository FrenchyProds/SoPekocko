exports.reactToSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
    .then(sauce => {
      let listLikers = req.params.usersLiked;
      let findLikers = listLikers.indexOf(req.body.userId);
      let listDislikers = req.params.usersDisliked;
      let findDislikers = listDislikers.indexOf(req.body.userId);
      console.log(findLikers);
      switch (req.body.like) {
          case 1 && findLikers === -1:
            Sauce.updateOne({_id: req.params.id}, {$inc: {likes: 1}}, [{$push: {usersLiked: req.body.userId}}]), {id: req.body._id};
            break;
    
          case -1 && findDislikers === -1:
          Sauce.updateOne({_id: req.params.id}, {$inc: {dislikes: 1}}, [{$push: {usersDisliked: req.body.userId}}]), {id: req.body._id};
          break;
    
          case 0 && findLikers > -1:
          Sauce.updateOne({_id: req.params.id}, {$inc: {likes: -1}}, [{$pull: {usersLiked: req.body.userId}}]), {id: req.body._id};  
    
          case 0 && findDislikers > -1:
          Sauce.updateOne({_id: req.params.id}, {$inc: {dislikes: -1}}, [{$pull: {usersDisliked: req.body.userId}}]), {id: req.body._id};  
          
          default: 
            throw { error: "Impossible de modifier vos likes, merci de bien vouloir réessayer ultérieurement" };
      }
    })
    .catch(error => res.status(400).json({ error: 'FUCKKKKKKK' }));
    };