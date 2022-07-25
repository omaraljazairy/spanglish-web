import { apiUri } from '../constants'
/**
 * functions that make http requests to the api
 */

export async function fetchLanguages () {
    var url = apiUri + 'language/all/'
    // console.log('url => ', url)
    // return url
    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: {}
        })
        let body = res.json()
        return body
    } catch (err) {
        console.error("error fetching ip: ", err);
        return err
    }
}