export const read = (userId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(res => {
        return res.json();
    })
    .catch(err => {
        console.log(err)
    });
};

export const update = (userId, token, user) => {
    return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: user
    })
    .then(res => {
        return res.json();
    })
    .catch(err => {
        console.log(err);
    });
};

export const remove = (userId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(res => {
        return res.json();
    })
    .catch(err => {
        console.log(err)
    });
};


export const list = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/users`, {
        method: "GET"
    })
    .then(res => {
        return res.json();
    })
    .catch(err => {
        console.log(err)
    });
};

export const updateUser = (user, next) => {
    if(typeof window !== 'undefined') {
        let auth = JSON.parse(localStorage.getItem('jwt'));
        auth.user = user;
        localStorage.setItem('jwt', JSON.stringify(auth));
        next();
    }
};

export const follow = (userId, token, followId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/user/follow`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "applicatiomn/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({userId, followId})
    })
    .then(res => {
        return res.json();
    })
    .catch(err => {
        console.log(err);
    });
};

export const unfollow = (userId, token, unfollow) => {
    return fetch(`${process.env.REACT_APP_API_URL}/user/unfollow`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({userId, unfollow})
    })
    .then(res => {
        return res.json();
    })
    .catch(err => {
        console.log(err)
    });
};


export const findPeople = (userId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/user/findpeople/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(res => {
        return res.json();
    })
    .catch(err => {
        console.log(err)
    });
};

export const getChats = (senderId, recieverId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/chats/${senderId}/${recieverId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content=Type": "application/json"
        }
    })
    .then(res => {
        return res.json();
    })
    .catch(err => {
        console.log(err)
    });
};

export const getChatList = (senderId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/${senderId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    })
    .then(res => {
        return res.json();
    })
    .catch(err => {
        console.log(err)
    });
};

