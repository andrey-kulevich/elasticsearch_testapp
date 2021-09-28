const express = require("express");
const elastic = require('elasticsearch');

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
            .then(() => console.log('added'))
            .catch(err => {
                console.log(err);
                return res.status(500).json({
                    msg: 'Error occurred',
                    err
                })
            })
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
    let query = {
        index: 'comments',
        size: 10,
        sort: "id"
    }
    if (req.query.q) query.q = req.query.q
    if (req.query.size) query.size = req.query.size
    if (req.query.from) query.from = req.query.from
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
