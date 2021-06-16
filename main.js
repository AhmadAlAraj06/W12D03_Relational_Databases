const express = require('express');
require('dotenv').config();
require('./db/db');

const articlesRouter = require('./routers/routes/articles');
const usersRouter = require('./routers/routes/users');
const authRouter = require('./routers/routes/auth');
const commentsRouter = require('./routers/routes/comments');
const roleRouter = require('./routers/routes/role');

const app = express();

app.use(express.json());

app.use('/articles', articlesRouter);
// app.use('/users', usersRouter);
app.use( usersRouter);
app.use(authRouter);
app.use(commentsRouter);
app.use(roleRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`server on ${PORT}`);
});