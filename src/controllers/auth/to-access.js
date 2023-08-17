export const loginController = (req,res) => {
    console.log(req.body)
    res.send('Login')
}

export const registerController = (req,res) => {
    res.send('Register')
}