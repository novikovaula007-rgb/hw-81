import {Box, Button, CircularProgress, TextField, Typography} from "@mui/material";
import {useState} from "react";
import React from "react";
import {toast} from "react-toastify";
import axiosAPI from "../axiosAPI.ts";
import type {ILinkAPI} from "../types";

const LinkShortener = () => {
    const [linkForm, setLinkForm] = useState('');
    const [shortLink, setShortLink] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setLoading(true)
            if (linkForm.trim()) {
                const newLink = await axiosAPI.post<ILinkAPI>('/', {originalLink: linkForm});
                setShortLink(newLink.data.shortURL);
                console.log(shortLink)
            } else {
                toast.error('The link field cannot be empty.');
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);

        }


    }

    return (
        <Box>
            <Typography variant='h2' sx={{mb: '15px'}}>
                Shorten your link!
            </Typography>
            <form
                onSubmit={onSubmit}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginBottom: '15px'
                }}
            >
                <TextField
                    id='link'
                    name='link'
                    placeholder='Enter URL here'
                    value={linkForm}
                    sx={{width: '350px', mb: '15px'}}
                    onChange={(e) => setLinkForm(e.target.value)}
                ></TextField>
                <Button
                    variant="contained"
                    type='submit'
                    disabled={loading}
                >Shorten!</Button>
            </form>
            {loading && <CircularProgress/>}
            {!loading && shortLink && <Box>
                <Typography>
                    Your link now looks like this:
                </Typography>
                <Typography>
                    <a href={'http://localhost:8000/' + shortLink}>{'http://localhost:8000/' + shortLink}</a>
                </Typography>
            </Box>}
        </Box>
    );
};

export default LinkShortener;