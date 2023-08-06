import Jwt from "jsonwebtoken";

export default function validateToken(req,res,next){
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    if(!token) res.status(401).send('O token não foi enviado corretamente.');

    Jwt.verify(token,
        process.env.SECRET_JWT,
        (error,decoded) =>{
            if(error){
                return res.status(401).send('Token inválido.');
            }
            req.userId = decoded.id;
        }
    );
    next();
}