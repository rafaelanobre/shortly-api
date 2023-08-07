import { db } from "../database/database.connection.js";

export async function insertNewShortUrl(userId,shortUrl, url){
    return db.query(
        `INSERT INTO urls
            ("userId", "shortUrl", url, "visitCount")
        VALUES ($1,$2,$3,0)
        RETURNING "userId", "shortUrl", url, "visitCount", id`,
        [userId, shortUrl, url]
    );
}
export async function selectUrlById(id){
    return db.query(`
        SELECT id, "shortUrl", url
        FROM urls
        WHERE id=$1
    `, [id]);
}

export async function updateUrlCount(shortUrl){
    return db.query(`
        UPDATE urls
        SET "visitCount" = "visitCount" + 1
        WHERE "shortUrl" = $1
        RETURNING "url"
    `, [shortUrl]);
}

export async function deleteUrl(id, userId){
    return db.query(`
        DELETE FROM urls
        WHERE id = $1 AND "userId" = $2
        RETURNING *
    `, [id, req.userId]);
}

export async function selectUserUrls(userId){
    return db.query(`
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
    `, [userId]);
}

export async function selectRanking(){
    return db.query(`
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
            "visitCount" DESC
        LIMIT 10;
    `);
}