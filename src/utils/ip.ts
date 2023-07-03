import IPData from 'ipdata';
const ipdata = new IPData(process.env.IP_DATA_API_KEY || 'APIKEY');

export const lookup = async (ip: string) => {
    const fields = ['city', 'country_code'];
    const info = await ipdata.lookup(ip, undefined, fields)
    return {country: info.country_code, city: info.city};
}