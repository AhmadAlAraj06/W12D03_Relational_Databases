// const roleModel = require('./../../db/models/role');
const db = require('./../../db/db');


const createNewRole = (req, res) => {
	const { role } = req.body;


	// const newRole = new roleModel({
	// 	role,
	const query = `INSERT INTO roles (role) VALUES (?)`;
	const data = [role];
	db.query(query, data, (err, results) => {
		console.log(results);
		res.json(results)
	});

	// newRole
	// 	.save()
	// 	.then((result) => {
	// 		res.status(201).json(result);
	// 	})
	// 	.catch((err) => {
	// 		res.send(err);
	// 	});
};

module.exports = {
	createNewRole,
};