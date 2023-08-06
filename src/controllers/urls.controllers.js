import { nanoid } from "nanoid";
import { db } from "../database/database.connection.js";

export default async function shortenUrl(req,res){
    const {url} = req.body;
	try{
        const shortUrl = nanoid(13);
        const resultUrl = await db.query(
            `INSERT INTO urls ("userId", "shortUrl", url, "visitCount") VALUES ($1,$2,$3,0) RETURNING "userId", "shortUrl", url, "visitCount", id`,
            [req.userId, shortUrl, url]
        );
        const urlId = resultUrl.rows[0].id;

        res.status(201).send({ id: urlId, shortUrl });
    }catch(err){
        res.status(500).send(err);
    }
}