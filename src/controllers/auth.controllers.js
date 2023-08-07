import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

export async function signIn(req,res){
    const {email, password} = req.body;

    try{
        const userResult = await db.query(`SELECT * FROM users WHERE email=$1`, [email]);
        if (userResult.rowCount===0) return res.status(401).send({message:"Usuário não encontrado"});

        const user = userResult.rows[0]; 

        const passwordCorrect = bcrypt.compareSync(password, user.password);
        if (!passwordCorrect) return res.status(401).send({message:"Senha incorreta"});

        const token = ((id) => Jwt.sign({ id: id }, process.env.SECRET_JWT, { expiresIn: 86400 }))(user.id);

        res.status(200).send({token: token});

    }catch(err){
        res.status(500).send(err);
    }
}

export async function signUp(req,res){
    const {name, email, password} = req.body;
    try{
        const user = await db.query(`SELECT * FROM users WHERE email=$1`, [email]);
        if (user.rowCount>0) return res.status(409).send({message:"Usuário já cadastrado"});

        const encryptedPassword = bcrypt.hashSync(password, 10);

        await db.query(`INSERT INTO users (name, email, password) VALUES ($1,$2,$3)`, [name,email,encryptedPassword]);
        res.sendStatus(201);
    }catch(err){
        res.status(500).send(err);
    }
}