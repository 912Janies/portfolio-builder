import React, { useState, useEffect } from 'react';
     import { BrowserRouter as Router, Routes, Route, NavLink, useNavigate } from 'react-router-dom';
     import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
     import axios from 'axios';
     import { v4 as uuidv4 } from 'uuid';
     import Preview from './components/Preview';
     import SavedPortfolios from './components/SavedPortfolios';

     axios.defaults.baseURL = 'http://localhost:5001';

     const Builder = ({ sections, setSections, newSectionTitle, setNewSectionTitle, editingSection, setEditingSection, onSave }) => {
       const navigate = useNavigate();

       const onDragEnd = (result) => {
         if (!result.destination) return;
         const reorderedSections = [...sections];
         const [moved] = reorderedSections.splice(result.source.index, 1);
         reorderedSections.splice(result.destination.index, 0, moved);
         setSections(reorderedSections);
       };

       const addSection = (e) => {
         e.preventDefault();
         if (!newSectionTitle.trim()) return;
         setSections([
           ...sections,
           { id: uuidv4(), title: newSectionTitle, content: '', githubUrl: '', mediaUrl: '' },
         ]);
         setNewSectionTitle('');
       };

       const deleteSection = (id) => {
         setSections(sections.filter((section) => section.id !== id));
       };

       const startEditing = (section) => {
         setEditingSection({ ...section });
       };

       const saveEdit = (e) => {
         e.preventDefault();
         setSections(
           sections.map((section) =>
             section.id === editingSection.id ? editingSection : section
           )
         );
         setEditingSection(null);
       };

       return (
         <>
           <main className="w-full max-w-[90rem] mx-auto py-12 px-6 sm:px-8 lg:px-12 animate-fade-in">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
               {/* Left Column: Builder */}
               <div className="space-y-6">
                 <h2 className="text-3xl font-extrabold text-white drop-shadow-lg animate-slide-up">
                   Portfolio Builder
                 </h2>
                 <form onSubmit={addSection} className="flex flex-col sm:flex-row gap-4 animate-slide-up">
                   <input
                     type="text"
                     value={newSectionTitle}
                     onChange={(e) => setNewSectionTitle(e.target.value)}
                     placeholder="Enter section title (e.g., Education)"
                     className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm bg-white/80 backdrop-blur-sm text-gray-800"
                   />
                   <button
                     type="submit"
                     className="px-6 py-3 bg-teal-500 text-white rounded-lg font-medium hover:bg-teal-600 transition-colors shadow-glow hover:scale-105 transform"
                   >
                     Add Section
                   </button>
                 </form>
                 <DragDropContext onDragEnd={onDragEnd}>
                   <Droppable droppableId="sections">
                     {(provided) => (
                       <div
                         {...provided.droppableProps}
                         ref={provided.innerRef}
                         className="space-y-4"
                       >
                         {sections.map((section, index) => (
                           <div
                             key={section.id}
                             className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100/50 animate-slide-up"
                           >
                             <span className="text-gray-800 font-medium">{section.title}</span>
                             <div className="flex gap-2">
                               <button
                                 onClick={() => startEditing(section)}
                                 className="text-teal-500 hover:text-teal-600 font-medium"
                               >
                                 Edit
                               </button>
                               <button
                                 onClick={() => deleteSection(section.id)}
                                 className="text-red-500 hover:text-red-600 font-medium"
                               >
                                 Delete
                               </button>
                             </div>
                           </div>
                         ))}
                         {provided.placeholder}
                       </div>
                     )}
                   </Droppable>
                 </DragDropContext>
                 <button
                   onClick={() => {
                     onSave();
                     navigate('/saved-portfolios');
                   }}
                   className="w-full sm:w-auto px-6 py-3 bg-teal-500 text-white rounded-lg font-medium hover:bg-teal-600 transition-colors shadow-glow hover:scale-105 transform animate-slide-up"
                 >
                   Save Portfolio
                 </button>
               </div>

               {/* Right Column: Live Preview */}
               <div className="space-y-6">
                 <h2 className="text-3xl font-extrabold text-white drop-shadow-lg animate-slide-up">
                   Live Preview
                 </h2>
                 <Preview sections={sections} />
               </div>
             </div>
           </main>

           {/* Edit Modal */}
           {editingSection && (
             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 animate-fade-in">
               <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 max-w-lg w-full shadow-2xl">
                 <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Section</h2>
                 <form onSubmit={saveEdit} className="space-y-4">
                   <div>
                     <label className="block text-gray-700 font-medium mb-1">Title</label>
                     <input
                       type="text"
                       value={editingSection.title}
                       onChange={(e) => setEditingSection({ ...editingSection, title: e.target.value })}
                       className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
                       required
                     />
                   </div>
                   <div>
                     <label className="block text-gray-700 font-medium mb-1">Content (Markdown)</label>
                     <textarea
                       value={editingSection.content}
                       onChange={(e) => setEditingSection({ ...editingSection, content: e.target.value })}
                       className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
                       rows="5"
                       placeholder="Enter content (e.g., *Bold text* or [Link](url))"
                     />
                   </div>
                   <div>
                     <label className="block text-gray-700 font-medium mb-1">GitHub URL</label>
                     <input
                       type="url"
                       value={editingSection.githubUrl}
                       onChange={(e) => setEditingSection({ ...editingSection, githubUrl: e.target.value })}
                       className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
                       placeholder="https://github.com/username/repo"
                     />
                   </div>
                   <div>
                     <label className="block text-gray-700 font-medium mb-1">Media URL (Image/Video)</label>
                     <input
                       type="url"
                       value={editingSection.mediaUrl}
                       onChange={(e) => setEditingSection({ ...editingSection, mediaUrl: e.target.value })}
                       className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
                       placeholder="https://example.com/image.jpg or video.mp4"
                     />
                   </div>
                   <div className="flex gap-4">
                     <button
                       type="submit"
                       className="flex-1 px-6 py-3 bg-teal-500 text-white rounded-lg font-medium hover:bg-teal-600 transition-colors shadow-glow hover:scale-105 transform"
                     >
                       Save
                     </button>
                     <button
                       type="button"
                       onClick={() => setEditingSection(null)}
                       className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors hover:scale-105 transform"
                     >
                       Cancel
                     </button>
                   </div>
                 </form>
               </div>
             </div>
           )}
         </>
       );
     };

     const App = () => {
       const [sections, setSections] = useState([
         { id: uuidv4(), title: 'About Me', content: 'Write about yourself here.', githubUrl: '', mediaUrl: '' },
         { id: uuidv4(), title: 'Projects', content: 'Describe your projects.', githubUrl: 'https://github.com', mediaUrl: '' },
       ]);
       const [newSectionTitle, setNewSectionTitle] = useState('');
       const [editingSection, setEditingSection] = useState(null);
       const [savedPortfolios, setSavedPortfolios] = useState([]);
       const [selectedPortfolio, setSelectedPortfolio] = useState(null);
       const [contactInfo, setContactInfo] = useState(() => {
         const saved = localStorage.getItem('contactInfo');
         return saved ? JSON.parse(saved) : { email: 'your-email@example.com', linkedin: 'https://linkedin.com/in/your-profile' };
       });
       const [isEditingContact, setIsEditingContact] = useState(false);

       useEffect(() => {
         const fetchPortfolios = async () => {
           try {
             const response = await axios.get('/api/portfolios');
             setSavedPortfolios(response.data);
           } catch (err) {
             console.error('Fetch portfolios error:', err.response || err.message);
             alert('Failed to fetch portfolios');
           }
         };
         fetchPortfolios();
       }, []);

       useEffect(() => {
         localStorage.setItem('contactInfo', JSON.stringify(contactInfo));
       }, [contactInfo]);

       const savePortfolio = async () => {
         try {
           const portfolioData = {
             userId: 'test-user',
             title: selectedPortfolio?.title || 'My Portfolio',
             sections,
           };
           const response = selectedPortfolio
             ? await axios.put(`/api/portfolios/${selectedPortfolio._id}`, portfolioData)
             : await axios.post('/api/portfolios', portfolioData);
           const savedPortfolio = response.data;
           setSavedPortfolios((prev) =>
             selectedPortfolio
               ? prev.map((p) => (p._id === savedPortfolio._id ? savedPortfolio : p))
               : [...prev, savedPortfolio]
           );
           setSelectedPortfolio(savedPortfolio);
           alert('Portfolio saved!');
         } catch (err) {
           console.error('Save error:', err.response || err.message);
           alert('Failed to save portfolio');
         }
       };

       const loadPortfolio = (portfolio) => {
         setSections(portfolio.sections);
         setSelectedPortfolio(portfolio);
       };

       const deletePortfolio = async (portfolioId) => {
         try {
           await axios.delete(`/api/portfolios/${portfolioId}`);
           setSavedPortfolios((prev) => prev.filter((p) => p._id !== portfolioId));
           if (selectedPortfolio?._id === portfolioId) {
             setSelectedPortfolio(null);
             setSections([
               { id: uuidv4(), title: 'About Me', content: 'Write about yourself here.', githubUrl: '', mediaUrl: '' },
               { id: uuidv4(), title: 'Projects', content: 'Describe your projects.', githubUrl: 'https://github.com', mediaUrl: '' },
             ]);
           }
           alert('Portfolio deleted!');
         } catch (err) {
           console.error('Delete error:', err.response || err.message);
           alert('Failed to delete portfolio');
         }
       };

       const handleContactChange = (e) => {
         setContactInfo({ ...contactInfo, [e.target.name]: e.target.value });
       };

       const saveContactInfo = (e) => {
         e.preventDefault();
         setIsEditingContact(false);
       };

       return (
         <Router>
           <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-purple-900 to-indigo-900 text-white star-bg">
             {/* Header */}
             <header className="w-full bg-purple-800/80 backdrop-blur-sm shadow-lg animate-slide-down">
               <div className="w-full max-w-[90rem] mx-auto py-12 px-6 sm:px-8 lg:px-12 text-center">
                 <h1 className="text-5xl font-extrabold mb-4 tracking-tight drop-shadow-lg animate-scale-in">
                   Portfolio Builder
                 </h1>
                 <p className="text-xl opacity-90 max-w-2xl mx-auto drop-shadow-md animate-fade-in">
                   Create a stunning portfolio to showcase your work.
                 </p>
               </div>
               <nav className="w-full max-w-[90rem] mx-auto px-6 sm:px-8 lg:px-12">
                 <ul className="flex justify-center gap-8 border-t border-indigo-800 pt-4">
                   <li>
                     <NavLink
                       to="/"
                       className={({ isActive }) =>
                         `text-lg font-medium pb-2 ${isActive ? 'text-teal-400 border-b-2 border-teal-400' : 'text-gray-200 hover:text-teal-400'}`
                       }
                     >
                       Builder
                     </NavLink>
                   </li>
                   <li>
                     <NavLink
                       to="/saved-portfolios"
                       className={({ isActive }) =>
                         `text-lg font-medium pb-2 ${isActive ? 'text-teal-400 border-b-2 border-teal-400' : 'text-gray-200 hover:text-teal-400'}`
                       }
                     >
                       Saved Portfolios
                     </NavLink>
                   </li>
                 </ul>
               </nav>
             </header>

             {/* Routes */}
             <Routes>
               <Route
                 path="/"
                 element={
                   <Builder
                     sections={sections}
                     setSections={setSections}
                     newSectionTitle={newSectionTitle}
                     setNewSectionTitle={setNewSectionTitle}
                     editingSection={editingSection}
                     setEditingSection={setEditingSection}
                     onSave={savePortfolio}
                   />
                 }
               />
               <Route
                 path="/saved-portfolios"
                 element={
                   <SavedPortfolios
                     portfolios={savedPortfolios}
                     onLoad={loadPortfolio}
                     onDelete={deletePortfolio}
                   />
                 }
               />
             </Routes>

             {/* Footer */}
             <footer className="w-full bg-purple-800/80 backdrop-blur-sm text-white py-8 animate-slide-up">
               <div className="w-full max-w-[90rem] mx-auto px-6 sm:px-8 lg:px-12 text-center">
                 <p className="text-lg font-medium mb-2 drop-shadow-md">Contact Me</p>
                 {isEditingContact ? (
                   <form
                     onSubmit={saveContactInfo}
                     className="space-y-4 max-w-md mx-auto animate-fade-in"
                   >
                     <div>
                       <label className="block text-sm font-medium mb-1 drop-shadow-sm">Email</label>
                       <input
                         type="email"
                         name="email"
                         value={contactInfo.email}
                         onChange={handleContactChange}
                         className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 bg-white/80 backdrop-blur-sm"
                         required
                       />
                     </div>
                     <div>
                       <label className="block text-sm font-medium mb-1 drop-shadow-sm">LinkedIn</label>
                       <input
                         type="url"
                         name="linkedin"
                         value={contactInfo.linkedin}
                         onChange={handleContactChange}
                         className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 bg-white/80 backdrop-blur-sm"
                         required
                       />
                     </div>
                     <div className="flex gap-4">
                       <button
                         type="submit"
                         className="flex-1 px-4 py-2 bg-teal-500 text-white rounded-lg font-medium hover:bg-teal-600 transition-colors shadow-glow hover:scale-105 transform"
                       >
                         Save
                       </button>
                       <button
                         type="button"
                         onClick={() => setIsEditingContact(false)}
                         className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors hover:scale-105 transform"
                       >
                         Cancel
                       </button>
                     </div>
                   </form>
                 ) : (
                   <div className="animate-fade-in">
                     <p className="text-sm opacity-90 mb-2 drop-shadow-sm">
                       Email:{' '}
                       <a href={`mailto:${contactInfo.email}`} className="underline hover:text-teal-400">
                         {contactInfo.email}
                       </a>{' '}
                       | LinkedIn:{' '}
                       <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" className="underline hover:text-teal-400">
                         {contactInfo.linkedin}
                       </a>
                     </p>
                     <button
                       onClick={() => setIsEditingContact(true)}
                       className="text-sm text-teal-400 hover:text-teal-300 underline"
                     >
                       Edit Contact Info
                     </button>
                   </div>
                 )}
               </div>
             </footer>
           </div>
         </Router>
       );
     };

     export default App;