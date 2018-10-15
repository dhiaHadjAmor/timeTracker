import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import './config/database'
import routes from './config/routes.js'
import config from './webpack.config.dev';
import webpack from 'webpack'
import path from 'path'


const PORT = 3000
const NODE_ENV = process.env.NODE_ENV || 'development'


const app = express()

const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

const server = http.createServer(app)

app.use(bodyParser.json({ limit: "4mb" }))
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', routes)
app.use('/', express.static(path.join(__dirname, '/src/')));

server.listen(PORT, () => console.log('start in ' + NODE_ENV + ' environment on port ' + PORT))

