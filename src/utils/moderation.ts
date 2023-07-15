import {loadJsonArrayFromFile} from "./utils";

const banDomains = require('./list/bandomains.json');
const banWords = require('./list/banwords.json');
const whitelist = require('./list/whitelist.json')
const pornDomains = loadJsonArrayFromFile(__dirname + '/list/porns.txt');

export const validateUrl = (url: any) => {
    url = url.replace('http://', '').replace('https://', '');
    const parts = url.split('/')
    const domain = parts[0];

    if (whitelist.includes(domain)) {
        return true;
    }

    for (const pornDomain of pornDomains) {
        if (url.includes(pornDomain)) {
            console.log(`[FILTER] ${url} includes banned porns (${pornDomain})`)
            return false;
        }
    }

    for (const banDomain of banDomains) {
        if (url.includes(banDomain)) {
            console.log(`[FILTER] ${url} includes banned domain (${banDomain})`)
            return false;
        }
    }

    for (const banWord of banWords) {
        if (url.includes(banWord)) {
            console.log(`[FILTER] ${url} includes banned word (${banWord})`)
            return false;
        }
    }

    return true;
}