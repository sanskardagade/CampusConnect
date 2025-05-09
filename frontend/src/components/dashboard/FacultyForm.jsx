import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { UserPlus } from "lucide-react";

export function FacultyForm({ onAddFaculty }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    facultyId: "",
    department: "",
    position: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.facultyId || !formData.department || !formData.position) {
      toast.error("Please fill all fields");
      return;
    }

    const newFaculty = {
      ...formData,
      id: Date.now().toString(),
    };

    onAddFaculty(newFaculty);
    toast.success("Faculty added successfully!");

    setFormData({
      name: "",
      email: "",
      facultyId: "",
      department: "",
      position: "",
    });
  };

  return (
    <Card className="border-crimson-300/20 bg-white/5 backdrop-blur-sm shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold flex items-center">
          <UserPlus className="mr-2 h-5 w-5 text-crimson-500" />
          Add New Faculty
        </CardTitle>
        <CardDescription>
          Enter faculty details to register them in the system
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Dr. Jane Smith"
                value={formData.name}
                onChange={handleChange}
                className="border-crimson-200/20 focus-visible:ring-crimson-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="jane.smith@example.com"
                value={formData.email}
                onChange={handleChange}
                className="border-crimson-200/20 focus-visible:ring-crimson-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="facultyId">Faculty ID</Label>
              <Input
                id="facultyId"
                name="facultyId"
                placeholder="FC12345"
                value={formData.facultyId}
                onChange={handleChange}
                className="border-crimson-200/20 focus-visible:ring-crimson-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Select 
                value={formData.department} 
                onValueChange={(value) => handleSelectChange("department", value)}
              >
                <SelectTrigger className="border-crimson-200/20 focus:ring-crimson-500">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="computer_science">Computer Science</SelectItem>
                  <SelectItem value="electrical">Electrical Engineering</SelectItem>
                  <SelectItem value="mechanical">Mechanical Engineering</SelectItem>
                  <SelectItem value="civil">Civil Engineering</SelectItem>
                  <SelectItem value="business">Business Administration</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Select 
                value={formData.position} 
                onValueChange={(value) => handleSelectChange("position", value)}
              >
                <SelectTrigger className="border-crimson-200/20 focus:ring-crimson-500">
                  <SelectValue placeholder="Select position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professor">Professor</SelectItem>
                  <SelectItem value="associate_professor">Associate Professor</SelectItem>
                  <SelectItem value="assistant_professor">Assistant Professor</SelectItem>
                  <SelectItem value="lecturer">Lecturer</SelectItem>
                  <SelectItem value="lab_assistant">Lab Assistant</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <CardFooter className="px-0 pb-0">
            <Button 
              type="submit" 
              className="w-full bg-crimson-700 hover:bg-crimson-800 text-white"
            >
              Add Faculty
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
