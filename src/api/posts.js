/*---------------------------------------------------------------*
 *   Author: Prashant Gaurav                                     *
 *   App name : PMIT                                             *
 *   Licence: copyright, all rights reserved to ajnasoft         *
 *---------------------------------------------------------------*/
import config from '../config';

/* ------------------------------------------------------------- *
 *                     FETCH POSTS                               *
 * ------------------------------------------------------------- */
export const fetchPosts = async (authToken, data) => {
    console.log(data)
    const URL = config.baseUrl + 'posts';
    return await fetch(URL, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'token': authToken,
        },
        body: JSON.stringify(data)
    }).then((res) => res.json());
}

/* ------------------------------------------------------------- *
 *                     LIKE AND UNLIKE POSTS                     *
 * ------------------------------------------------------------- */
export const likePosts = async (authToken:string, postId:string) => {
    const URL = config.baseUrl + 'post/like';
    return await fetch(URL, {
        method: 'put',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'token': authToken,
        },
        body: JSON.stringify({postId: postId})
    }).then((res) => res.json());
}


/* ------------------------------------------------------------- *
 *                    SEARCH SUGESSATION                     *
 * ------------------------------------------------------------- */
export const getSuggestion = async (authToken:string, text:string) => {
    const URL = config.baseUrl + 'search/keyword';
    return await fetch(URL, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'token': authToken,
        },
        body: JSON.stringify({keyword: text})
    }).then((res) => res.json());
}


