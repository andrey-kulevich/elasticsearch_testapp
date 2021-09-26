const express = require("express");
const elastic = require('elasticsearch');
const {comments} = require("./comments");

const router = express.Router();
const esClient = elastic.Client({
    host: 'http://127.0.0.1:9200',
})

router.use((req, res, next) => {
    esClient.index({
        index: 'logs',
        body: {
            url: req.url,
            method: req.method,
        }
    })
        .then(res => console.log('Logs indexed' + res))
        .catch(err => console.log(err))
    next();
})

// load comments
router.post('/comments', (req, res) => {
    req.body.forEach(elem => {
        esClient.index({
            index: 'comments',
            body: elem,
        })
            .catch(err => {
                console.log(err);
                return res.status(500).json({
                    msg: 'Error occurred',
                    err
                })
            })
        console.log('hello')
    })
    return res.status(200).json({
        msg: 'comments are added'
    })
})

// get comment by id
router.get('/comments/:id', (req, res) => {
    esClient.get({
        index: 'comments',
        id: req.params.id,
    })
        .then(resp => {
            if (!resp) return res.status(404).json({
                product: resp
            })
            return res.status(200).json({
                product: resp
            })
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({
                msg: 'Error not found',
                err
            })
        })
})

// get all comments
router.get('/comments', (req, res) => {
    let query = { index: 'comments' }
    if (req.query.comments) query.q = `*${req.query.comments}*`
    esClient.search(query)
        .then(resp => {
            if (!resp) return res.status(404).json({
                product: resp
            })
            return res.status(200).json({
                product: resp
            })
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({
                msg: 'Error occurred',
                err
            })
        })
})

module.exports = router;
