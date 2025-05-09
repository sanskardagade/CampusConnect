import React, { useState, useRef, useEffect } from 'react';
import { Upload, FileText, Trash2, Download, Check, AlertTriangle, X, Paperclip, Book, BookOpen } from 'lucide-react';

const AddNotes = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [division, setDivision] = useState('');
  const [subject, setSubject] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const fileInputRef = useRef(null);

  const divisions = ['A', 'B', 'C', 'D'];
  const subjects = [
  
    'Data Structures', 
    'Database Management', 
    'Computer Networks', 
    'Operating Systems',
    'Software Engineering',
    'principal of programming langualge',
    'Algorithm Design'
  ];

  // Load existing notes from localStorage on component mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('facultyNotes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Save notes to localStorage whenever notes array changes
  useEffect(() => {
    localStorage.setItem('facultyNotes', JSON.stringify(notes));
  }, [notes]);

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage('File size exceeds 10MB limit');
      setSelectedFile(null);
      e.target.value = null;
      return;
    }

    // Check file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'];
    if (!allowedTypes.includes(file.type)) {
      setErrorMessage('Only PDF, DOC, DOCX, PPT, and PPTX files are allowed');
      setSelectedFile(null);
      e.target.value = null;
      return;
    }

    setSelectedFile(file);
    setErrorMessage('');

    // Create preview URL for PDF files
    if (file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl('');
    }
  };

  // Clear form fields
  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDivision('');
    setSubject('');
    setSelectedFile(null);
    setPreviewUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form fields
    if (!title.trim() || !subject || !division || !selectedFile) {
      setErrorMessage('Please fill all required fields and upload a file');
      return;
    }

    // Create new note object
    const newNote = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      division,
      subject,
      fileName: selectedFile.name,
      fileSize: selectedFile.size,
      fileType: selectedFile.type,
      uploadDate: new Date().toISOString(),
      // In a real implementation, we would upload to server and store URL
      // Here we'll store the file object directly (this is not ideal for production)
      fileData: URL.createObjectURL(selectedFile)
    };

    // Add new note to state
    setNotes(prevNotes => [newNote, ...prevNotes]);
    
    // Show success message
    setSuccessMessage('Note added successfully!');
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
    
    // Reset form
    resetForm();
  };

  // Handle note deletion
  const deleteNote = (id) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  // Format date
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get file icon based on type
  const getFileIcon = (fileType) => {
    if (fileType.includes('pdf')) return <FileText className="h-5 w-5 text-red-800" />;
    if (fileType.includes('word')) return <Book className="h-5 w-5 text-blue-700" />;
    if (fileType.includes('presentation')) return <BookOpen className="h-5 w-5 text-orange-600" />;
    return <Paperclip className="h-5 w-5 text-gray-600" />;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-900 to-red-800 text-white py-6 px-4 shadow-md">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-center">Faculty Notes Upload</h1>
          <p className="text-center text-red-100 mt-2">
            Upload course materials for students to download
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-4 sm:p-6">
        {/* Form Section */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 mb-8">
          <div className="p-6">
            <h2 className="text-xl font-bold text-red-900 mb-4 flex items-center">
              <Upload className="h-5 w-5 mr-2" />
              Upload New Notes
            </h2>

            {errorMessage && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center">
                <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
                <p className="text-red-700 text-sm">{errorMessage}</p>
                <button 
                  onClick={() => setErrorMessage('')}
                  className="ml-auto text-red-700 hover:text-red-900"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}

            {successMessage && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md flex items-center">
                <Check className="h-5 w-5 text-green-600 mr-2" />
                <p className="text-green-700 text-sm">{successMessage}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="e.g. Chapter 5 Notes - Data Structures"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject <span className="text-red-600">*</span>
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Subject</option>
                    {subjects.map(subj => (
                      <option key={subj} value={subj}>{subj}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Division <span className="text-red-600">*</span>
                  </label>
                  <select
                    value={division}
                    onChange={(e) => setDivision(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Division</option>
                    {divisions.map(div => (
                      <option key={div} value={div}>Division {div}</option>
                    ))}
                    <option value="all">All Divisions</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    File Upload <span className="text-red-600">*</span>
                  </label>
                  <div className="flex items-center">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                      accept=".pdf,.doc,.docx,.ppt,.pptx"
                      id="file-upload"
                      required
                    />
                    <label
                      htmlFor="file-upload"
                      className="px-4 py-2 bg-red-800 text-white rounded-l-md hover:bg-red-900 cursor-pointer flex items-center"
                    >
                      <Paperclip className="h-4 w-4 mr-1" />
                      Browse
                    </label>
                    <div className="flex-1 border border-l-0 border-gray-300 rounded-r-md px-3 py-2 bg-gray-50 text-sm text-gray-500 truncate">
                      {selectedFile ? selectedFile.name : 'No file selected'}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Accepted formats: PDF, DOC, DOCX, PPT, PPTX (Max: 10MB)
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Brief description about these notes..."
                  rows={3}
                />
              </div>

              {previewUrl && (
                <div className="border border-gray-200 rounded-md p-2 bg-gray-50">
                  <p className="text-sm font-medium text-gray-700 mb-2">File Preview:</p>
                  <embed
                    src={previewUrl}
                    type="application/pdf"
                    width="100%"
                    height="200px"
                    className="border rounded"
                  />
                </div>
              )}

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Clear
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-800 text-white rounded-md hover:bg-red-900 flex items-center"
                >
                  <Upload className="h-4 w-4 mr-1" />
                  Upload Notes
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Uploaded Notes List */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200">
          <div className="p-6">
            <h2 className="text-xl font-bold text-red-900 mb-4 flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Uploaded Notes
            </h2>

            {notes.length === 0 ? (
              <div className="p-8 text-center text-gray-500 border border-dashed border-gray-300 rounded-md">
                <FileText className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                <p>No notes uploaded yet</p>
                <p className="text-sm mt-1">Upload your first note using the form above</p>
              </div>
            ) : (
              <div className="space-y-4">
                {notes.map(note => (
                  <div 
                    key={note.id} 
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="sm:flex justify-between items-start">
                      <div className="flex items-start space-x-3">
                        <div className="p-2 bg-red-50 rounded-md">
                          {getFileIcon(note.fileType)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">{note.title}</h3>
                          <p className="text-sm text-gray-500 mt-1">{note.subject} • Division {note.division}</p>
                          {note.description && (
                            <p className="text-sm text-gray-600 mt-2">{note.description}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 mt-3 sm:mt-0">
                        <a
                          href={note.fileData}
                          download={note.fileName}
                          className="px-3 py-1 bg-red-100 text-red-800 rounded-md hover:bg-red-200 flex items-center text-sm font-medium"
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </a>
                        <button
                          onClick={() => deleteNote(note.id)}
                          className="p-1 text-gray-500 hover:text-red-600 rounded-md hover:bg-red-50"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center text-xs text-gray-500 mt-3 pt-2 border-t border-gray-100">
                      <span className="mr-3">
                        <span className="font-medium">Filename:</span> {note.fileName}
                      </span>
                      <span className="mr-3">
                        <span className="font-medium">Size:</span> {formatFileSize(note.fileSize)}
                      </span>
                      <span className="mr-3">
                        <span className="font-medium">Uploaded:</span> {formatDate(note.uploadDate)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};



export default AddNotes;