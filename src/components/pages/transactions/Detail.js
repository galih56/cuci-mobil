import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PackageTable from './PackageTable';
import transactionPackageService from "../../../firebase/services/TransactionPackageService";
import transactionService from "../../../firebase/services/TransactionService";

const headCells = [
    { id: 'package_name', numeric: false, disablePadding: true, label: 'Package Name' },
    { id: 'price', numeric: false, disablePadding: true, label: 'Price' },
    { id: 'total', numeric: false, disablePadding: true, label: 'Total' },
];

export default function TransactionDetail({ initialState }) {
    const [transaction, setTransaction] = useState(initialState);
    const [packages, setPackages] = useState([]);

    useEffect(() => {
        transactionService.getOne(initialState.transaction_id).get().
            then(snapshot => {
                setTransaction(snapshot.data());
            }).catch(error => console.log(error));

        transactionPackageService.getAll()
            .where('transaction_id', '==', transaction.transaction_id).get()
            .then(snapshot => {
                var data = [];
                snapshot.forEach(doc => data.push(doc.data()));
                setPackages(data);
            }).catch(error => console.log(error));
    }, []);

    return (
        <div className="container mx-auto my-2">
            <div className="md:flex no-wrap md:-mx-2 ">
                <div className="w-full h-64 overflow-scroll">
                    <div className="p-3 shadow-sm rounded-sm">
                        <div className="text-gray-700">
                            <div className="grid md:grid-cols-2 text-sm">
                                <div className="grid grid-cols-2">
                                    <div className="font-semibold">Customer : </div>
                                    <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">{transaction.transaction_customer_name}</p>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="font-semibold">Nomer Kendaraan : </div>
                                    <p className="text-sm text-gray-500 hover:text-gray-600 leading-6"> {transaction.transaction_customer_vehicle_number}</p>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="font-semibold">Telephone : </div>
                                    <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">{transaction.transaction_customer_phone_number} </p>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="font-semibold">Address : </div>
                                    <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">{transaction.transaction_customer_address} </p>
                                </div>
                            </div>
                            <PackageTable data={packages} />
                        </div>
                        <Link
                            target="_blank"
                            to={"/print?id=" + transaction.transaction_id}
                            component="a"
                            className="bg-teal-500 text-black active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1"
                            type="button"
                            style={{ transition: "all .15s ease" }}
                        >Print Invoice</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}