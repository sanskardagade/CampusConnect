import React, { useState, useEffect } from 'react';
import { 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    Legend,
    ResponsiveContainer 
} from 'recharts';
import axios from 'axios';
import { 
    Container, 
    Paper, 
    Typography, 
    Select, 
    MenuItem, 
    FormControl, 
    InputLabel,
    Button,
    Grid
} from '@mui/material';
import { Download as DownloadIcon } from '@mui/icons-material';

const AttendanceDashboard = () => {
    const [attendanceData, setAttendanceData] = useState(null);
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [loading, setLoading] = useState(false);

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const classes = [
        'SE Computer A',
        'SE Computer B',
        'SE Electrical A',
        'SE Electrical B',
        'SE Mechanical A',
        'SE Mechanical B'
    ];

    useEffect(() => {
        if (selectedClass && selectedMonth && selectedYear) {
            fetchAttendanceData();
        }
    }, [selectedClass, selectedMonth, selectedYear]);

    const fetchAttendanceData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/attendance/${selectedClass}`, {
                params: {
                    month: selectedMonth,
                    year: selectedYear
                }
            });
            setAttendanceData(response.data[0]);
        } catch (error) {
            console.error('Error fetching attendance data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = async () => {
        try {
            const response = await axios.get(`/api/attendance/download/${selectedClass}`, {
                params: {
                    month: selectedMonth,
                    year: selectedYear
                },
                responseType: 'blob'
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `attendance_${selectedClass}_${selectedMonth}_${selectedYear}.xlsx`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error downloading report:', error);
        }
    };

    const prepareChartData = () => {
        if (!attendanceData) return [];

        return attendanceData.students.map(student => ({
            name: student.name,
            averageAttendance: student.averageAttendance,
            ...student.attendance.reduce((acc, curr) => ({
                ...acc,
                [curr.subject]: curr.theoryPercentage
            }), {})
        }));
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h4" gutterBottom>
                            Attendance Dashboard
                        </Typography>
                        
                        <Grid container spacing={2} sx={{ mb: 3 }}>
                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth>
                                    <InputLabel>Class</InputLabel>
                                    <Select
                                        value={selectedClass}
                                        onChange={(e) => setSelectedClass(e.target.value)}
                                        label="Class"
                                    >
                                        {classes.map((cls) => (
                                            <MenuItem key={cls} value={cls}>{cls}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth>
                                    <InputLabel>Month</InputLabel>
                                    <Select
                                        value={selectedMonth}
                                        onChange={(e) => setSelectedMonth(e.target.value)}
                                        label="Month"
                                    >
                                        {months.map((month) => (
                                            <MenuItem key={month} value={month}>{month}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth>
                                    <InputLabel>Year</InputLabel>
                                    <Select
                                        value={selectedYear}
                                        onChange={(e) => setSelectedYear(e.target.value)}
                                        label="Year"
                                    >
                                        {[2024, 2025].map((year) => (
                                            <MenuItem key={year} value={year}>{year}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>

                        <Button
                            variant="contained"
                            startIcon={<DownloadIcon />}
                            onClick={handleDownload}
                            sx={{ mb: 3 }}
                        >
                            Download Monthly Report
                        </Button>

                        {loading ? (
                            <Typography>Loading...</Typography>
                        ) : attendanceData ? (
                            <div style={{ width: '100%', height: 400 }}>
                                <ResponsiveContainer>
                                    <BarChart
                                        data={prepareChartData()}
                                        margin={{
                                            top: 20,
                                            right: 30,
                                            left: 20,
                                            bottom: 5,
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        {attendanceData.subjects.map((subject, index) => (
                                            <Bar
                                                key={subject.name}
                                                dataKey={subject.name}
                                                fill={`#${Math.floor(Math.random()*16777215).toString(16)}`}
                                            />
                                        ))}
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        ) : (
                            <Typography>Select class, month, and year to view attendance data</Typography>
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default AttendanceDashboard; 