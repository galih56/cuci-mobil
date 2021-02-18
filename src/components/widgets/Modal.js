import React, { useState } from "react";

export default function Modal({ open, close, title, content }) {
    // npm install react-to-pdf
    return (
        <>
            {open ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                        onClick={close}
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-5xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                                    <h5 className="text-2xl font-semibold"> {title} </h5>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={close}
                                    >
                                        <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            X </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-3 flex-auto">
                                    <div className="my-2 text-gray-600 text-lg leading-relaxed">
                                        {content}
                                    </div>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-4 border-t border-solid border-gray-300 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-0.5 mb-0.5"
                                        type="button"
                                        style={{ transition: "all .15s ease" }}
                                        onClick={close}
                                    >
                                        Close
                  </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}