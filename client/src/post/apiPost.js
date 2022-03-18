import { upload } from "@testing-library/user-event/dist/upload";

export const create = (userId, token, post) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/new/${userId}`, {
        method: "POST",
        headers: {
            Accecpt: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: post
    })
    .then(res => {
        return res.json();
    })
    .catch(err => {
        console.log(err)
    });
};

export const update = (postId, token, post) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`, {
        method: "PUT",
        headers: {
            Accecpt: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: post
    })
    .then(res => {
        return res.json()
    })
    .catch(err => {
        console.log(err)
    })
};

export const list = (skip) => {
    return fetch(`${process.env.REACT_APP_API_URL}/posts?skip=${skip}`, {
        method: "GET"
    })
    .then(res => {
        return res.json()
    })
    .catch(err => {
        console.log(err)
    })
};

export const countTotalPosts = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/count/posts`, {
        method: "GET"
    })
    .then(res => {
        return res.json()
    })
    .catch(err => {
        console.log(err)
    })
};

export const singlePost = (postId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`, {
        method: "GET"
    })
    .then(res => {
        return res.json()
    })
    .catch(err => {
        console.log(err)
    })
};

export const listByUser = (userId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/by/${userId}`, {
        method: "GET",
        headers: {
            Accecpt: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(res => {
        return res.json()
    })
    .catch(err => {
        console.log(err)
    })
};

export const remove = (postId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`, {
        method: "DELETE",
        headers: {
            Accecpt: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(res => {
        return res.json()
    })
    .catch(err => {
        console.log(err);
    })
};

export const like = (userId, token, postId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/like`, {
        method: "PUT",
        headers: {
            Accecpt: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({userId, postId})
    })
    .then(res => {
        return res.json()
    })
    .catch(err => {
        console.log(err)
    })
};

export const unlike = (userId, token, postId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/unlike`, {
        method: "PUT",
        headers: {
            Accecpt: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({userId, postId})
    })
    .then(res => {
        return res.json()
    })
    .catch(err => {
        console.log(err)
    })
};

export const comment = (userId, token, postId, comment) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/comment`, {
        method: "PUT",
        headers: {
            Accecpt: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({userId, postId, comment})
    })
    .then(res => {
        return res.json()
    })
    .catch(err => {
        console.log(err)
    })
};

export const uncomment = (userId, token, postId, comment) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/comment`, {
        method: "PUT",
        headers: {
            Accecpt: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({userId, postId, comment})
    })
    .then(res => {
        return res.json()
    })
    .catch(err => {
        console.log(err)
    })
};

