// import React, { useState, useEffect } from 'react';
// import { Plus, Edit, Trash2, Save, X, Star, ExternalLink, Github, Loader2, RefreshCw, Upload, Image as ImageIcon } from 'lucide-react';

// const API_BASE_URL = 'http://localhost:5065/api';

// interface Project {
//   id?: string;
//   title: string;
//   description: string;
//   image: string;
//   imageContentType?: string;
//   technologies: string[];
//   category: 'fullstack' | 'frontend' | 'backend';
//   github?: string;
//   live?: string;
//   featured: boolean;
// }

// const ProjectsManager = () => {
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [isAdding, setIsAdding] = useState(false);
//   const [editingId, setEditingId] = useState<string | null>(null);
//   const [formLoading, setFormLoading] = useState(false);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const [imageFile, setImageFile] = useState<File | null>(null);
  
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     technologies: '',
//     category: 'fullstack' as 'fullstack' | 'frontend' | 'backend',
//     github: '',
//     live: '',
//     featured: false
//   });

//   const categories = [
//     { value: 'fullstack', label: 'Full Stack', color: 'text-blue-400' },
//     { value: 'frontend', label: 'Frontend', color: 'text-green-400' },
//     { value: 'backend', label: 'Backend', color: 'text-purple-400' }
//   ];

//   // Get Auth Token
//   const getAuthToken = () => {
//     return sessionStorage.getItem('portfolio_admin_token');
//   };

//   // Get Auth Headers (without Content-Type for FormData)
//   const getAuthHeaders = (includeContentType = true) => {
//     const token = getAuthToken();
//     const headers: Record<string, string> = {};
    
//     if (includeContentType) {
//       headers['Content-Type'] = 'application/json';
//     }
    
//     if (token) {
//       headers['Authorization'] = `Bearer ${token}`;
//     }
    
//     return headers;
//   };

//   // Convert base64 to image data URL
//   const getImageUrl = (image: string, contentType?: string) => {
//     if (!image) return '';
//     if (image.startsWith('http')) return image;
//     if (image.startsWith('data:')) return image;
//     return `data:${contentType || 'image/jpeg'};base64,${image}`;
//   };

//   // Handle image file selection
//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
//       if (!allowedTypes.includes(file.type)) {
//         setError('Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.');
//         return;
//       }

//       if (file.size > 5 * 1024 * 1024) {
//         setError('File size must not exceed 5MB');
//         return;
//       }

//       setImageFile(file);
      
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//       setError(null);
//     }
//   };

//   // Fetch all projects
//   const fetchProjects = async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const response = await fetch(`${API_BASE_URL}/project`, {
//         method: 'GET',
//         headers: getAuthHeaders(),
//         credentials: 'include' // Added for CORS
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch projects');
//       }

//       const data = await response.json();
//       const normalizedData = data.map((project: any) => ({
//         ...project,
//         technologies: project.technologies || [],
//         github: project.github || '',
//         live: project.live || '',
//         featured: project.featured || false
//       }));
//       setProjects(normalizedData);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Failed to fetch projects');
//       console.error('Error fetching projects:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProjects();
//   }, []);

//   // Add new project
//   const addProject = async (formDataObj: FormData) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/project`, {
//         method: 'POST',
//         headers: getAuthHeaders(false),
//         body: formDataObj,
//         credentials: 'include' // Added for CORS
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Failed to create project');
//       }

//       const data = await response.json();
//       const normalizedProject = {
//         ...data.project,
//         technologies: data.project.technologies || [],
//         github: data.project.github || '',
//         live: data.project.live || '',
//         featured: data.project.featured || false
//       };
//       setProjects(prev => [...prev, normalizedProject]);
//       return normalizedProject;
//     } catch (err) {
//       console.error('Error adding project:', err);
//       throw err;
//     }
//   };

//   // Update existing project
//   const updateProject = async (id: string, formDataObj: FormData) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/project/${id}`, {
//         method: 'PUT',
//         headers: getAuthHeaders(false),
//         body: formDataObj,
//         credentials: 'include' // Added for CORS
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Failed to update project');
//       }

