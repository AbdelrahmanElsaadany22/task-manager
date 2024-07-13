import express from 'express'
import "dotenv/config"
import { myConnection } from './db/connection.js'
import bodyParser from 'body-parser'
import bootstrap from './src/bootstrab.js'

const app = express()
app.use(bodyParser.json());

myConnection()
bootstrap(app)

app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`))