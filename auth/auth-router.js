const router = require('express').Router();
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Users = require("../users/users-model")
const restrict = require("../auth/authenticate-middleware")
//require("dotenv").config();


router.get("/users", restrict("normal"), async (req, res, next) => {
	try {
		res.json(await Users.find())
	} catch(err) {
		next(err)
	}
})

router.post("/register", async (req, res, next) => {
	try {
		 const { username, password} = req.body
		 const user = await Users.findBy({ username }).first()

		 if (user) {
	    	return res.status(409).json({
				message: "Username is already taken",
		 	})
		 }

		const newUser = await Users.add({
			username,
			password: await bcrypt.hash(password, 14)
		})

		res.status(201).json(newUser)
	} catch(err) {
		next(err)
	}
})

router.post("/login", async (req, res, next) => {
	try {
		const { username, password } = req.body
		const user = await Users.findBy({ username }).first()
		
		if (!user) {
			return res.status(401).json({
				message: "Invalid Credentials",
			})
		}

		// hash the password again and see if it matches what we have in the database
		const passwordValid = await bcrypt.compare(password, user.password)

		if (!passwordValid) {
			return res.status(401).json({
				message: "Invalid Credentials",
			})
    }
    
    const payload = {
			userId: user.id,
			username: user.username,
			userRole: "admin", // this value would usually come from the database
		}

		res.json({
			message: `Welcome ${user.username}!`,
      token: jwt.sign(payload, process.env.JWT_SECRET),
		})
	} catch(err) {
		next(err)
	}
})
module.exports = router;