//       const data = await response.json();
//       const normalizedProject = {
//         ...data.project,
//         technologies: data.project.technologies || [],
//         github: data.project.github || '',
//         live: data.project.live || '',
//         featured: data.project.featured || false
//       };
//       setProjects(prev => prev.map(p => p.id === id ? normalizedProject : p));
//       return normalizedProject;
//     } catch (err) {
//       console.error('Error updating project:', err);
//       throw err;
//     }
//   };

//   // Delete project
//   const deleteProject = async (id: string) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/project/${id}`, {
//         method: 'DELETE',
//         headers: getAuthHeaders(),
//         credentials: 'include' // Added for CORS
//       });

//       if (!response.ok) {
//         throw new Error('Failed to delete project');
//       }

//       setProjects(prev => prev.filter(p => p.id !== id));
//     } catch (err) {
//       console.error('Error deleting project:', err);
//       throw err;
//     }
//   };

//   // Handle form submission
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setFormLoading(true);
//     setError(null);

//     try {
//       if (!editingId && !imageFile) {
//         setError('Please select an image for the project');
//         setFormLoading(false);
//         return;
//       }

//       const formDataObj = new FormData();
//       formDataObj.append('Title', formData.title); // Changed to PascalCase
//       formDataObj.append('Description', formData.description); // Changed to PascalCase
//       formDataObj.append('Category', formData.category); // Changed to PascalCase
//       formDataObj.append('Github', formData.github || ''); // Changed to PascalCase
//       formDataObj.append('Live', formData.live || ''); // Changed to PascalCase
//       formDataObj.append('Featured', formData.featured.toString()); // Changed to PascalCase

//       // FIX: Send technologies as a single JSON string
//       const techArray = formData.technologies.split(',').map(tech => tech.trim()).filter(tech => tech);
//       // Send as JSON array
//       techArray.forEach(tech => {
//         formDataObj.append('Technologies', tech); // Changed to PascalCase
//       });

//       if (imageFile) {
//         formDataObj.append('ImageFile', imageFile); // Changed to PascalCase
//       }

//       // Debug: Log FormData contents
//       console.log('FormData contents:');
//       for (let pair of formDataObj.entries()) {
//         console.log(pair[0], pair[1]);
//       }

//       if (editingId) {
//         await updateProject(editingId, formDataObj);
//         setEditingId(null);
//       } else {
//         await addProject(formDataObj);
//         setIsAdding(false);
//       }

//       setFormData({
//         title: '',
//         description: '',
//         technologies: '',
//         category: 'fullstack',
//         github: '',
//         live: '',
//         featured: false
//       });
//       setImageFile(null);
//       setImagePreview(null);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Failed to save project');
//     } finally {
//       setFormLoading(false);
//     }
//   };

//   const handleEdit = (project: Project) => {
//     setFormData({
//       title: project.title,
//       description: project.description,
//       technologies: project.technologies.join(', '),
//       category: project.category,
//       github: project.github || '',
//       live: project.live || '',
//       featured: project.featured
//     });
//     setEditingId(project.id || null);
//     setIsAdding(false);
    
//     if (project.image) {
//       setImagePreview(getImageUrl(project.image, project.imageContentType));
//     }
//     setImageFile(null);
//   };

//   const handleCancel = () => {
//     setIsAdding(false);
//     setEditingId(null);
//     setError(null);
//     setImageFile(null);
//     setImagePreview(null);
//     setFormData({
//       title: '',
//       description: '',
//       technologies: '',
//       category: 'fullstack',
//       github: '',
//       live: '',
//       featured: false
//     });
//   };

//   const handleDelete = async (id: string) => {
//     if (window.confirm('Are you sure you want to delete this project?')) {
//       setError(null);
//       try {
//         await deleteProject(id);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'Failed to delete project');
//       }
//     }
//   };

//   const toggleFeatured = async (project: Project) => {
//     setError(null);
//     try {
//       const formDataObj = new FormData();
//       formDataObj.append('Title', project.title);
//       formDataObj.append('Description', project.description);
//       formDataObj.append('Category', project.category);
//       formDataObj.append('Github', project.github || '');
//       formDataObj.append('Live', project.live || '');
//       formDataObj.append('Featured', (!project.featured).toString());
      
//       project.technologies.forEach(tech => {
//         formDataObj.append('Technologies', tech);
//       });

