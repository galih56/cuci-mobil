
import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from './../../context/auth';
import Navbar from "./../../layout/login/Navbar";
import Footer from "./../../layout/login/Footer";
import googleLogo from './../../../assets/img/google.svg';
import registerBG from "./../../../assets/img/register_bg_2.png";

export default function Login() {
    let history = useHistory();
    let authContext = useContext(AuthContext);

    useEffect(() => {
        if (authContext.userState) history.push('/');
    });

    return (
        <>
            <Navbar transparent />
            <main>
                <section className="absolute w-full h-full">
                    <div
                        className="absolute top-0 w-full h-full bg-gray-900"
                        style={{
                            backgroundImage:
                                "url(" + registerBG + ")",
                            backgroundSize: "100%",
                            backgroundRepeat: "no-repeat"
                        }}
                    ></div>
                    <div className="container mx-auto px-4 h-full">
                        <div className="flex content-center items-center justify-center h-full">
                            <div className="w-full lg:w-4/12 px-4">
                                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                                    <div className="rounded-t mb-0 px-6 py-6">
                                        <div className="text-center mb-3">
                                            <h6 className="text-gray-600 text-sm font-bold"> Sign in with </h6>
                                        </div>
                                        <div className="btn-wrapper text-center">
                                            <button
                                                className="bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
                                                type="button"
                                                style={{ transition: "all .15s ease" }}
                                                onClick={authContext.signInWithGoogle}
                                            >
                                                <img alt="..." className="mr-1" src={googleLogo} />
                                                Google
                                                </button>
                                        </div>
                                        {/*
                                        <div className="text-center mt-2">
                                            <label className="inline-flex items-center cursor-pointer">
                                                <input
                                                    id="customCheckLogin"
                                                    type="checkbox"
                                                    className="form-checkbox text-gray-800 ml-1 w-5 h-5"
                                                    style={{ transition: "all .15s ease" }}
                                                /> <span className="ml-2 text-sm font-semibold text-gray-700"> Remember me </span>
                                            </label>
                                        </div>
                                         */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer absolute />
                </section>
            </main>
        </>
    );
}