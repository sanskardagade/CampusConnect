import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getAllNotices } from '../../redux/noticeRelated/noticeHandle';
import { deleteUser } from '../../redux/userRelated/userHandle';
import TableTemplate from '../../components/admin/TableTemplate';
import { FaPlus, FaTrash } from 'react-icons/fa';

const ShowNotices = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { noticesList, loading, error, response } = useSelector((state) => state.notice);
  const { currentUser } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(getAllNotices(currentUser._id, "Notice"));
  }, [currentUser._id, dispatch]);

  const deleteHandler = (deleteID, address) => {
    dispatch(deleteUser(deleteID, address)).then(() => {
      dispatch(getAllNotices(currentUser._id, "Notice"));
    });
  };

  const noticeColumns = [
    { id: 'title', label: 'Title', minWidth: 170 },
    { id: 'details', label: 'Details', minWidth: 100 },
    { id: 'date', label: 'Date', minWidth: 170 },
  ];

  const noticeRows = noticesList && noticesList.length > 0 && noticesList.map((notice) => {
    const date = new Date(notice.date);
    const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
    return {
      title: notice.title,
      details: notice.details,
      date: dateString,
      id: notice._id,
    };
  });

  const NoticeButtonHaver = ({ row }) => {
    return (
      <button
        onClick={() => deleteHandler(row.id, "Notice")}
        className="text-red-700 hover:text-red-900 transition"
        title="Delete"
      >
        <FaTrash />
      </button>
    );
  };

  const actions = [
    {
      icon: <FaPlus className="text-red-800" />,
      name: 'Add New Notice',
      action: () => navigate("/Admin/addnotice")
    },
    {
      icon: <FaTrash className="text-red-800" />,
      name: 'Delete All Notices',
      action: () => deleteHandler(currentUser._id, "Notices")
    }
  ];

  return (
    <div className="p-4 bg-white min-h-screen">
      {loading ? (
        <div className="text-center text-red-800 font-semibold">Loading...</div>
      ) : (
        <>
          {response ? (
            <div className="flex justify-end mb-4">
              <button
                onClick={() => navigate("/Admin/addnotice")}
                className="bg-red-800 text-white px-4 py-2 rounded hover:bg-red-900"
              >
                Add Notice
              </button>
            </div>
          ) : (
            <div className="w-full border rounded shadow-md p-4 bg-white">
              {Array.isArray(noticesList) && noticesList.length > 0 && (
                <TableTemplate
                  buttonHaver={NoticeButtonHaver}
                  columns={noticeColumns}
                  rows={noticeRows}
                />
              )}
              <div className="fixed bottom-6 right-6 space-y-3 flex flex-col items-end">
                {actions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.action}
                    title={action.name}
                    className="flex items-center space-x-2 bg-red-800 text-white px-3 py-2 rounded-full shadow hover:bg-red-900 transition"
                  >
                    {action.icon}
                    <span className="hidden sm:inline">{action.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ShowNotices;
