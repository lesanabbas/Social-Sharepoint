import { type } from "@testing-library/user-event/dist/type";

export const signup = (user) => {
    return fetch(`${process.env.REACT_APP_API_URL}/signup`, {
        method: "POST",
        header: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(res => {
        return res.json()
    })
    .catch(err => {
        console.log(err)
    });
};

export const signin = (user) => {
    return fetch(`${process.env.REACT_APP_API_URL}/signin`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application.json"
        },
        body: JSON.stringify(user)
    })
    .then(res => {
        return res.json()
    })
    .catch(err => {
        console.log(err)
    });
};

export const authenticate = (jwt, callback) => {
    if(typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(jwt))
        callback();
    }
};

export const signout = (callback) => {
    if(typeof window !== "undefined") {
        localStorage.removeItem("jwt");
    }
    callback();
    return fetch(`${process.env.REACT_APP_API_URL}/signout`, {
        method: "GET"
    })
    .then(res => {
        console.log("signout", res);
        return res.json();
    })
    .catch(err => {
        console.log(err)
    });
};

export const isAuthenticated = () => {
    if(typeof window == "undefined") {
        return false;
    }
    if(localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem('jwt'))
    } else {
        return false;
    }
};

export const forgotPassword = email => {
    console.log("email: ", email);
    return fetch(`${process.env.REACT_APP_API_URL}/forgot-password/`, {
        method: "PUT",
        header: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
    })
    .then(res => {
        console.log("forgot password response: ", res);
        return res.json();
    })
    .catch(err => {
        console.log(err);
    });
};

export const resetPassword = resetInfo => {
    return fetch(`${process.env.REACT_APP_API_URL}/reset-password/`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(resetInfo)
    })
    .then(res => {
        console.log("Reset Password response: ",res);
        return res.json();
    })
    .catch(err => {
        console.log(err);
    })
};

export const socialLogin = user => {
    return fetch(`${process.env.REACT_APP_API_URL}/social-login/`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(res => {
        console.log("signin response: ", res);
        return res.json();
    })
    .catch(err => {
        console.log(err);
    })
};