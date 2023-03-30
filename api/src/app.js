require('dotenv').config();
var cors = require('cors');
var colors = require('colors');
const connectDB = require('./config/db'); 
const createServer = require('./utils/server');
const register = require('./routes/register');

// init port
const PORT = process.env.PORT || 8000;

// create app
const app = createServer();

// allow all origins to hit this endpoint
app.use(cors());

// connect to database
connectDB();

// register route
register(app);

app.listen(PORT, () => console.log(`Running a GraphQL API server at http://localhost:${PORT}/graphql`.underline.cyan.bold) );