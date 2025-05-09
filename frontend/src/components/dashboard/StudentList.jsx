import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Search, Trash2, FileText } from "lucide-react";
// import { toast } from "sonner";

const departmentNames = {
  computer_science: "Computer Science",
  electrical: "Electrical Engineering",
  mechanical: "Mechanical Engineering",
  civil: "Civil Engineering",
  business: "Business Administration",
};

export function StudentsList({ students, onDeleteStudent }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    onDeleteStudent(id);
    toast.success("Student deleted successfully");
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const viewDetails = (student) => {
    toast.info(`Details for ${student.name} (${student.studentId})`);
  };

  return (
    <Card className="border-crimson-300/20 bg-white/5 backdrop-blur-sm shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold">Students List</CardTitle>
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search students..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-8 border-crimson-200/20 focus-visible:ring-crimson-500"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border border-crimson-200/20">
          <Table>
            <TableHeader className="bg-crimson-50/5">
              <TableRow>
                <TableHead className="w-[80px]">ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Year</TableHead>
                <TableHead className="text-center">Attendance %</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <TableRow key={student.id} className="hover:bg-crimson-50/5">
                    <TableCell className="font-medium">{student.studentId}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>
                      {departmentNames[student.department] || student.department}
                    </TableCell>
                    <TableCell>Year {student.year}</TableCell>
                    <TableCell className="text-center">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          student.attendance >= 75
                            ? "bg-green-100 text-green-800"
                            : student.attendance >= 60
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {student.attendance}%
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => viewDetails(student)}
                          className="h-8 w-8 border-crimson-200/20 hover:bg-crimson-50/10"
                        >
                          <FileText className="h-4 w-4 text-crimson-600" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDelete(student.id)}
                          className="h-8 w-8 border-crimson-200/20 hover:bg-crimson-50/10"
                        >
                          <Trash2 className="h-4 w-4 text-crimson-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                    {searchTerm ? "No matching students found" : "No students added yet"}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
