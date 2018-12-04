const router = require('express').Router();
const { Item } = require('../models/user-model');


router.post('/adduser', function(req, res) {
    let add = new Item(req.body);
    add.save().then((dat) =>
        res.send(dat)
    );
});
router.get('/add', function(req, res) {

    Item.find(function(err, data) {
        res.send(data);
    })
});

router.delete('/delete/:id', function(req, res) {
    Item.findByIdAndRemove({ _id: req.params.id }).then((what) => {
        res.send(what);
    });
    console.log("love is blind");
})
module.exports = router;