//       await updateProject(project.id!, formDataObj);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Failed to update featured status');
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-3xl font-bold text-white">Projects Management</h1>
//         <div className="flex items-center space-x-3">
//           <button
//             onClick={fetchProjects}
//             disabled={isLoading}
//             className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all duration-300 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
//             <span>Refresh</span>
//           </button>
//           <button
//             onClick={() => setIsAdding(true)}
//             disabled={isAdding || editingId !== null}
//             className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             <Plus className="w-4 h-4" />
//             <span>Add Project</span>
//           </button>
//         </div>
//       </div>

//       {error && (
//         <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-start justify-between">
//           <div>
//             <p className="text-red-400 font-medium">Error</p>
//             <p className="text-red-300 text-sm">{error}</p>
//           </div>
//           <button
//             onClick={() => setError(null)}
//             className="text-red-400 hover:text-red-300"
//           >
//             <X className="w-4 h-4" />
//           </button>
//         </div>
//       )}

//       {(isAdding || editingId) && (
//         <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
//           <h2 className="text-xl font-bold text-white mb-4">
//             {editingId ? 'Edit Project' : 'Add New Project'}
//           </h2>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="grid md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-gray-400 mb-2 text-sm font-medium">
//                   Project Title *
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.title}
//                   onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                   required
//                   className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-400 transition-colors duration-300"
//                   placeholder="e.g., E-Commerce Platform"
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-400 mb-2 text-sm font-medium">
//                   Category *
//                 </label>
//                 <select
//                   value={formData.category}
//                   onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
//                   className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-400 transition-colors duration-300"
//                 >
//                   {categories.map(category => (
//                     <option key={category.value} value={category.value}>
//                       {category.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             <div>
//               <label className="block text-gray-400 mb-2 text-sm font-medium">
//                 Description *
//               </label>
//               <textarea
//                 value={formData.description}
//                 onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                 required
//                 rows={3}
//                 className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-400 transition-colors duration-300 resize-none"
//                 placeholder="Brief description of the project..."
//               />
//             </div>

//             <div>
//               <label className="block text-gray-400 mb-2 text-sm font-medium">
//                 Project Image * {editingId && '(Leave empty to keep current image)'}
//               </label>
//               <div className="space-y-3">
//                 <div className="flex items-center space-x-4">
//                   <label className="flex-1 cursor-pointer">
//                     <div className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-gray-400 hover:border-blue-400 transition-colors duration-300 flex items-center justify-center space-x-2">
//                       <Upload className="w-5 h-5" />
//                       <span>{imageFile ? imageFile.name : 'Choose image file'}</span>
//                     </div>
//                     <input
//                       type="file"
//                       accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
//                       onChange={handleImageChange}
//                       className="hidden"
//                     />
//                   </label>
//                 </div>
                
//                 {imagePreview && (
//                   <div className="relative w-full h-48 bg-gray-900 rounded-lg overflow-hidden border border-gray-600">
//                     <img
//                       src={imagePreview}
//                       alt="Preview"
//                       className="w-full h-full object-cover"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => {
//                         setImageFile(null);
//                         setImagePreview(null);
//                       }}
//                       className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
//                     >
//                       <X className="w-4 h-4" />
//                     </button>
//                   </div>
//                 )}
//                 <p className="text-gray-500 text-xs">Supported formats: JPEG, PNG, GIF, WebP (Max 5MB)</p>
//               </div>
//             </div>

//             <div>
//               <label className="block text-gray-400 mb-2 text-sm font-medium">
//                 Technologies (comma-separated) *
//               </label>
//               <input
//                 type="text"
//                 value={formData.technologies}
//                 onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
//                 required
//                 className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-400 transition-colors duration-300"
//                 placeholder="React, Node.js, MongoDB, Express"
//               />
//             </div>

//             <div className="grid md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-gray-400 mb-2 text-sm font-medium">
//                   GitHub URL
//                 </label>
//                 <input
//                   type="url"
//                   value={formData.github}
//                   onChange={(e) => setFormData({ ...formData, github: e.target.value })}
//                   className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-400 transition-colors duration-300"
//                   placeholder="https://github.com/username/repo"
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-400 mb-2 text-sm font-medium">
//                   Live Demo URL
//                 </label>
//                 <input
//                   type="url"
//                   value={formData.live}
//                   onChange={(e) => setFormData({ ...formData, live: e.target.value })}
//                   className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-400 transition-colors duration-300"
//                   placeholder="https://project-demo.com"
//                 />
//               </div>
//             </div>

