import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const CustomPieChart = ({ data }) => {
    // Using Tailwind's red color palette (700 for dark red, 500 for accent)
    const COLORS = ['#b91c1c', '#f87171']; // dark-red-700, red-400

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text 
                x={x} 
                y={y} 
                fill="white" 
                textAnchor={x > cx ? 'start' : 'end'} 
                dominantBaseline="central"
                className="text-sm font-medium"
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="w-full h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            dataKey="value"
                            className="focus:outline-none"
                        >
                            {data.map((entry, index) => (
                                <Cell 
                                    key={`cell-${index}`} 
                                    fill={COLORS[index % COLORS.length]} 
                                    stroke="#fff"
                                    strokeWidth={2}
                                />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="flex justify-center mt-4 space-x-4">
                {data.map((entry, index) => (
                    <div key={`legend-${index}`} className="flex items-center">
                        <div 
                            className="w-4 h-4 rounded-full mr-2" 
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="text-gray-700 text-sm">{entry.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CustomPieChart;