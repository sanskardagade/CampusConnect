import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllNotices } from '../../redux/noticeRelated/noticeHandle';
import TableViewTemplate from './TableViewTemplate';

const SeeNotice = () => {
    const dispatch = useDispatch();

    const { currentUser, currentRole } = useSelector(state => state.user);
    const { noticesList, loading, error, response } = useSelector((state) => state.notice);

    useEffect(() => {
        if (!currentUser) return; // Ensure currentUser is defined

        if (currentRole === "Admin") {
            if (currentUser._id) {
                dispatch(getAllNotices(currentUser._id, "Notice"));
            }
        } else {
            if (currentUser.school && currentUser.school._id) {
                dispatch(getAllNotices(currentUser.school._id, "Notice"));
            }
        }
    }, [dispatch, currentRole, currentUser]);

    if (error) {
        console.error("Notice Fetch Error:", error);
    }

    const noticeColumns = [
        { id: 'title', label: 'Title', minWidth: 170 },
        { id: 'details', label: 'Details', minWidth: 100 },
        { id: 'date', label: 'Date', minWidth: 170 },
    ];

    const noticeRows = Array.isArray(noticesList) ? noticesList.map((notice) => {
        const date = new Date(notice.date);
        const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
        return {
            title: notice.title,
            details: notice.details,
            date: dateString,
            id: notice._id,
        };
    }) : [];

    return (
        <div className="mt-12 mr-5">
            {loading ? (
                <div className="text-xl text-gray-700">Loading...</div>
            ) : response || noticeRows.length === 0 ? (
                <div className="text-xl text-gray-700">No Notices to Show Right Now</div>
            ) : (
                <>
                    <h3 className="text-3xl mb-10 font-semibold text-red-800">Notices</h3>
                    <div className="w-full overflow-hidden bg-white rounded-lg shadow-md">
                        <TableViewTemplate columns={noticeColumns} rows={noticeRows} />
                    </div>
                </>
            )}
        </div>
    );
};

export default SeeNotice;
