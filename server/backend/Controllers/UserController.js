const { User } = require('../schema/userSchema')
const bcrypt = require('bcryptjs')

const createUser = async (req,res) => {


    const emailExist = await User.find({user_email: req.body.email});

    if(emailExist.length !== 0){
        return res.status(200).json({statu: 400, message: 'Email Already Exsists.'})
    }
    

    // const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(req.body.password,10)


    let user = new User({
        user_fullname: req.body.fullname,
        user_email: req.body.email,
        user_password: hashedPassword,
    })

    user = await user.save();

    if(!user) return res.status(200).json({status: 400, message: 'User Cannot Be Saved'})

    res.status(200).json({status:200, message: 'User Created'})
}


module.exports = {
    createUser
}