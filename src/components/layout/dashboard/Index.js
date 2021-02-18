import React, { useState, useEffect, useContext } from 'react';
import { HashRouter as Router, Route, Switch, useHistory, Redirect } from 'react-router-dom';
import { AuthContext } from './../../context/auth';
import Navbar from "./Navbar.js";
import Sidebar from "./Sidebar.js";
import TransactionList from './../../pages/transactions/List';
import TransactionDetailPrint from '../../pages/transactions/DetailPrint';

export default function Index() {

    let history = useHistory();
    let authContext = useContext(AuthContext);

    useEffect(() => {
        if (!authContext.userState) history.push('/login');
    });

    return (
        <>
            <Sidebar />
            <div className="relative md:ml-64 bg-gray-200">
                <Navbar />
                {/* Header */}
                <div className="relative bg-pink-600 md:pt-32 pb-32 pt-12">
                    <div className="px-4 md:px-10 mx-auto w-full">
                    </div>
                </div>
                <div className="px-4 md:px-10 mx-auto w-full -m-24">
                    <Router>
                        <Switch>
                            <Route path="/transactions" exact component={TransactionList} />
                            <Route path="/transactions/print" component={TransactionDetailPrint} />
                            <Redirect from="/" to="/transactions" />
                        </Switch>
                    </Router>
                    <footer className="block py-4">
                        <div className="container mx-auto px-4">
                            <hr className="mb-4 border-b-1 border-gray-300" />
                            <div className="flex flex-wrap items-center md:justify-between justify-center">
                                <div className="w-full md:w-4/12 px-4">
                                    <div className="text-sm text-gray-600 font-semibold py-1">
                                        Copyright © {new Date().getFullYear()}{" "}
                                        <a href="https://www.creative-tim.com"
                                            className="text-gray-600 hover:text-gray-800 text-sm font-semibold py-1"
                                        >Creative Tim </a>
                                    </div>
                                </div>
                                <div className="w-full md:w-8/12 px-4">
                                    <ul className="flex flex-wrap list-none md:justify-end  justify-center">
                                        <li>
                                            <a
                                                target="_blank"
                                                href="https://www.creative-tim.com"
                                                className="text-gray-700 hover:text-gray-900 text-sm font-semibold block py-1 px-3"
                                            > Creative Tim </a>
                                        </li>
                                        <li>
                                            <a
                                                target="_blank"
                                                href="https://github.com/creativetimofficial/tailwind-starter-kit/blob/master/LICENSE.md"
                                                className="text-gray-700 hover:text-gray-900 text-sm font-semibold block py-1 px-3"
                                            > MIT License </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    )
}