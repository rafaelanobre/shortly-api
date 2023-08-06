import { nanoid } from "nanoid";
import { db } from "../database/database.connection.js";

export async function shortenUrl(req,res){
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

export async function detailsUrl(req,res){
    const {id} = req.params;

    try{
        const { rows: [url]} = await db.query(`SELECT id, "shortUrl", url FROM urls WHERE id=$1`, [id]);
        if (url == undefined) return res.sendStatus(404);

        res.status(200).send(url);
    }catch(err){
        res.status(500).send(err);
    }
}
export async function openUrl(req,res){
    const {shortUrl} = req.params;
    try{
        const { rows: [url]} = await db.query(`SELECT * FROM urls WHERE "shortUrl"=$1`, [shortUrl]);
        if (url == undefined) return res.sendStatus(404);

        const updatedVisitCount = url.visitCount + 1;
        await db.query(`UPDATE urls SET "visitCount"=$1 WHERE "shortUrl"=$2`, [updatedVisitCount, shortUrl]);

        res.redirect(url.url);
    }catch(err){
        res.status(500).send(err);
    }
}