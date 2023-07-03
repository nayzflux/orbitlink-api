const UAParser = require('ua-parser-js');

export const extractUserAgentInfo = (userAgent: string) => {
    let parser = new UAParser(userAgent); // you need to pass the user-agent for nodejs
    // let parserResults = parser.getResult();
    return {os: parser.getOS().name, browser: parser.getBrowser().name, device: parser.getDevice().type || 'desktop'}

}