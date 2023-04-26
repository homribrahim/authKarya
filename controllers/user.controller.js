const User = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.signup = (req, res) => {

    console.log(req.body)
    const data = {
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
    }

    const _user = new User(data);

    _user.save().then(
        () => {
            res.status(200).json({ message: 'User Successfully Added To The Database !' })
        }
    )
        .catch(
            () => {
                res.status(400).json({ message: 'User Not Created !' })
            }
        )

}
exports.signin = async (req, res) => {
    /* const email = req.body.email;
   const password = req.body.password; */

    const { email, password } = req.body
    const user = await User.findOne({ email: email })  /*Ay action m3a l base 5amem fel model*/

    if (!user) {
        return res.status(400).json({ message: 'Email Not Found !' })
    }

    bcrypt.compare(password, user.password).then(
        (isMatch) => {
            if (isMatch) {// generate token
                const token = jwt.sign({ data: { id: user._id } }, process.env.CLE) //choose data to make them token
                { expiresIn: '1h' }
                return res.status(200).json({ message: 'Success !', token: token, user: user })
            }
            else {
                return res.status(400).json({ message: 'Wrong Password !' }
                )
            }
        }
    )


}





