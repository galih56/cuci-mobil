import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Pagination from './Pagination';

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
    const { headCells, order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <thead>
            <tr className="cursor-pointer">
                {headCells.map((headCell) => (
                    <th
                        key={headCell.id}
                        className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : 'asc'}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                        onClick={createSortHandler(headCell.id)}
                    >
                        {headCell.label}
                        {/* {orderBy === headCell.id ? (
                            <span className={classes.visuallyHidden}>
                                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                            </span>
                        ) : null} */}
                    </th>
                ))}
            </tr>
        </thead>
    );
}

export default function EnhancedTable({ headCells, rows, onRowClick, searchable }) {
    const [searchKeywords, setSearchKeywords] = useState('');
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    let { search } = useLocation();

    useEffect(() => {
        const query = new URLSearchParams(search);
        const keywords = query.get('keywords');

        if (keywords) setSearchKeywords(keywords);

    }, []);
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (newPage) => setPage(newPage);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const shortenIncludes = (item, keywords) => {
        return (item.toLowerCase().includes(keywords.toLowerCase()));
    }

    const handleSearch = (e) => {
        let keywords = e.target.value;
        setSearchKeywords(keywords);
    }

    return (
        <>
            <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                        <h3 className="font-semibold text-base text-gray-800">  Transactions  </h3>
                    </div>
                    <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                        {/* Form */}
                        {
                            searchable ?
                                <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
                                    <div className="relative flex w-full flex-wrap items-stretch">
                                        <span className="z-10 h-full leading-snug font-normal absolute text-center text-gray-400 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                                            <i className="fas fa-search"></i>
                                        </span>
                                        <input onChange={handleSearch}
                                            type="text"
                                            name="keywords"
                                            placeholder="Search here..."
                                            className="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full pl-10" />
                                    </div>
                                </form> : <></>
                        }
                    </div>
                </div>
            </div>
            <div className="block w-full overflow-x-auto">
                <table className="items-center w-full bg-transparent border-collapse">
                    <EnhancedTableHead
                        headCells={headCells}
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                    />
                    <tbody>
                        {stableSort(rows, getComparator(order, orderBy))
                            .filter((item) => {
                                if (shortenIncludes(item.transaction_customer_name, searchKeywords) ||
                                    shortenIncludes(item.transaction_customer_phone_number, searchKeywords) ||
                                    shortenIncludes(item.transaction_customer_vehicle_number, searchKeywords) ||
                                    shortenIncludes(item.transaction_customer_type, searchKeywords) ||
                                    shortenIncludes(item.transaction_date, searchKeywords) ||
                                    shortenIncludes(String(item.transaction_price), searchKeywords)
                                ) return item;
                            })
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                var jsxArr = [];
                                headCells.forEach((headcell) => {
                                    jsxArr.push((
                                        <td key={headcell.id} className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                                            {row[headcell.id]}
                                        </td>
                                    ));
                                });
                                return (
                                    <tr className="cursor-pointer" key={index} onClick={() => onRowClick(row)}>
                                        {jsxArr}
                                    </tr>
                                );
                            })}
                        {emptyRows > 0 && (
                            <tr >
                                <td colspan="6"></td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <Pagination
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage} />
            </div>
        </>
    );
}
