const usersModel = require('./../../db/models/users');
const db = require('./../../db/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// const login = (req, res) => {
// 	const { email, password } = req.body;
// 	usersModel
// 		.authenticateBasic(email, password)
// 		.then((result) => {
// 			if (result[1] === 200)
// 				return res.status(result[1]).json({ token: result[0] });

// 			res.status(result[1]).json(result[0]);
// 		})

// 		.catch((err) => {
// 			res.send(err);
// 		});
// }
const login = async (req, res) => {
	try {
	  const { email, password } = req.body;
	  const query = `SELECT * FROM users WHERE email = "${email}"`;
	  db.query(query, async (err, result) => {
		if (err) throw err;
		console.log("RESULT: ", result);
	if (!result[0]) return res.status(400).json("The email doesn't exist");
	const valid = await bcrypt.compare(password, result[0].password);
	if (valid) {
	  const payload = {
		userId: result[0].id,
		country: result[0].country,
		role: result[0].role_id,
	  };
        const options = {
			expiresIn: "60m",
		  };
		  return res
			.status(200)
			.json(jwt.sign(payload, process.env.SECRET, options));
		}

		return res.status(403).json("The password you’ve entered is incorrect");
	  });
	} catch (error) {
	  throw new Error(error.message);
	}
	};

	
module.exports = {
	login,
};


