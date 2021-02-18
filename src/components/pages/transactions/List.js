import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import transactionService from "../../../firebase/services/TransactionService";
import moment from 'moment';
import DataTable from '../../widgets/DataTable';
import TransactionDetail from './Detail';
import Modal from '../../widgets/Modal';

export default function TransactionList({ id, match }) {
    let location = useLocation();
    let history = useHistory();
    const [transactions, setTransactions] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [clickedRow, setClickedRow] = useState({
        transaction_id: '', transaction_date: '', transaction_price: '', transaction_photo: [],
        transaction_customer_id: '', transaction_customer_name: '', transaction_customer_phone_number: '',
        transaction_customer_vehicle_number: '', transaction_customer_type: '', packages: []
    });

    function getOneFromParams() {
        const query = new URLSearchParams(location.search);
        if (query) {
            if (query.get('id')) {
                for (let i = 0; i < transactions.length; i++) {
                    const item = transactions[i];
                    handleDetailOpen(true, item);
                }
            }
        }
    }

    useEffect(() => {
        transactionService.getAll().orderBy("transaction_date", "asc").onSnapshot((items) => {
            let newCollections = [];
            items.forEach((item) => {
                let data = item.data();
                data.transaction_date = moment(data.transaction_date.toDate()).format('DD MMM YYYY hh:mm')
                newCollections.push(data);
            });
            setTransactions(newCollections);
        });
    }, []);

    useEffect(() => {
        getOneFromParams();
    }, [transactions, location.search]);

    const handleDetailOpen = (open, clickedRow) => {
        setOpenModal(open)
        setClickedRow(clickedRow);
        if (clickedRow) history.push({ pathName: 'transactions', search: `?id=${clickedRow.transaction_id}` });
    }

    const headCells = [
        { id: 'transaction_customer_name', numeric: false, disablePadding: true, label: 'Name' },
        { id: 'transaction_customer_phone_number', numeric: false, disablePadding: true, label: 'Phone Number' },
        { id: 'transaction_customer_vehicle_number', numeric: false, disablePadding: true, label: 'Vehicle Number' },
        { id: 'transaction_date', numeric: false, disablePadding: true, label: 'Date' },
        { id: 'transaction_price', numeric: false, disablePadding: true, label: 'Price' },
    ];

    const showModal = () => {
        if (openModal && clickedRow != null) {
            return (
                <Modal
                    open={openModal}
                    close={() => handleDetailOpen(false, null)}
                    title={`Invoice (${clickedRow.transaction_date})`}
                    content={<TransactionDetail initialState={clickedRow} />}
                />
            )
        } else {
            return (<></>)
        }
    }

    return (
        <div className="flex flex-wrap mt-1" >
            <div className="w-full mb-12 xl:mb-0 px-4">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                    <DataTable
                        searchable={true}
                        headCells={headCells}
                        rows={transactions}
                        onRowClick={row => handleDetailOpen(true, row)}
                    />
                    {showModal()}
                </div>
            </div>
        </div >
    )
}