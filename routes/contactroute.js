const express = require('express');
const router = express.Router();

router.route('/').get((req, res)=>{
    // res.send('Sent');
    // res.json({mesg:"Get all contacts"});
    res.status(200).json({mesg:"Get all contacts"});
});
router.route('/').post((req, res)=>{
    res.status(200).json({mesg:"create contacts"});
});
router.route('/:id').get((req, res)=>{
    let {id} = req.params;
    res.status(200).json({mesg:`Get all contacts ${id}`});
});
router.route('/:id').put((req, res)=>{
    let {id} = req.params;
    res.status(200).json({mesg:`update all contacts ${id}`});
});
router.route('/:id').delete((req, res)=>{
    let {id} = req.params;
    res.status(200).json({mesg:`delete contacts ${id}`});
});

module.exports = router;