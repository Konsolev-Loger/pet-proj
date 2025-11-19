const userRouter = require('express').Router();
const userController = require('../controllers/userController');
const { verifyRefreshToken } = require('../middlewares/veryfyToken');
// const router = express.Router()

userRouter.post('/registration', userController.registration);
userRouter.post('/login', userController.login);
userRouter.get('/logout', userController.logout);
userRouter.get('/refreshTokens', verifyRefreshToken, userController.refreshTokens); // ТУТ РЕФРЕШТОКЕН



module.exports = userRouter;

// {
//     "username": "leo",
//     "email": "ocuperusha!@gmil.com",
//     "password": "123aaass!@!@QQQ"
// }

// eyJ1c2VyIjp7ImlkIjozLCJlbWFpbCI6Im9jdXBlcnVzaGEhQGdtaWwuY29tIiwidXBkYXRlZEF0IjoiMjAyNS0xMS0xMVQxMzowNTowNi4zMDNaIiwiY3JlYXRlZEF0IjoiMjAyNS0xMS0xMVQxMzowNTowNi4zMDNaIiwiZnVsbE5hbWUiOm51bGwsInBob25lIjpudWxsLCJyb2xlIjpudWxsfSwiaWF0IjoxNzYyODY2MzA2LCJleHAiOjE3NjI4NzEzMDZ9
