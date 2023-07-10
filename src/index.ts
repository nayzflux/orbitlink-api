import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import authRoutes from "./routes/authRoutes";
import * as dotenv from 'dotenv';

dotenv.config({path: '.env'})

import './utils/db';
import linkRoutes from "./routes/linkRoutes";
import {Request, Response} from "express";
import {resolveLink} from "./middlewares/linkMiddleware";
import {lookup} from "./utils/ip";
import {extractUserAgentInfo} from "./utils/userAgent";
import LinkModel from "./models/linkModel";
import userRoutes from "./routes/userRoutes";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import * as cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.set('trust proxy', true);

/**
 * MIDDLEWARES
 */

app.use(rateLimit({
    windowMs: 2 * 60 * 1000, // 2 minutes
    max: 50, // 50 requêtes maximum pendant la période définie
    message: 'Too many request, please re-try in 2 minutes!',
}));
app.use(cookieParser());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors({
    origin: process.env.CLIENT_URL, // Définir les origines autorisées
    methods: ['GET', 'POST', 'DELETE', 'PATCH'], // Définir les méthodes HTTP autorisées
    credentials: true
}));
app.use(helmet());

/**
 * ROUTES
 */

// AUTH
app.use('/api/auth', authRoutes);

// USER
app.use('/api/users', userRoutes)

// LINK
app.use('/api/links', linkRoutes);


// URL
app.get('/:query', resolveLink, async (req: Request, res: Response) => {
    const {link} = res.locals;

    // Instant response
    res.status(301).redirect(link.destinationURL);

    console.log("ok")

    const ip = req.header('x-forwarded-for') || req.socket.remoteAddress || '';
    const {country, city} = await lookup(ip.toString());
    const {os, browser, device } = extractUserAgentInfo(req.header('User-Agent') || '')
    await LinkModel.findByIdAndUpdate(link._id, { $push: {'statistics.clicks': {country, city, os, device, browser, createdAt: Date.now()}}, 'statistics.clickNumber': (parseInt(link.statistics.clickNumber) + 1)})
})

app.listen(PORT, () => console.log('Server is listening on port : ' + PORT));