import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllComplains } from '../../redux/complainRelated/complainHandle';
import TableTemplate from '../../components/admin/TableTemplate';

const SeeComplains = () => {
  const dispatch = useDispatch();
  const { complainsList, loading, error, response } = useSelector((state) => state.complain);
  const { currentUser } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(getAllComplains(currentUser._id, "Complain"));
  }, [currentUser._id, dispatch]);

  if (error) {
    console.log(error);
  }

  const complainColumns = [
    { id: 'user', label: 'User', minWidth: 170 },
    { id: 'complaint', label: 'Complaint', minWidth: 100 },
    { id: 'date', label: 'Date', minWidth: 170 },
  ];

  const complainRows = complainsList && complainsList.length > 0 && complainsList.map((complain) => {
    const date = new Date(complain.date);
    const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
    return {
      user: complain.user.name,
      complaint: complain.complaint,
      date: dateString,
      id: complain._id,
    };
  });

  const ComplainButtonHaver = ({ row }) => {
    return (
      <input
        type="checkbox"
        className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        aria-label="Checkbox"
      />
    );
  };

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 min-h-screen">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
        </div>
      ) : (
        <>
          {response ? (
            <div className="flex justify-end mt-4 text-gray-700 dark:text-gray-300">
              No Complains Right Now
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
              {Array.isArray(complainsList) && complainsList.length > 0 && (
                <TableTemplate 
                  buttonHaver={ComplainButtonHaver} 
                  columns={complainColumns} 
                  rows={complainRows}
                  headerClasses="bg-red-600 dark:bg-red-800 text-white"
                  rowClasses="hover:bg-red-50 dark:hover:bg-gray-600"
                  cellClasses="border-b border-gray-200 dark:border-gray-600 px-4 py-2"
                />
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SeeComplains;