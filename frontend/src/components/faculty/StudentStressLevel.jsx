import React, { useState, useEffect } from "react";
import stressdata from "../Data/Stressdata";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";

// Emotion color map
const emotionColors = {
  happy: "#22c55e",
  sad: "#3b82f6",
  angry: "#ef4444",
  neutral: "#a3a3a3",
  surprise: "#eab308",
  disgust: "#8b5cf6",
};

const statusColors = {
  "At Risk": "#EF4444", // Red for "At Risk"
  Stressed: "#F59E0B", // Yellow for "Stressed"
  Stable: "#10B981", // Green for "Stable"
};

const StudentStressDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [stressData, setStressData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the backend
  useEffect(() => {
    const fetchStressData = async () => {
      try {
        // Transform the data to match the component's expected property names
        const transformedData = stressdata.map(student => ({
          id: student.SR_NO,
          name: student.NAME,
          rollNo: student.ROLL_NO,
          MorningSlot: student.MORNING_SLOT.toLowerCase(),
          AfternoonSlot: student.AFTERNOON_SLOT.toLowerCase(),
          score: student.DAILY_AVG_SCORE,
          status: student.STRESS_STATUS
        }));
        
        setStressData(transformedData);
        setError(null);
      } catch (error) {
        console.error('Error fetching stress data:', error);
        setError(error.message);
        setStressData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStressData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-500">Error: {error}</div>
      </div>
    );
  }

  const filteredStudents = stressData.filter((student) =>
    student.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statusCounts = {
    "At Risk": stressData.filter((s) => s.status === "At Risk").length,
    Stressed: stressData.filter((s) => s.status === "Stressed").length,
    Stable: stressData.filter((s) => s.status === "Stable").length,
  };

  const pieData = Object.entries(statusCounts).map(([status, value]) => ({
    name: status,
    value,
  }));

  const emotionLineData = stressData.map((student) => ({
    name: student.name,
    Morning: Object.keys(emotionColors).indexOf(student.MorningSlot),
    Afternoon: Object.keys(emotionColors).indexOf(student.AfternoonSlot),
  }));

  const themeClass ="bg-red-100 text-red-900";
  const cardClass = "bg-red-200";
  const tableClass = "bg-red-100 text-red-900";
  const chartBgClass =  "bg-red-200";

  return (
    <div className={`p-6 min-h-screen ${themeClass}`}>
      <h1 className="text-3xl font-bold mb-6 text-center text-red-400">
        Student Stress Management Dashboard
      </h1>

      <div className="mb-6 text-center">
        <input
          type="text"
          placeholder="Search students..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 w-full rounded bg-red-800 text-white border border-red-700 focus:outline-none"
        />
      </div>

      {/* Student List Table */}
      <div className="overflow-x-auto mb-6">
        <table className={tableClass + " w-full rounded-lg overflow-hidden border border-red-700"}>
          <thead className= "bg-red-200">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Roll No</th>
              <th className="p-3">Morning Slot</th>
              <th className="p-3">Afternoon Slot</th>
              <th className="p-3">Score</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id} className="text-center border-t border-red-700">
                <td className="p-3">{student.name}</td>
                <td className="p-3">{student.rollNo}</td>
                <td
                  className="p-3 font-semibold"
                  style={{ color: emotionColors[student.MorningSlot] }}
                >
                  {student.MorningSlot}
                </td>
                <td
                  className="p-3 font-semibold"
                  style={{ color: emotionColors[student.AfternoonSlot] }}
                >
                  {student.AfternoonSlot}
                </td>
                <td className="p-3">{student.score}</td>
                <td className="p-3" style={{ color: statusColors[student.status] }}>
                  {student.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {Object.entries(statusCounts).map(([status, count]) => {
        let bgColor = "";

        if (status === "Stable") bgColor = "bg-green-500";
        else if (status === "Stressed") bgColor = "bg-yellow-500";
        else if (status === "At Risk") bgColor = "bg-red-500";

        return (
          <div key={status} className={`p-4 rounded-lg shadow text-white ${bgColor}`}>
            <h2 className="text-xl font-semibold">{status}</h2>
            <p className="text-3xl font-bold">{count}</p>
          </div>
        );
      })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {/* Bar Chart */}
        <div className={`p-4 rounded-lg border ${chartBgClass}`}>
          <h3 className="text-xl font-semibold text-center mb-4">Bar Chart: Student Scores</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={stressData}>
              <XAxis dataKey="name" tick={{ fill: isDarkMode ? "#fff" : "#000" }} />
              <YAxis tick={{ fill: isDarkMode ? "#fff" : "#000" }} />
              <Tooltip contentStyle={{ backgroundColor: isDarkMode ? "#1F2937" : "#fff", borderColor: isDarkMode ? "#4B5563" : "#ddd", color: isDarkMode ? "#fff" : "#000" }} />
              <Bar dataKey="score" fill="#EF4444" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className={`p-4 rounded-lg border ${chartBgClass}`}>
          <h3 className="text-xl font-semibold text-center mb-4">Pie Chart: Student Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={80}
                dataKey="value"
              >
                {pieData.map((entry, index) => {
                  const status = entry.name;
                  return <Cell key={`cell-${index}`} fill={statusColors[status]} />;
                })}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart */}
        <div className={`p-4 rounded-lg border ${chartBgClass}`}>
          <h3 className="text-xl font-semibold text-center mb-4">Line Chart: Emotion Over Time</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={emotionLineData}>
              <XAxis dataKey="name" tick={{ fill: isDarkMode ? "#fff" : "#000" }} />
              <YAxis
                tick={{ fill:"#000" }}
                domain={[0, Object.keys(emotionColors).length - 1]}
                tickFormatter={(index) => Object.keys(emotionColors)[index]}
              />
              <Tooltip contentStyle={{ backgroundColor: isDarkMode ? "#1F2937" : "#fff", color: isDarkMode ? "#fff" : "#000" }} />
              <Legend />
              <Line type="monotone" dataKey="Morning" stroke="#3b82f6" name="Morning Emotion" />
              <Line type="monotone" dataKey="Afternoon" stroke="#ef4444" name="Afternoon Emotion" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
export default StudentStressDashboard;