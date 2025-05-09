import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Input } from "../../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Search, Trash2, FileText } from "lucide-react";
// import { toast } from "sonner";

const departmentNames = {
  computer_science: "Computer Science",
  electrical: "Electrical Engineering",
  mechanical: "Mechanical Engineering",
  civil: "Civil Engineering",
  business: "Business Administration",
};

const positionNames = {
  professor: "Professor",
  associate_professor: "Associate Professor",
  assistant_professor: "Assistant Professor",
  lecturer: "Lecturer",
  lab_assistant: "Lab Assistant",
};

export function FacultyList({ faculty, onDeleteFaculty }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFaculty = faculty.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.facultyId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    onDeleteFaculty(id);
    toast.success("Faculty member deleted successfully");
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const viewDetails = (faculty) => {
    toast.info(`Details for ${faculty.name} (${faculty.facultyId})`);
  };

  return (
    <Card className="border-crimson-300/20 bg-white/5 backdrop-blur-sm shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold">Faculty List</CardTitle>
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search faculty..."
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
                <TableHead>Position</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFaculty.length > 0 ? (
                filteredFaculty.map((member) => (
                  <TableRow key={member.id} className="hover:bg-crimson-50/5">
                    <TableCell className="font-medium">{member.facultyId}</TableCell>
                    <TableCell>{member.name}</TableCell>
                    <TableCell>{departmentNames[member.department] || member.department}</TableCell>
                    <TableCell>{positionNames[member.position] || member.position}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => viewDetails(member)}
                          className="h-8 w-8 border-crimson-200/20 hover:bg-crimson-50/10"
                        >
                          <FileText className="h-4 w-4 text-crimson-600" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDelete(member.id)}
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
                  <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                    {searchTerm ? "No matching faculty found" : "No faculty added yet"}
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
