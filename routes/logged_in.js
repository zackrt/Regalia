var express = require('express');
var router = express.Router();
const { User } = require('../models/users');
const passport = require('passport');
const jwtAuth = passport.authenticate('jwt', { session: false });

router.get('/', jwtAuth,(req, res) => {

   console.log('GET THE USER DATA AND SEND IT TO THE PAGE',req.query)
   //ZACK YOU NOW HAVE THE EMAIL ADDRESS SO YOU CAN MAKE YOUR MONGOOSE CALL

   // the email address is in the variable: users  req.query.EmailAddress
   try {
        User.findOne({EmailAddress: req.query.EmailAddress}).then(user => {
            res.json({user:user.serialize()})
        })
   } catch(err) {
       res.json({err})
   }

});
//delete user account
router.delete('/', jwtAuth, (req, res) => {
    console.log(req);
    try {
        User.deleteOne({EmailAddress: req.body.EmailAddress}).then(users => {
        res.status(200).json({ message: "Your Account was deleted!" })
    }) 
    } catch (e) {
        res.status(500).json({ message: 'Internal server error, account cannot deleted' });
    }
});
router.delete('/for_tests/:id', (req, res) => {
        User
          .findByIdAndRemove(req.params.id)
          .then(user => res.status(204).end())
          .catch(err => res.status(500).json({ message: 'Internal server error' }));
});
//sending regalia to another verified user while logged in
router.put('/sendRegalia', jwtAuth, async (req, res) =>{
    //validate, check current user has enough, get value and check against input value
    // this is truthy or falsy, returns Target user's document
    const targetUser = await User.findOne({EmailAddress: req.body.EmailAddress});
        console.log(req.user);
    //sync is quick: truthy or falsy
    
    const REGALIA = req.user.RentPayment > req.body.RentPayment;

    if (!targetUser || !REGALIA) {
        throw new Error('Invalid User or Insufficient Regalia funds')
    }
    try {
        //find the other user email req.body input
        const sourceUser = await User.findById(req.user.id);
        targetUser.RentPayment = targetUser.RentPayment + req.body.RentPayment;
        sourceUser.RentPayment = sourceUser.RentPayment - req.body.RentPayment;
        await targetUser.save();
        await sourceUser.save();
        res.status(200).json(`Regalia Sent to ${targetUser.EmailAddress}`);
    } catch(e) {
        res.status(400).json(e);
    });


    //     targetUser.findOneAndUpdate(
    //         {EmailAddress: req.body.EmailAddress},
    //          {RentPayment: req.body.RentPayment},
    //         //change amount in account in user A, while increase user B increase
    //         req.body,
    //         (err) => {
    //             if (err) return res.status(500).send(err);
    //             res.send();
    //         })
    // } catch (e) {
    //         res.status(500).json({ message: 'Internal server error, cannot transfer Regalia' });
    // }
    });
    //PUT to update account  
router.put('/', jwtAuth,(req, res) =>{
    try {
        User.findOneAndUpdate(
          {EmailAddress: req.body.EmailAddress},
          req.body,
          {new: true},
          (err, newUser) => {
            if (err) return res.status(500).send(err);
            res.send(newUser);
          })
    } catch (e) {
        res.status(500).json({ message: 'Internal server error, account cannot be updated' });
    }
});
router.put('/for_tests/:id', (req, res) =>{
        console.log(req.body);
        // ensure that the id in the request path and the one in request body match
        if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
          const message = (
            `Request path id (${req.params.id}) and request body id ` +
            `(${req.body.id}) must match`);
          console.error(message);
          return res.status(400).json({ message: message });
        }
        // we only support a subset of fields being updateable.
        // if the user sent over any of the updatableFields, we udpate those values
        // in document
        const toUpdate = {};
        const updateableFields = ['EmailAddress', 'FirstName', 'LastName', 'RentPayment'];
      
        updateableFields.forEach(field => {
          if (field in req.body) {
            toUpdate[field] = req.body[field];
          }
        });
        User
          // all key/value pairs in toUpdate will be updated -- that's what `$set` does
          .findByIdAndUpdate(req.params.id, { $set: toUpdate })
          .then(user => res.status(204).end())
          .catch(err => res.status(500).json({ message: 'Internal server error' }));
      });
module.exports = router;