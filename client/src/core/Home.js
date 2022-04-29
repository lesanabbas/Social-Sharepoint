import React from 'react';

import Posts from '../post/Posts';

const Home = () => (
    <>
        <div className="container">
            <Posts />
        </div>
        <footer className="page-footer font-small" style={{ background: "black" }}>
            <div className="container">
                <p className="text-center" style={{ color: "#fff", fontSize: "large", margin: "0", padding: "20px" }}>
                    Made with by
                        <a href="https://github.com/shahshubh" style={{ color: "white" }} > Shubh Shah </a>
                </p>
            </div>
        </footer>
    </>
);

export default Home;