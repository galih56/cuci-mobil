
import React, { useState, useEffect } from 'react'

export default function Pagination({ page, count, rowsPerPage, onChangePage }) {
    const [totalPage, setTotalPage] = useState(0);

    useEffect(() => {
        var total = Math.ceil(count / rowsPerPage);
        setTotalPage(total)
    }, [page, count, rowsPerPage]);

    return (
        <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div class="flex-1 flex justify-between sm:hidden">
                <a href="#" class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500">
                    Previous </a>
                <a href="#" class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500">
                    Next </a>
            </div>
            <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                {/* <div> <p class="text-sm text-gray-700"> Showing <span class="font-medium m-1">1</span> to <span class="font-medium m-1">{rowsPerPage}</span> of <span class="font-medium m-1">{count}</span> results </p> </div> */}
                <div>
                    <nav class="relative z-0 inline-flex shadow-sm -space-x-px" aria-label="Pagination">
                        {
                            (() => {
                                if (page != 0) {
                                    return (
                                        <a
                                            href="#"
                                            class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                            onClick={
                                                (e) => {
                                                    e.preventDefault();
                                                    onChangePage(page - 1)
                                                }
                                            }
                                        >
                                            <span class="sr-only">Previous</span>
                                            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                                            </svg>
                                        </a>
                                    )
                                }
                            })()
                        }

                        {
                            (() => {
                                if (page != 0 && page > totalPage - 4)
                                    return (
                                        <a
                                            href="#"
                                            onClick={
                                                (e) => {
                                                    e.preventDefault();
                                                    onChangePage(page - 4);
                                                }
                                            }
                                        >
                                            <span class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                                                ... </span>
                                        </a>
                                    )
                            })()
                        }
                        {
                            (() => {
                                var pageNumbers = [];
                                for (let i = 0; i < totalPage; i++) {
                                    if (i >= (page - 2) && i <= (page + 2)) pageNumbers.push(i);
                                }
                                return pageNumbers.map((number) => {
                                    if (page == number) {
                                        return (
                                            <a href="#"
                                                class={"relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 bg-gray-200"}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    onChangePage(number);
                                                }}
                                            >
                                                {number + 1} </a>
                                        )
                                    } else {
                                        return (
                                            <a href="#"
                                                class={"relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 "}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    onChangePage(number);
                                                }}
                                            >
                                                {number + 1} </a>
                                        )
                                    }
                                })
                            })()
                        }
                        {
                            (() => {
                                if (page != totalPage && page < totalPage - 3)
                                    return (
                                        <a
                                            href="#"
                                            onClick={
                                                (e) => {
                                                    e.preventDefault();
                                                    onChangePage(page + 4);
                                                }
                                            }
                                        >
                                            <span class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                                                ... </span>
                                        </a>)
                            })()
                        }
                        {(() => {
                            if (page != totalPage - 1) {
                                return (
                                    <a
                                        href="#"
                                        class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                        onClick={
                                            (e) => {
                                                e.preventDefault();
                                                onChangePage(page + 1);
                                            }
                                        }
                                    >
                                        <span class="sr-only">Next</span>
                                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                                        </svg>
                                    </a>
                                )
                            }
                        })()}
                    </nav>
                </div>
            </div>
        </div>
    )
}