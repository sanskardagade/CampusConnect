import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Calendar } from "@/components/ui/calendar";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Download, CalendarIcon, FileText, BarChart2, PieChart } from "lucide-react";
import { format } from "date-fns";
// import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart as RechartsClassNames } from "recharts";

export function ReportGenerator({ students }) {
  const [reportType, setReportType] = useState("attendance");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [dateRange, setDateRange] = useState({
    from: new Date(),
    to: new Date(),
  });

  const generateReport = () => {
    if (!department) {
      toast.error("Please select a department");
      return;
    }

    if (!dateRange.from || !dateRange.to) {
      toast.error("Please select a date range");
      return;
    }

    const reportName = `${reportType}_report_${department}${year ? `_year${year}` : ""}_${format(
      dateRange.from,
      "yyyy-MM-dd"
    )}_to_${format(dateRange.to, "yyyy-MM-dd")}`;

    toast.success(`Report "${reportName}.pdf" generated successfully!`);
  };

  const departmentDistribution = [
    { name: "Computer Science", value: 35 },
    { name: "Electrical", value: 25 },
    { name: "Mechanical", value: 20 },
    { name: "Civil", value: 15 },
    { name: "Business", value: 5 },
  ];

  const attendanceData = [
    { name: "90-100%", students: 45 },
    { name: "75-89%", students: 30 },
    { name: "60-74%", students: 15 },
    { name: "Below 60%", students: 10 },
  ];

  return (
    <Card className="border-crimson-300/20 bg-white/5 backdrop-blur-sm shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold flex items-center">
          <FileText className="mr-2 h-5 w-5 text-crimson-500" />
          Generate Reports
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="generate" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="generate">Generate Report</TabsTrigger>
            <TabsTrigger value="analytics">Analytics Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="generate">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reportType">Report Type</Label>
                  <Select value={reportType} onValueChange={setReportType}>
                    <SelectTrigger id="reportType" className="border-crimson-200/20 focus:ring-crimson-500">
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="attendance">Attendance Report</SelectItem>
                      <SelectItem value="summary">Department Summary</SelectItem>
                      <SelectItem value="comparison">Year Comparison</SelectItem>
                      <SelectItem value="individual">Individual Student Report</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select value={department} onValueChange={setDepartment}>
                    <SelectTrigger id="department" className="border-crimson-200/20 focus:ring-crimson-500">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      <SelectItem value="computer_science">Computer Science</SelectItem>
                      <SelectItem value="electrical">Electrical Engineering</SelectItem>
                      <SelectItem value="mechanical">Mechanical Engineering</SelectItem>
                      <SelectItem value="civil">Civil Engineering</SelectItem>
                      <SelectItem value="business">Business Administration</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Select value={year} onValueChange={setYear}>
                    <SelectTrigger id="year" className="border-crimson-200/20 focus:ring-crimson-500">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Years</SelectItem>
                      <SelectItem value="1">First Year</SelectItem>
                      <SelectItem value="2">Second Year</SelectItem>
                      <SelectItem value="3">Third Year</SelectItem>
                      <SelectItem value="4">Fourth Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Date Range</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={`w-full justify-start text-left font-normal border-crimson-200/20 ${
                            !dateRange.from && "text-muted-foreground"
                          }`}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateRange.from ? format(dateRange.from, "PPP") : "From"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={dateRange.from}
                          onSelect={(date) => date && setDateRange({ ...dateRange, from: date })}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>

                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={`w-full justify-start text-left font-normal border-crimson-200/20 ${
                            !dateRange.to && "text-muted-foreground"
                          }`}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateRange.to ? format(dateRange.to, "PPP") : "To"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={dateRange.to}
                          onSelect={(date) => date && setDateRange({ ...dateRange, to: date })}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <Button
                  onClick={generateReport}
                  className="w-full mt-6 bg-crimson-700 hover:bg-crimson-800 text-white flex items-center gap-1"
                >
                  <Download className="h-4 w-4 mr-1" /> Generate Report
                </Button>
              </div>

              <div className="flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <FileText className="h-20 w-20 text-crimson-500 mb-4" />
                <h3 className="text-lg font-medium mb-2">Report Preview</h3>
                <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-4">
                  Your report will include detailed analytics, charts, and data tables based on your selected parameters.
                </p>
                <div className="space-y-2 w-full">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Report Type:</span>
                    <span className="font-medium capitalize">{reportType.replace("_", " ")} Report</span>
                  </div>
                  {department && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Department:</span>
                      <span className="font-medium capitalize">
                        {department === "all" ? "All Departments" : department.replace("_", " ")}
                      </span>
                    </div>
                  )}
                  {year && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Year:</span>
                      <span className="font-medium">Year {year}</span>
                    </div>
                  )}
                  {dateRange.from && dateRange.to && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Period:</span>
                      <span className="font-medium">
                        {format(dateRange.from, "dd MMM")} - {format(dateRange.to, "dd MMM, yyyy")}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg flex flex-col items-center">
                <div className="flex items-center mb-4">
                  <PieChart className="h-5 w-5 text-crimson-500 mr-2" />
                  <h3 className="text-lg font-medium">Department Distribution</h3>
                </div>
                <div className="w-full h-64 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <BarChart2 className="h-12 w-12 mx-auto mb-2 text-crimson-400" />
                    <p>Department distribution chart would appear here</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 w-full mt-2">
                  {departmentDistribution.map((item) => (
                    <div key={item.name} className="flex justify-between text-sm">
                      <span className="text-gray-500">{item.name}:</span>
                      <span className="font-medium">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg flex flex-col items-center">
                <div className="flex items-center mb-4">
                  <BarChart2 className="h-5 w-5 text-crimson-500 mr-2" />
                  <h3 className="text-lg font-medium">Attendance Overview</h3>
                </div>
                <div className="w-full h-64 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <PieChart className="h-12 w-12 mx-auto mb-2 text-crimson-400" />
                    <p>Attendance distribution chart would appear here</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 w-full mt-2">
                  {attendanceData.map((item) => (
                    <div key={item.name} className="flex justify-between text-sm">
                      <span className="text-gray-500">{item.name}:</span>
                      <span className="font-medium">{item.students} students</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
export default ReportGenerator;
