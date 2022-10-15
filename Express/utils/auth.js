import {User} from "../resources/user/user.model.js";
import jwt from "jsonwebtoken";

export const newToken = user => {
    return jwt.sign({id: user.id}, 'shhhhh');
}

export const verifyToken = token =>
    new Promise((resolve, reject) => {
        jwt.verify(token, 'shhhhh', (err, payload) => {
            if (err) return reject(err)
            resolve(payload)
        })
    })

export const signup = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({
            message: 'Need both email and password'
        })
    }

    // try {
        const user = await User.create(req.body)
        console.log('user', user);
        const token = newToken(user);
        console.log('token', token);
        return res.status(201).send({token})
    // } catch (e) {
    //     return res.status(500).end()
    // }
}

export const signin = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({message: 'need email and password'})
    }

    const invalid = {message: 'Invalid email and passoword combination'}

    try {
        const user = await User.findOne({email: req.body.email})
            // selecting the `email` and `password` fields
            .select('email password')
            .exec()

        if (!user) {
            return res.status(401).send(invalid)
        }

        const match = await user.checkPassword(req.body.password)

        if (!match) {
            return res.status(401).send(invalid)
        }

        const token = newToken(user)
        return res.status(201).send({token})
    } catch (e) {
        console.error(e)
        res.status(500).end()
    }
}

export const protect = async (req, res, next) => {
    const bearer = req.headers.authorization

    if (!bearer || !bearer.startsWith('Bearer ')) {
        return res.status(401).end()
    }

    const token = bearer.split('Bearer ')[1].trim()
    let payload
    try {
        payload = await verifyToken(token)
    } catch (e) {
        return res.status(401).end()
    }

    const user = await User.findById(payload.id)
        .select('-password')
        .lean()
        .exec()

    if (!user) {
        return res.status(401).end()
    }

    req.user = user
    next()
}
