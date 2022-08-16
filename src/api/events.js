/* ----------------------------------------------- *
 *       @flow                                     *
 *       Author: Prashant Gaurav                   *
 * ----------------------------------------------- */
import config from '../config';



/* -------------------------------------- *
 *           Get Events                   *
 * -------------------------------------- */
export const getEvents = async (authToken: string, requestNumber: number, cityId: number) => {
    const URL = config.baseUrl + 'posts';
    return await fetch(URL, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'token': authToken,
        },
        body: JSON.stringify({requestNumber, cityId})
    }).then((res) => res.json());
}



/* -------------------------------------- *
 *           Like Events                  *
 * -------------------------------------- */
export const likeEvents = async (authToken: string, postId: string) => {
    const URL = config.baseUrl + 'post/like';
    console.log(postId);
    return await fetch(URL, {
        method: 'put',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'token': authToken,
        },
        body: JSON.stringify({postId: postId})
    }).then((res) => res.json())
}






/* -------------------------------------- *
 *           Like Events                  *
 * -------------------------------------- */
export const eventDetails = async (authToken, data) => {
    const URL = config.baseUrl + 'posts/details';
    console.log(URL)
    return await fetch(URL, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'token': authToken,
        },
        body: JSON.stringify(data)
    }).then((res) => res.json())
}

