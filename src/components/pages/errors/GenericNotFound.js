import React from 'react';
import Dashboard from './../../layout/dashboard/Index';

export default function GenericNotFound() {
    return (
        <Dashboard>
            <div className="flex flex-wrap mt-1" >
                <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                        <h2 className="text-xl text-center">404</h2><br />
                        <h4 className="text-lg text-center">Page Not Found</h4>
                    </div>
                </div>
            </div >
        </Dashboard>
    )
}