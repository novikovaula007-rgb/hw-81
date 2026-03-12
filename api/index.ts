import express from "express";
import cors from "cors";
import mongoose from 'mongoose';
import Link from "./models/Link";

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
        const originalLink = await Link.findOne({shortURL: req.body.params});

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

run().catch((err) => console.error(err));

