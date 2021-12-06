import { Router } from 'express';
import { createUser, deleteUser, getAllUsers, getUserById, loginUser, updateUser } from '../controller/user';
import { authByToken } from '../middleware/auth';
const route = Router();

route.get('/', (req, res) => {
    res.send('HI Home')
})

route.get('/all', async(req, res) => {
    try {
        const user = await getAllUsers();
        res.status(200).send(user)
    } catch (e) {   
        res.status(500).send(e)
    }
})

route.get('/get/:name', authByToken, async(req, res) => {
    try {
        const user = await getUserById(req.params.name)
        res.status(200).send(user)
    } catch (e) {
        res.status(500).send(`error get user ${e}`)
    }
})

route.post('/register', async(req, res) => {
    try {
        const user = await createUser(req.body)
        res.status(200).send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

route.post('/login', async(req, res) => {
    try {
        const user = await loginUser(req.body)
        res.status(200).send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

route.patch('/update/:name', async(req, res) => {
    try {
        const user = await updateUser(req.body, req.params.name)
        res.status(200).send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

route.delete('/delete/:name', async(req, res) => {
    try {
        const user = await deleteUser(req.body, req.params.name)
        res.status(200).send('user deleted')
    } catch (e) {
        res.status(500).send(e)
    }
})

export const userRoute = route;