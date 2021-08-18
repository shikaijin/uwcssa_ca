import React, { useEffect } from 'react';
import Navbar from "../components/navbar/Navbar";
import { connect } from 'react-redux';
import { checkAuthenticated, load_user } from '../actions/auth';
// https://youtu.be/KiJFHBQ44sw?t=2584
const Layout = ({ checkAuthenticated, load_user, children }) => {
    useEffect(() => {
        checkAuthenticated();
        load_user();
    }, []);

    return (
        <div>
            <Navbar />
            {children}
        </div>
    );
};

export default connect(null, { checkAuthenticated, load_user })(Layout);