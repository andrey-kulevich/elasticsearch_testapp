import express from "express";
import elastic from 'elasticsearch';
import bodyParser from 'body-parser';

const router = express.Router();
const parser = bodyParser.json();
const elasticClient = elastic.Client({
    host: 'localhost:9200',
})
