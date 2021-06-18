const articlesModel = require('./../../db/models/articles');

const getAllArticles = (req, res) => {

	const query = `SELECT * FROM articles`;
	db.query(query, (err, result) => {
		if (err) throw err;
		console.log('RESULT: ', result);
		res.json(result)
	});
	// articlesModel
	// 	.find({})
	// 	.then((result) => {
	// 		res.status(200).json(result);
	// 	})
	// 	.catch((err) => {
	// 		res.send(err);
	// 	});
};

const getArticlesByAuthor = (req, res) => {

	const auth=req.query.author;
	const query =`SELECT * FROM articles 
	INNER JOIN users ON users.id=author_id`;

	db.query(query,(err,result) => {
	const array=[]
	if(err)throw err;
	result.map((elem,i)=>{if(elem.firstName==auth){
	array.push({title:elem.title,description:elem.description})
	}})
	res.json(array)
	});

	
	// const author = req.query.author;
	// if (!author) return res.status(404).json('not found');
	// articlesModel
	// 	.find({ author })
	// 	.then((result) => {
	// 		res.status(200).json(result);
	// 	})
	// 	.catch((err) => {
	// 		res.send(err);
	// 	});
};

const getAnArticleById = (req, res) => {
	const _id = req.params.id;

	if (!_id) return res.status(404).json('not found');

	articlesModel
		.findOne({ _id })
		.populate('author', 'firstName -_id')
		.exec()
		.then((result) => {
			res.status(200).json(result);
		})
		.catch((err) => {
			res.send(err);
		});
};

const createNewArticle = (req, res) => {

	const { title, description, author_id } = req.body;
	const query = `INSERT INTO articles (title, description,author_id ) VALUES (?,?,?)`;
	const data = [title, description,author_id];
 	db.query(query, data, (err, results) => {
	console.log(results);
	res.json(results);

	// const { title, description, author } = req.body;
	// const article = new articlesModel({
	// 	title,
	// 	description,
	// 	author,
	});

	article
		.save()
		.then((result) => {
			res.status(201).json(result);
		})
		.catch((err) => {
			res.send(err);
		});
};

const updateAnArticleById = (req, res) => {

	const id = req.params.id;
	const {title,description} = req.body;
	const query = `UPDATE articles SET title=?, description = ? WHERE id=${id}`;
	const data = [title, description];
	db.query(query, data, (err, results) => {
	console.log(results);
	res.json(results)
	});


	// const id = req.params.id;
	// articlesModel
	// 	.findByIdAndUpdate(id, req.body, { new: true })
	// 	.then((result) => {
	// 		res.status(200).json(result);
	// 	})
	// 	.catch((err) => {
	// 		res.send(err);
	// 	});
};

const deleteArticleById = (req, res) => {

	const id = req.params.id;
	const query = `DELETE FROM articles WHERE id=${id}`;
	db.query(query, (err, results) => {
	console.log(results);
	res.json(results)
	});

	// const id = req.params.id;
	// articlesModel
	// .findByIdAndDelete(id)
	// .then((result) => {
	// res.status(200).json({
	// success: true,
	// message: `Success Delete atricle with id => ${id}`,
	// });
	// })
	// .catch((err) => {
	// res.send(err);
	// });
};

const deleteArticlesByAuthor = (req, res) => {

	const author = req.body.author;
	const query = `DELETE FROM article 
    WHERE author =? `;
    db.query(query,author, (err, result) => {
        if (err) throw err;
        console.log('RESULT: ', result);
        res.json(result)
      });
	  
	// const author = req.body.author;
	// articlesModel
	// 	.deleteMany({ author })
	// 	.then((result) => {
	// 		res.status(200).json({
	// 			success: true,
	// 			message: `Success Delete atricle with id => ${author}`,
	// 		});
	// 	})
	// 	.catch((err) => {
	// 		res.send(err);
	// 	});
};

module.exports = {
	getAllArticles,
	getArticlesByAuthor,
	getAnArticleById,
	createNewArticle,
	updateAnArticleById,
	deleteArticleById,
	deleteArticlesByAuthor,
};