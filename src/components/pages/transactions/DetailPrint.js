import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Preview, print } from 'react-html2pdf';
import LogoPNG from './../../../assets/img/slamet_logo.png';
import './../../../assets/style.css';
import transactionPackageService from "../../../firebase/services/TransactionPackageService";
import transactionService from "../../../firebase/services/TransactionService";
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import moment from 'moment';

export default function Invoice(props) {
    let location = useLocation();
    const [transaction, setTransaction] = useState({
        transaction_id: '', transaction_date: '', transaction_price: '', transaction_photo: [],
        transaction_customer_id: '', transaction_customer_name: '', transaction_customer_phone_number: '',
        transaction_customer_vehicle_number: '', transaction_customer_type: '', packages: []
    });
    const [packages, setPackages] = useState([]);
    const [total, setTotal] = useState(0);
    const [alert, setAlert] = useState({ show: false, color: '', title: '', message: '' });

    function handlePdf() {
        const input = document.getElementById('body-pdf');

        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'px', 'a4');
                var width = pdf.internal.pageSize.getWidth();
                var height = pdf.internal.pageSize.getHeight();

                pdf.addImage(imgData, 'JPEG', 0, 0, width, height);
                pdf.save("test.pdf");
            });
    };
    function getData() {
        const query = new URLSearchParams(location.search);
        console.log({ location, query });
        if (query) {
            if (query.get('id')) {
                transactionService.getOne(query.get('id')).get()
                    .then(snapshot => {
                        console.log('transactions : ', query.get('id'), snapshot);
                        if (!snapshot.data()) {
                            setAlert({
                                show: true, title: 'Data not found',
                                message: `Transaksi dengan kode ${query.get('id')} tidak ditemukan`, color: 'orange'
                            });
                        } else {
                            setAlert({
                                show: false, title: 'Data not found',
                                message: `Transaksi dengan kode ${query.get('id')} tidak ditemukan`, color: 'orange'
                            });
                        }
                        var data = snapshot.data()
                        setTransaction(data);
                    }).catch(error => console.log(error));

                transactionPackageService.getAll()
                    .where('transaction_id', '==', query.get('id')).get()
                    .then(snapshot => {
                        var data = [];
                        snapshot.forEach(doc => data.push(doc.data()));
                        console.log('packages : ', data);
                        setPackages(data);
                    }).catch(error => console.log(error));
            }
        }
    }

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        var totalVal = 0;
        packages.forEach((item) => {
            totalVal += item.package_price;
        });
        setTotal(totalVal);
    }, [packages])

    if (alert.show) {
        return (
            <div className={`text-white px-6 py-4 border-0 rounded relative mb-4 bg-${alert.color}-500`}>
                <span className="text-xl inline-block mr-5 align-middle">
                    <i className="fas fa-bell" />
                </span>
                <span className="inline-block align-middle mr-8">
                    <b className="capitalize">Data not found!{alert.title}</b>{alert.message}
                </span>
                <button className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none">
                    <span>×</span>
                </button>
            </div>
        )
    }
    if (transaction.transaction_id != '') {
        return (
            <React.Fragment>
                <Preview id="jsx-template">
                    <div id="body-pdf">
                        <div id="invoice_slamet">
                            <header className="clearfix" id="header-pdf">
                                <div id="logo"> <img src={LogoPNG} /></div>
                                <div id="company">
                                    <h2 className="name">Slamet Otomotif Laundry</h2>
                                    <div>Jl. Kh. Zainal Alim 113 A Ban</div>
                                    <div>Madura, Indonesia</div>
                                    <div>(602) 519-0450</div>
                                </div>
                            </header>
                            <main>
                                <div id="details" className="clearfix">
                                    <div id="client">
                                        {/* <div className="to">PEMBAYAARAN OLEH :</div> */}
                                        <h2 className="date"> {moment(transaction.transaction_date.toDate()).format("DD/MM/YYYY hh:mm")}</h2>
                                        <h2 className="name">{transaction.transaction_customer_name}</h2>
                                        <div className="email">Nomor Telepon : {transaction.transaction_customer_phone_number}</div>
                                        <div className="address">{transaction.transaction_customer_address}</div>
                                    </div>
                                    {/* 
                                        <div id="invoice">
                                            <div className="date">Tanggal Pembayaran: {moment(transaction.transaction_date.toDate()).format("DD/MM/YYYY hh:mm")}</div>
                                        </div> 
                                    */}
                                </div>
                                <table className="table-pdf" border="0" cellspacing="0" cellpadding="0">
                                    <thead>
                                        <tr>
                                            <th width="10px" className="no">NO</th>
                                            <th colspan="5" className="desc">NAMA PAKET</th>
                                            <th width="10px" className="total">TOTAL</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {packages.map((item, index) => {
                                            return (
                                                <tr className="hover:bg-orange-100">
                                                    <td className="no align-middle text-center">{index + 1}</td>
                                                    <td colspan="5" className="desc"><h3>{item.package_name}</h3></td>
                                                    <td className="total align-middle text-center">Rp. {item.package_price}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colspan="3"></td>
                                            <td colspan="3">TOTAL</td>
                                            <td>Rp. {total}</td>
                                        </tr>
                                    </tfoot>
                                </table>
                                {/* <div id="thanks">Thank you!</div> */}
                                <div id="notices">
                                    {/* <div>Catatan :</div> */}
                                    <div className="notice">Terima kasih telah melakukan transaksi dengan kami. </div>
                                </div>
                            </main>
                            {/* <footer id="footer-pdf"> Invoice was created on a computer and is valid without the signature and seal. </footer> */}
                        </div>
                    </div>
                </Preview>
            </React.Fragment>
        )
    } else {
        return (
            <div className="text-center justify-center grid">
                <h3 className="grid text-2xl text-center"><b>404</b></h3><br />
                <h5 className="grid text-lg text-center">Transaction not found</h5>
            </div>
        )
    }
}
