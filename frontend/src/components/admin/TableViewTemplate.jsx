import React, { useState } from 'react';

const TableViewTemplate = ({ columns, rows }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (direction) => {
        const totalPages = Math.ceil(rows.length / rowsPerPage);
        if (direction === 'prev' && page > 0) {
            setPage(page - 1);
        }
        if (direction === 'next' && page < totalPages - 1) {
            setPage(page + 1);
        }
    };

    const handleRowsPerPageChange = (e) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    };

    return (
        <div className="w-full overflow-x-auto rounded shadow bg-white text-gray-800">
            <table className="min-w-full table-auto">
                <thead className="bg-red-700 text-white">
                    <tr>
                        {columns.map((column, index) => (
                            <th
                                key={index}
                                className={`px-4 py-3 text-sm font-semibold ${column.align === 'center' ? 'text-center' : 'text-left'}`}
                                style={{ minWidth: column.minWidth }}
                            >
                                {column.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => (
                            <tr key={row.id} className="hover:bg-red-50 border-b">
                                {columns.map((column, index) => {
                                    const value = row[column.id];
                                    return (
                                        <td
                                            key={index}
                                            className={`px-4 py-2 text-sm ${column.align === 'center' ? 'text-center' : 'text-left'}`}
                                        >
                                            {column.format && typeof value === 'number'
                                                ? column.format(value)
                                                : value}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-between items-center p-4">
                <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700">Rows per page:</label>
                    <select
                        value={rowsPerPage}
                        onChange={handleRowsPerPageChange}
                        className="border rounded px-2 py-1 text-sm focus:outline-none"
                    >
                        {[5, 10, 25, 100].map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => handleChangePage('prev')}
                        disabled={page === 0}
                        className="px-3 py-1 bg-red-700 text-white rounded disabled:opacity-50"
                    >
                        Prev
                    </button>
                    <span className="text-sm">
                        Page {page + 1} of {Math.ceil(rows.length / rowsPerPage)}
                    </span>
                    <button
                        onClick={() => handleChangePage('next')}
                        disabled={page >= Math.ceil(rows.length / rowsPerPage) - 1}
                        className="px-3 py-1 bg-red-700 text-white rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TableViewTemplate;
