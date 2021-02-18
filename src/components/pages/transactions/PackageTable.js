import React, { useState, useEffect } from 'react';

export default function PackageTable({ data }) {
    const [total, setTotal] = useState(0);

    useEffect(() => {
        var totalVal = 0;
        data.forEach((item) => {
            totalVal += item.package_price;
        });
        setTotal(totalVal);
    }, [data])

    return (
        <>
            <div className="grid">
                <div className=" flex justify-center">
                    <table className="w-full bg-white shadow-md rounded mb-4">
                        <tbody>
                            <tr>
                                <th className="text-left p-1 px-2">Package Name</th>
                                <th className="text-left p-1 px-2">Price</th>
                            </tr>
                            {data.map((item) => {
                                return (
                                    <tr className="hover:bg-orange-100">
                                        <td className="p-1 px-2">{item.package_name}</td>
                                        <td className="p-1 px-2">{item.package_price}</td>
                                    </tr>
                                )
                            })}
                            <tr className="hover:bg-orange-100 bg-gray-100">
                                <td className="font-semibold p-1 px-2">Total : </td>
                                <td className="p-1 px-2">{total}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="grid text-left">
                <div className="font-semibold">Transaction Photos : </div>
                {data.map((item) => {
                    return (
                        <div className="flex flex-wrap justify-center">
                            <div className="w-2/12 sm:w-2/12 px-1">
                                <img src={item.package_photo} className="shadow rounded max-w-full h-auto align-middle border-none" />
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}