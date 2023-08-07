import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export function generateToken(id){
    return Jwt.sign({ id: id }, process.env.SECRET_JWT || "chaveSecreta", { expiresIn: 86400 })
}

export function encryptPassword(password){
    return bcrypt.hashSync(password, 10);
}

export function comparePassword(password, dbPassword){
    return bcrypt.compareSync(password, dbPassword);
}