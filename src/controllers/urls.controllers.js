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

export async function deleteUrl(req,res){
    const {id} = req.params;
    try{
        const url = await db.query(`SELECT * FROM urls WHERE id=$1`, [id]);

        if (url.rowCount === 0) return res.status(404).send({message:'Impossível excluir, link não encontrado.'});

        if (url.rows[0].userId !== req.userId) return res.status(401).send({message:'Impossível excluir, link vinculado a outro usuário.'});

        const deleteUrl = await db.query(`DELETE FROM urls WHERE id=$1`, [id]);
        return res.sendStatus(204);
    }catch(err){
        res.status(500).send(err);
    }
}

export async function listUserUrls (req,res){
    try{
        const { rows: [userData]} = await db.query(`
        SELECT
            u.id AS id,
            u.name AS name,
            COALESCE(SUM(url."visitCount"), 0) AS "visitCount",
            json_agg(
                json_build_object(
                    'id', url.id,
                    'shortUrl', url."shortUrl",
                    'url', url.url,
                    'visitCount', url."visitCount"
                )
            ) AS "shortenedUrls"
        FROM users u
        LEFT JOIN urls url ON u.id = url."userId"
        WHERE u.id=$1
        GROUP BY u.id
        ORDER BY u.id;
        `, [req.userId]);

        if (!userData) return res.status(404).send({ message: "Não foi possível encontrar dados desse usuário."});

        res.status(200).send(userData);
    }catch(err){
        res.status(500).send(err);
    }
}

export async function usersRanking(req,res){
    try{
        const { rows: rankingData } = await db.query(`
        SELECT
            u.id AS id,
            u.name AS name,
            COUNT(url."id") AS "linksCount",
            COALESCE(SUM(url."visitCount"), 0) AS "visitCount"
        FROM
            users u
        LEFT JOIN
            urls url ON u.id = url."userId"
        GROUP BY
            u.id
        ORDER BY
            visitCount DESC
        LIMIT 10;
        `);

        res.status(200).send(rankingData);
    }catch(err){
        res.status(500).send(err);
    }
}