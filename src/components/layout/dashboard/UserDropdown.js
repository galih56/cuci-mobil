import React, { useState, useEffect, useContext, createRef } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from './../../context/auth';

import Popper from "popper.js";

const UserDropdown = () => {

    let history = useHistory();
    let authContext = useContext(AuthContext);
    const [user, setUser] = useState({ id: '', displayName: '', email: '', photoURL: '' })
    const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
    const btnDropdownRef = createRef();
    const popoverDropdownRef = createRef();

    useEffect(() => {
        setUser(authContext.userState);
        if (!user) history.push('/login');
    }, [authContext.userState]);

    const openDropdownPopover = () => {
        new Popper(btnDropdownRef.current, popoverDropdownRef.current, {
            placement: "bottom-end"
        });
        setDropdownPopoverShow(true);
    };
    const closeDropdownPopover = () => setDropdownPopoverShow(false);
    const handleLogout = () => {
        authContext.signOut().then(function () {
            history.push('/login');
        }).catch(function (error) {
            console.log(error);
        });;
    }

    String.prototype.capitalize = function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }
    return (
        <>
            <a
                className="text-gray-600 block"
                href="#"
                ref={btnDropdownRef}
                onClick={e => {
                    e.preventDefault();
                    dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
                }}
            >
                <div className="items-center flex">
                    <span className="w-12 h-12 text-sm text-white bg-gray-300 inline-flex items-center justify-center rounded-full">
                        <img
                            alt="..."
                            className="w-full rounded-full align-middle border-none shadow-lg"
                            src={user.photoURL}
                        />
                    </span>
                </div>
            </a>
            <div
                ref={popoverDropdownRef}
                className={
                    (dropdownPopoverShow ? "block " : "hidden ") +
                    "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1"
                }
                style={{ minWidth: "12rem" }}
            >
                <a
                    href="#"
                    className={
                        "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
                    }
                    onClick={e => e.preventDefault()}
                >
                    {user.displayName ? user.displayName.capitalize() : ''} <br /> {user.email}
                </a>

                <div className="h-0 my-2 border border-solid border-gray-200" />
                <a
                    href="#"
                    className={"text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"}
                    onClick={e => {
                        e.preventDefault();
                        handleLogout();
                    }}
                >
                    Logout
        </a>
            </div>
        </>
    );
};

export default UserDropdown;