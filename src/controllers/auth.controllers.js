import { getUserByEmail, newUserIfEmailNotExist } from "../repositories/auth.repository.js";
import { comparePassword, encryptPassword, generateToken } from "../services/auth.services.js";

export async function signIn(req,res){
    const {email, password} = req.body;
    try{
        const { rows: [user]} = await getUserByEmail(email);
        if (!user) return res.status(401).send({message:"Usuário não encontrado"});

        if (!comparePassword(password, user.password)) return res.status(401).send({message:"Senha incorreta"});

        const token = generateToken(user.id);
        res.status(200).send({token});
    }catch(err){
        res.status(500).send(err);
    }
}

export async function signUp(req,res){
    const {name, email, password} = req.body;
    try{
        const encryptedPassword = encryptPassword(password);

        const newUser = await newUserIfEmailNotExist(name, email, encryptedPassword)
        if (newUser.rowCount === 0) return res.status(409).send({ message: "Usuário já cadastrado" });

        res.sendStatus(201);
    }catch(err){
        res.status(500).send(err);
    }
}