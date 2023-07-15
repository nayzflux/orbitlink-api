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
import {randomInt} from "crypto";
import UserModel from "./models/userModel";
import {formatNumber} from "./utils/utils";

const app = express();
const PORT = process.env.PORT || 5000;

app.set('trust proxy', true);

/**
 * MIDDLEWARES
 */

app.use(helmet());
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

/**
 * ROUTES
 */

// AUTH
app.use('/api/auth', authRoutes);

// USER
app.use('/api/users', userRoutes)

// LINK
app.use('/api/links', linkRoutes);

app.get('/api/stats', async (req: Request, res: Response) => {
    const userNumber = await UserModel.count();
    const links = await LinkModel.find();

    const linkNumber = links.length;
    let clickNumber = 0;

    for (const link of links) {
        clickNumber += link?.statistics?.clickNumber || 0;
    }

    return res.status(200).json({users: formatNumber(userNumber), clicks: formatNumber(clickNumber), links: formatNumber(linkNumber)});
})


// URL
app.get('/api/:query', resolveLink, async (req: Request, res: Response) => {
    const {link} = res.locals;
    const password = req.headers?.authorization;

    // Si le lien n'est pas encore disponible
    if (link.releaseDateEnabled && (Date.now() < new Date(link.releaseDate).getTime())) {
        return res.status(400).json({message: "Le lien n'est pas encore disponible"})
    }

    // Si le lien a expiré
    if (link.expirationDateEnabled && (Date.now() > new Date(link.expirationDate).getTime())) {
        return res.status(400).json({message: "Le lien a expiré"})
    }

    if (link.passwordProtectionEnabled && (!password)) {
        return res.status(401).json({message: "Un mot de passe est requis"})

    }

    const doesPasswordMatch = await link.comparePassword(password);

    if (link.passwordProtectionEnabled && !doesPasswordMatch) {
        return res.status(403).json({message: "Les mot de passes ne correspondent pas"})
    }

    res.status(200).json({destinationURL: link.destinationURL});

    const ip = req.header('x-forwarded-for') || req.socket.remoteAddress || '';
    const referer = req.header('referer');
    const {country, city} = await lookup(ip.toString());
    const {os, browser, device } = extractUserAgentInfo(req.header('User-Agent') || '')
    await LinkModel.findByIdAndUpdate(link._id, { $push: {'statistics.clicks': { referer, country, city, os, device, browser, createdAt: Date.now()}}, 'statistics.clickNumber': (parseInt(link.statistics.clickNumber) + 1)})
})

const mockData = async () => {
    const c = ["France", "États-Unis", "France", "Royaume-Uni", "France", "Espagne", "Allemagne", "Canada", "Italie", "Finlande", "Suède", "Autriche"]
    const b = ["Chrome", "Chrome","Chrome", "Safari","Firefox", "Firefox", "Opera"]

    let day = 1;
    let i = 0;
    while (i <= 632) {
        console.log(i)
        const perDay = randomInt(15, 83);
        const date = Date.now() - randomInt(1, 60) * 24 * 60 * 60 * 100;
        console.log("Adding " + perDay + " clicks on " + date)

        let i2 = 0;
        while (i2 <= perDay) {
            i2++;

            const country = c[randomInt(0, c.length-1)]
            const browser = b[randomInt(0, b.length-1)]
            await LinkModel.findByIdAndUpdate("64a97dc67e78aeac2aef0503", { $push: {'statistics.clicks': {country, browser, createdAt: date}}, $inc: {'statistics.clickNumber': 1}});
        }

        day++;
        i += perDay;
    }
}

app.listen(PORT, () => console.log('Server is listening on port : ' + PORT));