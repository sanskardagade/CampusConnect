import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../../redux/userRelated/userHandle';
import { getAllSclasses } from '../../redux/sclassRelated/sclassHandle';
import TableTemplate from '../../components/admin/TableTemplate';
import SpeedDialTemplate from '../../components/admin/SpeedDialTemplate';
import Popup from '../../components/admin/Popup';

const ShowClasses = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { sclassesList, loading, error, getresponse } = useSelector((state) => state.sclass);
  const { currentUser } = useSelector(state => state.user);
  const adminID = currentUser?._id;

  useEffect(() => {
    if (adminID) {
      dispatch(getAllSclasses(adminID, "Sclass"));
    }
  }, [adminID, dispatch]);

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const deleteHandler = (deleteID, address) => {
    setMessage("Sorry the delete function has been disabled for now.");
    setShowPopup(true);
  };

  const sclassColumns = [
    { id: 'name', label: 'Class Name', minWidth: 170 },
  ];

  const sclassRows = sclassesList?.map((sclass) => ({
    name: sclass.sclassName,
    id: sclass._id,
  }));

  const SclassButtonHaver = ({ row }) => {
    return (
      <div className="flex items-center justify-center gap-4">
        <button onClick={() => deleteHandler(row.id, "Sclass")} className="text-red-600 hover:text-red-800">🗑️</button>
        <button onClick={() => navigate("/Admin/classes/class/" + row.id)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">View</button>
        <div className="relative group">
          <button className="bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300">Add ▼</button>
          <div className="absolute hidden group-hover:block bg-white border rounded shadow-lg mt-1">
            <button onClick={() => navigate("/Admin/addsubject/" + row.id)} className="block w-full px-4 py-2 hover:bg-gray-100">➕ Add Subjects</button>
            <button onClick={() => navigate("/Admin/class/addstudents/" + row.id)} className="block w-full px-4 py-2 hover:bg-gray-100">👤 Add Student</button>
          </div>
        </div>
      </div>
    );
  };

  const actions = [
    {
      icon: '➕', name: 'Add New Class',
      action: () => navigate("/Admin/addclass")
    },
    {
      icon: '🗑️', name: 'Delete All Classes',
      action: () => deleteHandler(adminID, "Sclasses")
    },
  ];

  if (!adminID) {
    return (
      <div className="text-center text-lg text-gray-600 min-h-screen flex items-center justify-center">
        Loading admin data...
      </div>
    );
  }

  return (
    <div className="bg-white text-red-900 min-h-screen p-6">
      {loading ? (
        <div className="text-center text-xl">Loading...</div>
      ) : (
        <>
          {getresponse ? (
            <div className="flex justify-end mb-4">
              <button onClick={() => navigate("/Admin/addclass")} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                Add Class
              </button>
            </div>
          ) : (
            <>
              {Array.isArray(sclassesList) && sclassesList.length > 0 &&
                <TableTemplate buttonHaver={SclassButtonHaver} columns={sclassColumns} rows={sclassRows} />
              }
              <SpeedDialTemplate actions={actions} />
            </>
          )}
        </>
      )}
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </div>
  );
};

export default ShowClasses;
