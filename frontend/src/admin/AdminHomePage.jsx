import React, { useEffect } from 'react';
import SeeNotice from '../components/admin/SeeNotice';
import Students from "../assets/students/img1.png";
import Classes from "../assets/students/img2.png";
import Teachers from "../assets/students/img3.png";
import Fees from "../assets/students/img4.png";
import CountUp from 'react-countup';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSclasses } from '../redux/sclassRelated/sclassHandle';
import { getAllStudents } from '../redux/studentRelated/studentHandle';
import { getAllTeachers } from '../redux/teacherRelated/teacherHandle';

const AdminHomePage = () => { 
    const dispatch = useDispatch();
    const { studentsList } = useSelector((state) => state.student);
    const { sclassesList } = useSelector((state) => state.sclass);
    const { teachersList } = useSelector((state) => state.teacher);
    const { currentUser } = useSelector(state => state.user);

    useEffect(() => {
        if (currentUser && currentUser._id) {
            dispatch(getAllStudents(currentUser._id));
            dispatch(getAllSclasses(currentUser._id, "Sclass"));
            dispatch(getAllTeachers(currentUser._id));
        }
    }, [dispatch, currentUser]);

    // Avoid rendering if currentUser is not yet loaded
    if (!currentUser) {
        return <div className="text-xl text-gray-600">Loading Admin Dashboard...</div>;
    }

    const numberOfStudents = studentsList?.length || 0;
    const numberOfClasses = sclassesList?.length || 0;
    const numberOfTeachers = teachersList?.length || 0;

    const cards = [
        { title: 'Total Students', count: numberOfStudents, image: Students },
        { title: 'Total Classes', count: numberOfClasses, image: Classes },
        { title: 'Total Teachers', count: numberOfTeachers, image: Teachers },
        { title: 'Fees Collection', count: 23000, image: Fees, prefix: '$' },
    ];

    return (
        <div className="max-w-7xl mx-auto py-10 px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center justify-center w-48 h-48 bg-gray-100 text-center rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300"
                    >
                        <img src={card.image} alt={card.title} className="w-16 h-16 mb-2" />
                        <h2 className="text-lg font-semibold text-gray-800">{card.title}</h2>
                        <p className="text-xl font-bold text-green-600">
                            <CountUp start={0} end={card.count} duration={2.5} prefix={card.prefix || ''} />
                        </p>
                    </div>
                ))}
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
                <SeeNotice />
            </div>
        </div>
    );
};

export default AdminHomePage;
