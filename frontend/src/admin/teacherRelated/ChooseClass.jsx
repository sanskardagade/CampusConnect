import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSclasses } from '../../redux/sclassRelated/sclassHandle';
import { useNavigate } from 'react-router-dom';

const ChooseClass = ({ situation }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { sclassesList, loading, error, getresponse } = useSelector((state) => state.sclass);
  const { currentUser } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(getAllSclasses(currentUser._id, "Sclass"));
  }, [currentUser._id, dispatch]);

  if (error) {
    console.log(error);
  }

  const navigateHandler = (classID) => {
    if (situation === "Teacher") {
      navigate("/Admin/teachers/choosesubject/" + classID);
    }
    else if (situation === "Subject") {
      navigate("/Admin/addsubject/" + classID);
    }
  }

  const sclassColumns = [
    { id: 'name', label: 'Class Name', minWidth: 170 },
  ];

  const sclassRows = sclassesList && sclassesList.length > 0 && sclassesList.map((sclass) => {
    return {
      name: sclass.sclassName,
      id: sclass._id,
    };
  });

  const TableTemplate = ({ columns, rows, buttonHaver: ButtonHaver }) => {
    return (
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.id}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </th>
              ))}
              <th 
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {columns.map((column) => (
                  <td key={column.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {row[column.id]}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <ButtonHaver row={row} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const SclassButtonHaver = ({ row }) => {
    return (
      <button
        className="px-4 py-2 bg-red-800 text-white rounded-md hover:bg-red-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2"
        onClick={() => navigateHandler(row.id)}
      >
        Choose
      </button>
    );
  };

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="text-red-800 font-medium">Loading...</div>
        </div>
      ) : (
        <>
          {getresponse ? (
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 bg-red-800 text-white rounded-md hover:bg-red-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2"
                onClick={() => navigate("/Admin/addclass")}
              >
                Add Class
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Choose a class
              </h2>
              {Array.isArray(sclassesList) && sclassesList.length > 0 && (
                <TableTemplate
                  buttonHaver={SclassButtonHaver}
                  columns={sclassColumns}
                  rows={sclassRows}
                />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ChooseClass;