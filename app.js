if (process.env.NODE_ENV != 'production{') {
	require('dotenv').config();
}

const express = require('express');
const app = express();
const ejsMate = require('ejs-mate');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
/* -------------------------------- middle ware --------------------------------------*/
app.use((req, res, next) => {
	res.locals.error = '';
	next();
});
app.use(cors);
//=============================  cors
const corsOptions = {
	origin: process.env.ALLOW_CLIENT.split(','),
};

/* -------------------------------- DataBase Connection --------------------------------------*/
const connectDB = require('./config/db');
connectDB();

/*-----------------------------------templet view engine ------------------------------------------  */
app.engine('ejs', ejsMate); // tell express instead of default one use this one
app.set('view engine', 'ejs'); // changing view engine to ejs
app.set('views', path.join(__dirname, 'views')); // to void conflict if we call it from some other dir (mean views dir available from every where )

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

/* -------------------------------- require Routes --------------------------------------*/
const fileRouter = require('./routes/files');
const showRouter = require('./routes/show');
const downloadRouter = require('./routes/download');
/* -------------------------------- Routes path --------------------------------------*/
app.use('/api/files', fileRouter);
app.use('/files', showRouter);
app.use('/files/download', downloadRouter);

// if not trigger any route till now mean invalid routes simply send not foudn 404
app.use((req, res, next) => {
	const error = new Error('Page NOT FOUND');
	error.status == 404;
	next(error);
});

// it can handle all kinds of error in my app any where it is thrown
app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message,
		},
	});
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
	console.log(`Serving on port ${port}`);
});