//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 id="featured"
//                 checked={formData.featured}
//                 onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
//                 className="w-4 h-4 text-blue-600 bg-gray-900 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
//               />
//               <label htmlFor="featured" className="ml-2 text-gray-400">
//                 Mark as featured project
//               </label>
//             </div>

//             <div className="flex items-center space-x-4">
//               <button
//                 type="submit"
//                 disabled={formLoading}
//                 className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {formLoading ? (
//                   <>
//                     <Loader2 className="w-4 h-4 animate-spin" />
//                     <span>Saving...</span>
//                   </>
//                 ) : (
//                   <>
//                     <Save className="w-4 h-4" />
//                     <span>{editingId ? 'Update' : 'Add'} Project</span>
//                   </>
//                 )}
//               </button>
//               <button
//                 type="button"
//                 onClick={handleCancel}
//                 disabled={formLoading}
//                 className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-300 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <X className="w-4 h-4" />
//                 <span>Cancel</span>
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       {isLoading && !formLoading && (
//         <div className="flex flex-col items-center justify-center py-12">
//           <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-3" />
//           <p className="text-gray-400">Loading projects...</p>
//         </div>
//       )}

//       {!isLoading && (
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {projects.map((project) => (
//             <div
//               key={project.id}
//               className="bg-gray-800 rounded-xl border border-gray-700 hover:border-gray-600 transition-colors duration-300 overflow-hidden"
//             >
//               <div className="relative">
//                 <img
//                   src={getImageUrl(project.image, project.imageContentType)}
//                   alt={project.title}
//                   className="w-full h-48 object-cover"
//                   onError={(e) => {
//                     e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
//                   }}
//                 />
//                 <div className="absolute top-2 right-2 flex items-center space-x-2">
//                   {project.featured && (
//                     <div className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
//                       <Star className="w-3 h-3 mr-1" />
//                       Featured
//                     </div>
//                   )}
//                   <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
//                     project.category === 'fullstack' ? 'bg-blue-500/20 text-blue-400' :
//                     project.category === 'frontend' ? 'bg-green-500/20 text-green-400' :
//                     'bg-purple-500/20 text-purple-400'
//                   }`}>
//                     {categories.find(c => c.value === project.category)?.label}
//                   </div>
//                 </div>
//               </div>

//               <div className="p-4">
//                 <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
//                 <p className="text-gray-400 text-sm mb-3 line-clamp-2">{project.description}</p>
                
//                 <div className="flex flex-wrap gap-1 mb-3">
//                   {(project.technologies || []).slice(0, 3).map((tech, index) => (
//                     <span
//                       key={index}
//                       className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs"
//                     >
//                       {tech}
//                     </span>
//                   ))}
//                   {(project.technologies || []).length > 3 && (
//                     <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
//                       +{project.technologies.length - 3} more
//                     </span>
//                   )}
//                 </div>

//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-2">
//                     {project.github && (
//                       <a
//                         href={project.github}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-gray-400 hover:text-white transition-colors duration-300"
//                         title="View on GitHub"
//                       >
//                         <Github className="w-4 h-4" />
//                       </a>
//                     )}
//                     {project.live && (
//                       <a
//                         href={project.live}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
//                         title="View Live Demo"
//                       >
//                         <ExternalLink className="w-4 h-4" />
//                       </a>
//                     )}
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <button
//                       onClick={() => toggleFeatured(project)}
//                       className={`transition-colors duration-300 ${
//                         project.featured ? 'text-yellow-400' : 'text-gray-400 hover:text-yellow-400'
//                       }`}
//                       title={project.featured ? 'Remove from featured' : 'Mark as featured'}
//                     >
//                       <Star className={`w-4 h-4 ${project.featured ? 'fill-current' : ''}`} />
//                     </button>
//                     <button
//                       onClick={() => handleEdit(project)}
//                       className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
//                       title="Edit project"
//                     >
//                       <Edit className="w-4 h-4" />
//                     </button>
//                     <button
//                       onClick={() => handleDelete(project.id!)}
//                       className="text-red-400 hover:text-red-300 transition-colors duration-300"
//                       title="Delete project"
//                     >
//                       <Trash2 className="w-4 h-4" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {!isLoading && projects.length === 0 && (
//         <div className="text-center py-12 bg-gray-800 rounded-xl border border-gray-700">
//           <div className="text-gray-500 mb-4">
//             <ImageIcon className="w-16 h-16 mx-auto mb-3 opacity-50" />
//           </div>
//           <p className="text-gray-400 text-lg font-medium">No projects added yet</p>
//           <p className="text-gray-500 text-sm mt-2">Click "Add Project" to create your first project</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProjectsManager;


import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Star, ExternalLink, Github, Loader2, RefreshCw, Upload, Image as ImageIcon } from 'lucide-react';

const API_BASE_URL = 'http://localhost:5065/api';

interface Project {
  id?: string;
  title: string;
  description: string;
  image: string;
  imageContentType?: string;
  technologies: string[];
  category: 'fullstack' | 'frontend' | 'backend';
  github?: string;
  live?: string;
  featured: boolean;
}

const ProjectsManager = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    category: 'fullstack' as 'fullstack' | 'frontend' | 'backend',
    github: '',
    live: '',
    featured: false
  });

  const categories = [
    { value: 'fullstack', label: 'Full Stack', color: 'text-blue-400' },
    { value: 'frontend', label: 'Frontend', color: 'text-green-400' },
    { value: 'backend', label: 'Backend', color: 'text-purple-400' }
  ];

  // Get Auth Token
  const getAuthToken = () => {
    return sessionStorage.getItem('portfolio_admin_token');
  };

  // Get Auth Headers - NO Content-Type for FormData
  const getAuthHeaders = () => {
    const token = getAuthToken();
    const headers: Record<string, string> = {};
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
  };

  // Convert base64 to image data URL
  const getImageUrl = (image: string, contentType?: string) => {
    if (!image) return '';
    if (image.startsWith('http')) return image;
    if (image.startsWith('data:')) return image;
    return `data:${contentType || 'image/jpeg'};base64,${image}`;
  };

  // Handle image file selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        setError('Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError('File size must not exceed 5MB');
        return;
      }

      setImageFile(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setError(null);
    }
  };

  // Fetch all projects
  const fetchProjects = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/project`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch projects: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Fetched projects:', data);
      
      const normalizedData = Array.isArray(data) ? data.map((project: any) => ({
        ...project,
        technologies: Array.isArray(project.technologies) ? project.technologies : [],
        github: project.github || '',
        live: project.live || '',
        featured: project.featured || false
      })) : [];
      
      setProjects(normalizedData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch projects';
      setError(errorMessage);
      console.error('Error fetching projects:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Add new project
  const addProject = async (formDataObj: FormData) => {
    try {
      console.log('Adding project with FormData');
      
      const response = await fetch(`${API_BASE_URL}/project`, {
        method: 'POST',
        headers: getAuthHeaders(), // No Content-Type for FormData!
        body: formDataObj
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        let errorMessage = 'Failed to create project';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch {
          errorMessage = `${response.status} ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log('Created project response:', data);
      
      // Backend returns project directly, not wrapped in { project: ... }
      const normalizedProject = {
        ...data,
        technologies: Array.isArray(data.technologies) ? data.technologies : [],
        github: data.github || '',
        live: data.live || '',
        featured: data.featured || false
      };
      
      setProjects(prev => [...prev, normalizedProject]);
      return normalizedProject;
    } catch (err) {
      console.error('Error adding project:', err);
      throw err;
    }
  };

  // Update existing project
  const updateProject = async (id: string, formDataObj: FormData) => {
    try {
      console.log('Updating project:', id);
      
      const response = await fetch(`${API_BASE_URL}/project/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(), // No Content-Type for FormData!
        body: formDataObj
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        let errorMessage = 'Failed to update project';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch {
          errorMessage = `${response.status} ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log('Updated project response:', data);
      
      // Backend returns project directly, not wrapped in { project: ... }
      const normalizedProject = {
        ...data,
        technologies: Array.isArray(data.technologies) ? data.technologies : [],
        github: data.github || '',
        live: data.live || '',
        featured: data.featured || false
      };
      
      setProjects(prev => prev.map(p => p.id === id ? normalizedProject : p));
      return normalizedProject;
    } catch (err) {
      console.error('Error updating project:', err);
      throw err;
    }
  };

  // Delete project
  const deleteProject = async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/project/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to delete project: ${response.status} ${response.statusText}`);
      }

      setProjects(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error('Error deleting project:', err);
      throw err;
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setError(null);

    try {
      if (!editingId && !imageFile) {
        setError('Please select an image for the project');
        setFormLoading(false);
        return;
      }

      const formDataObj = new FormData();
      formDataObj.append('Title', formData.title);
      formDataObj.append('Description', formData.description);
      formDataObj.append('Category', formData.category);
      formDataObj.append('Github', formData.github || '');
      formDataObj.append('Live', formData.live || '');
      formDataObj.append('Featured', formData.featured.toString());

      // Add technologies array
      const techArray = formData.technologies
        .split(',')
        .map(tech => tech.trim())
        .filter(tech => tech);
      
      techArray.forEach(tech => {
        formDataObj.append('Technologies', tech);
      });

      if (imageFile) {
        formDataObj.append('ImageFile', imageFile);
      }

      // Debug: Log FormData contents
      console.log('FormData contents:');
      for (let pair of formDataObj.entries()) {
        console.log(pair[0], pair[1]);
      }

      if (editingId) {
        await updateProject(editingId, formDataObj);
        setEditingId(null);
      } else {
        await addProject(formDataObj);
        setIsAdding(false);
      }

      // Reset form
      setFormData({
        title: '',
        description: '',
        technologies: '',
        category: 'fullstack',
        github: '',
        live: '',
        featured: false
      });
      setImageFile(null);
      setImagePreview(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save project');
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = (project: Project) => {
    setFormData({
      title: project.title,
      description: project.description,
      technologies: Array.isArray(project.technologies) ? project.technologies.join(', ') : '',
      category: project.category,
      github: project.github || '',
      live: project.live || '',
      featured: project.featured
    });
    setEditingId(project.id || null);
    setIsAdding(false);
    
    if (project.image) {
      setImagePreview(getImageUrl(project.image, project.imageContentType));
    }
    setImageFile(null);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setError(null);
    setImageFile(null);
    setImagePreview(null);
    setFormData({
      title: '',
      description: '',
      technologies: '',
      category: 'fullstack',
      github: '',
      live: '',
      featured: false
    });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setError(null);
      try {
        await deleteProject(id);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete project');
      }
    }
  };

  const toggleFeatured = async (project: Project) => {
    setError(null);
    try {
      const formDataObj = new FormData();
      formDataObj.append('Title', project.title);
      formDataObj.append('Description', project.description);
      formDataObj.append('Category', project.category);
      formDataObj.append('Github', project.github || '');
      formDataObj.append('Live', project.live || '');
      formDataObj.append('Featured', (!project.featured).toString());
      
      if (Array.isArray(project.technologies)) {
        project.technologies.forEach(tech => {
          formDataObj.append('Technologies', tech);
        });
      }

      await updateProject(project.id!, formDataObj);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update featured status');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Projects Management</h1>
        <div className="flex items-center space-x-3">
          <button
            onClick={fetchProjects}
            disabled={isLoading}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all duration-300 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          <button
            onClick={() => setIsAdding(true)}
            disabled={isAdding || editingId !== null}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-4 h-4" />
            <span>Add Project</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-start justify-between">
          <div>
            <p className="text-red-400 font-medium">Error</p>
            <p className="text-red-300 text-sm">{error}</p>
          </div>
          <button
            onClick={() => setError(null)}
            className="text-red-400 hover:text-red-300"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {(isAdding || editingId) && (
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <h2 className="text-xl font-bold text-white mb-4">
            {editingId ? 'Edit Project' : 'Add New Project'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 mb-2 text-sm font-medium">
                  Project Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-400 transition-colors duration-300"
                  placeholder="e.g., E-Commerce Platform"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2 text-sm font-medium">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-400 transition-colors duration-300"
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-gray-400 mb-2 text-sm font-medium">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                rows={3}
                className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-400 transition-colors duration-300 resize-none"
                placeholder="Brief description of the project..."
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-2 text-sm font-medium">
                Project Image * {editingId && '(Leave empty to keep current image)'}
              </label>
              <div className="space-y-3">
                <div className="flex items-center space-x-4">
                  <label className="flex-1 cursor-pointer">
                    <div className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-gray-400 hover:border-blue-400 transition-colors duration-300 flex items-center justify-center space-x-2">
                      <Upload className="w-5 h-5" />
                      <span>{imageFile ? imageFile.name : 'Choose image file'}</span>
                    </div>
                    <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
                
                {imagePreview && (
                  <div className="relative w-full h-48 bg-gray-900 rounded-lg overflow-hidden border border-gray-600">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview(null);
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
                <p className="text-gray-500 text-xs">Supported formats: JPEG, PNG, GIF, WebP (Max 5MB)</p>
              </div>
            </div>

            <div>
              <label className="block text-gray-400 mb-2 text-sm font-medium">
                Technologies (comma-separated) *
              </label>
              <input
                type="text"
                value={formData.technologies}
                onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                required
                className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-400 transition-colors duration-300"
                placeholder="React, Node.js, MongoDB, Express"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 mb-2 text-sm font-medium">
                  GitHub URL
                </label>
                <input
                  type="url"
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-400 transition-colors duration-300"
                  placeholder="https://github.com/username/repo"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2 text-sm font-medium">
                  Live Demo URL
                </label>
                <input
                  type="url"
                  value={formData.live}
                  onChange={(e) => setFormData({ ...formData, live: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-400 transition-colors duration-300"
                  placeholder="https://project-demo.com"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-4 h-4 text-blue-600 bg-gray-900 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
              />
              <label htmlFor="featured" className="ml-2 text-gray-400">
                Mark as featured project
              </label>
            </div>

            <div className="flex items-center space-x-4">
              <button
                type="submit"
                disabled={formLoading}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {formLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>{editingId ? 'Update' : 'Add'} Project</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                disabled={formLoading}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-300 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {isLoading && !formLoading && (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-3" />
          <p className="text-gray-400">Loading projects...</p>
        </div>
      )}

      {!isLoading && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-gray-800 rounded-xl border border-gray-700 hover:border-gray-600 transition-colors duration-300 overflow-hidden"
            >
              <div className="relative">
                <img
                  src={getImageUrl(project.image, project.imageContentType)}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
                  }}
                />
                <div className="absolute top-2 right-2 flex items-center space-x-2">
                  {project.featured && (
                    <div className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </div>
                  )}
                  <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    project.category === 'fullstack' ? 'bg-blue-500/20 text-blue-400' :
                    project.category === 'frontend' ? 'bg-green-500/20 text-green-400' :
                    'bg-purple-500/20 text-purple-400'
                  }`}>
                    {categories.find(c => c.value === project.category)?.label}
                  </div>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">{project.description}</p>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {(Array.isArray(project.technologies) ? project.technologies : []).slice(0, 3).map((tech, index) => (
                    <span
                      key={index}
                      className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                  {(Array.isArray(project.technologies) ? project.technologies : []).length > 3 && (
                    <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors duration-300"
                        title="View on GitHub"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                        title="View Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleFeatured(project)}
                      className={`transition-colors duration-300 ${
                        project.featured ? 'text-yellow-400' : 'text-gray-400 hover:text-yellow-400'
                      }`}
                      title={project.featured ? 'Remove from featured' : 'Mark as featured'}
                    >
                      <Star className={`w-4 h-4 ${project.featured ? 'fill-current' : ''}`} />
                    </button>
                    <button
                      onClick={() => handleEdit(project)}
                      className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
                      title="Edit project"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(project.id!)}
                      className="text-red-400 hover:text-red-300 transition-colors duration-300"
                      title="Delete project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!isLoading && projects.length === 0 && (
        <div className="text-center py-12 bg-gray-800 rounded-xl border border-gray-700">
          <div className="text-gray-500 mb-4">
            <ImageIcon className="w-16 h-16 mx-auto mb-3 opacity-50" />
          </div>
          <p className="text-gray-400 text-lg font-medium">No projects added yet</p>
          <p className="text-gray-500 text-sm mt-2">Click "Add Project" to create your first project</p>
        </div>
      )}
    </div>
  );
};

export default ProjectsManager;

