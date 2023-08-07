import { nanoid } from "nanoid";
import { insertNewShortUrl, selectRanking, selectUrlById, selectUserUrls, updateUrlCount, deleteUrlDB, selectAllUrlById} from "../repositories/urls.repository.js";

export async function shortenUrl(req,res){
    const {url} = req.body;
	try{
        const shortUrl = nanoid(13);
        const { rows: [resultUrl]} = await insertNewShortUrl(req.userId,shortUrl,url);
        res.status(201).send({ id: resultUrl.id, shortUrl });
    }catch(err){
        res.status(500).send(err);
    }
}

export async function detailsUrl(req,res){
    const {id} = req.params;
    try{
        const { rows: [url]} = await selectUrlById(id);
        if (!url) return res.sendStatus(404);
        res.status(200).send(url);
    }catch(err){
        res.status(500).send(err);
    }
}

export async function openUrl(req,res){
    const {shortUrl} = req.params;
    try{
        const { rows: [url] } = await updateUrlCount(shortUrl);
        if (!url) return res.sendStatus(404);
        res.redirect(url.url);
    }catch(err){
        res.status(500).send(err);
    }
}

export async function deleteUrl(req,res){
    const {id} = req.params;
    try{
        const url = await selectAllUrlById(id);
        if (url.rowCount === 0) return res.status(404).send({message:'Impossível excluir, link não encontrado.'});
        if (url.rows[0].userId !== req.userId) return res.status(401).send({message:'Impossível excluir, link vinculado a outro usuário.'});

        await deleteUrlDB(id);
        return res.sendStatus(204);
    }catch(err){
        res.status(500).send(err);
    }
}

export async function listUserUrls (req,res){
    try{
        const { rows: [userData]} = await selectUserUrls(req.userId);
        if (!userData) return res.status(404).send({ message: "Não foi possível encontrar dados desse usuário."});
        res.status(200).send(userData);
    }catch(err){
        res.status(500).send(err);
    }
}

export async function usersRanking(req,res){
    try{
        const { rows: rankingData } = await selectRanking();
        res.status(200).send(rankingData);
    }catch(err){
        res.status(500).send(err);
    }
}