import express from "express";
import cors from "cors";
import mongoose from 'mongoose';
import Link from "./models/Link";
import {customAlphabet} from "nanoid";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const run = async () => {
    await mongoose.connect('mongodb://localhost/link-shorten-js-30-ulyana');

    app.listen(port, () => {
        console.log("Server running on port " + port)
    })

    process.on('exit', () => {
        mongoose.disconnect();
    });
};

app.get('/:shortURL', async (req, res) => {
    try {
        const {shortURL} = req.params;
        const originalLink = await Link.findOne({shortURL});
        if (originalLink) {
            return res.status(301).redirect(originalLink.originalURL);
        } else {
            return res.status(404).send('URL not found');
        }
    } catch (e) {
        console.error(e)
        res.status(500).send(e);
    }
})

app.post('/', async (req, res) => {
    try {
        const {originalLink} = req.body;

        if (!originalLink) {
            return res.status(404).send('URL is required');
        }

        let shortURL;
        let isUnique = false;

        while (!isUnique) {
            const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            const nanoid = customAlphabet(alphabet, 7);
            shortURL = nanoid();
            const existing = await Link.findOne({shortURL});
            if (!existing) {
                isUnique = true;
            }
        }

        const newLink = new Link({
            originalURL: originalLink,
            shortURL: shortURL
        })

        await newLink.save();
        return res.send(newLink)
    } catch (e) {
        console.error(e)
        res.status(500).send(e);
    }
})

run().catch((err) => console.error(err));

