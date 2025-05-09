import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';
import { updateStudentFields } from '../../redux/studentRelated/studentHandle';

import Popup from '../../components/admin/Popup';

const StudentExamMarks = ({ situation }) => {
  const dispatch = useDispatch();
  const { currentUser, userDetails, loading } = useSelector((state) => state.user);
  const { subjectsList } = useSelector((state) => state.sclass);
  const { response, error, statestatus } = useSelector((state) => state.student);
  const params = useParams();

  const [studentID, setStudentID] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [chosenSubName, setChosenSubName] = useState("");
  const [marksObtained, setMarksObtained] = useState("");

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (situation === "Student") {
      setStudentID(params.id);
      dispatch(getUserDetails(params.id, "Student"));
    } else if (situation === "Subject") {
      const { studentID, subjectID } = params;
      setStudentID(studentID);
      dispatch(getUserDetails(studentID, "Student"));
      setChosenSubName(subjectID);
    }
  }, [situation, params, dispatch]);

  useEffect(() => {
    if (userDetails && userDetails.sclassName && situation === "Student") {
      dispatch(getSubjectList(userDetails.sclassName._id, "ClassSubjects"));
    }
  }, [dispatch, userDetails, situation]);

  const changeHandler = (event) => {
    const selectedSubject = subjectsList.find(
      (subject) => subject.subName === event.target.value
    );
    if (selectedSubject) {
      setSubjectName(selectedSubject.subName);
      setChosenSubName(selectedSubject._id);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setLoader(true);
    const fields = { subName: chosenSubName, marksObtained };
    dispatch(updateStudentFields(studentID, fields, "UpdateExamResult"));
  };

  useEffect(() => {
    if (response) {
      setLoader(false);
      setShowPopup(true);
      setMessage(response);
    } else if (error) {
      setLoader(false);
      setShowPopup(true);
      setMessage("Error occurred");
    } else if (statestatus === "added") {
      setLoader(false);
      setShowPopup(true);
      setMessage("Done Successfully");
    }
  }, [response, statestatus, error]);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Enter Exam Marks</h2>
      <form onSubmit={submitHandler} className="space-y-6">
        <div>
          <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-700">
            Select Subject
          </label>
          <select
            id="subject"
            value={subjectName}
            onChange={changeHandler}
            className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          >
            <option value="" disabled>Select a subject</option>
            {subjectsList && subjectsList.map((subject) => (
              <option key={subject._id} value={subject.subName}>
                {subject.subName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="marks" className="block mb-2 text-sm font-medium text-gray-700">
            Marks Obtained
          </label>
          <input
            type="number"
            id="marks"
            value={marksObtained}
            onChange={(e) => setMarksObtained(e.target.value)}
            className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Enter marks"
            min="0"
            max="100"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loader}
          className={`w-full rounded-md py-2 px-4 text-white font-semibold transition-colors ${
            loader ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loader ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      {showPopup && (
        <Popup message={message} onClose={() => setShowPopup(false)} />
      )}
    </div>
  );
};

export default StudentExamMarks;
