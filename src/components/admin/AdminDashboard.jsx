"use client";

import { useState, useEffect, useRef } from 'react';
import {
  Users, ImageIcon, Eye, Trash2, Plus, Edit, Check, X,
  Filter, AlertTriangle, RefreshCw, Upload, Scissors
} from 'lucide-react';

const DESIGN_CATEGORIES = [
  "Men's Formal", "Men's Casual", "Women's Formal", "Women's Casual",
  "Wedding", "Party Wear", "Kids", "General",
];

function ImageUploadField({ label, value, onChange, id }) {
  const fileRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(value || '');

  useEffect(() => { setPreview(value || ''); }, [value]);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      setPreview(data.url);
      onChange(data.url);
    } catch (err) {
      alert('Image upload failed: ' + err.message);
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  return (
    <div>
      <label className="block text-slate-700 font-semibold mb-1 text-xs">{label}</label>
      <div className="space-y-2">
        {preview && (
          <div className="relative w-full h-32 rounded-xl overflow-hidden border border-slate-200">
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => { setPreview(''); onChange(''); }}
              className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 hover:bg-black/70 cursor-pointer"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        )}
        <div className="flex gap-2">
          <input
            id={id}
            type="text"
            value={preview}
            onChange={(e) => { setPreview(e.target.value); onChange(e.target.value); }}
            placeholder="Image URL ya browse karein..."
            className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-slate-900 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          />
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="flex items-center space-x-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer disabled:bg-slate-300"
          >
            {uploading ? (
              <div className="h-3.5 w-3.5 rounded-full border-2 border-white border-r-transparent animate-spin" />
            ) : (
              <Upload className="h-3.5 w-3.5" />
            )}
            <span>{uploading ? 'Uploading...' : 'Browse'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard({ navigateTo }) {
  const [activeTab, setActiveTab] = useState('leads');

  const [leads, setLeads] = useState([]);
  const [leadsLoading, setLeadsLoading] = useState(true);
  const [leadPage, setLeadPage] = useState(1);
  const [leadTotalPages, setLeadTotalPages] = useState(1);
  const [leadStatusFilter, setLeadStatusFilter] = useState('');

  const [designs, setDesigns] = useState([]);
  const [designsLoading, setDesignsLoading] = useState(true);
  const [designModalOpen, setDesignModalOpen] = useState(false);
  const [editingDesign, setEditingDesign] = useState(null);

  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState("Men's Formal");
  const [formGarmentType, setFormGarmentType] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formFeaturedImage, setFormFeaturedImage] = useState('');
  const [formStartingPrice, setFormStartingPrice] = useState('');
  const [formTags, setFormTags] = useState('');
  const [formPublished, setFormPublished] = useState(true);

  const [apiError, setApiError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchLeads = async (page = 1, status = '') => {
    setLeadsLoading(true);
    setApiError(null);
    try {
      const statusQuery = status ? `&status=${status}` : '';
      const res = await fetch(`/api/admin/leads?page=${page}&limit=20${statusQuery}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Leads load nahi huay.');
      setLeads(data.leads || []);
      setLeadTotalPages(data.pages || 1);
      setLeadPage(page);
    } catch (err) {
      setApiError(err.message);
    } finally {
      setLeadsLoading(false);
    }
  };

  const fetchDesigns = async () => {
    setDesignsLoading(true);
    setApiError(null);
    try {
      const res = await fetch('/api/admin/designs');
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Designs load nahi huay.');
      setDesigns(data.designs || []);
    } catch (err) {
      setApiError(err.message);
    } finally {
      setDesignsLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'leads') fetchLeads(1, leadStatusFilter);
    else fetchDesigns();
  }, [activeTab, leadStatusFilter]);

  const handleLeadStatusChange = async (id, nextStatus) => {
    setApiError(null);
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: nextStatus }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Status update nahi hua.');
      setLeads((prev) => prev.map((l) => l.id === id ? { ...l, status: nextStatus } : l));
      showSuccess('Lead status update ho gaya.');
    } catch (err) {
      setApiError(err.message);
    }
  };

  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const handleOpenDesignModal = (design = null) => {
    setEditingDesign(design);
    setApiError(null);
    if (design) {
      setFormTitle(design.title || '');
      setFormCategory(design.category || "Men's Formal");
      setFormGarmentType(design.garmentType || '');
      setFormDescription(design.description || '');
      setFormFeaturedImage(design.featuredImage || '');
      setFormStartingPrice(design.startingPrice ? String(design.startingPrice) : '');
      setFormTags(design.tags ? design.tags.join(', ') : '');
      setFormPublished(design.published ?? true);
    } else {
      setFormTitle(''); setFormCategory("Men's Formal"); setFormGarmentType('');
      setFormDescription(''); setFormFeaturedImage(''); setFormStartingPrice('');
      setFormTags(''); setFormPublished(true);
    }
    setDesignModalOpen(true);
  };

  const handleDesignSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setApiError(null);
    if (!formTitle.trim()) { setApiError('Title zaroori hai.'); setIsSubmitting(false); return; }
    try {
      const tagsArray = formTags.split(',').map((t) => t.trim()).filter(Boolean);
      const payload = {
        title: formTitle,
        category: formCategory,
        garmentType: formGarmentType,
        description: formDescription,
        featuredImage: formFeaturedImage,
        startingPrice: Number(formStartingPrice) || 0,
        tags: tagsArray,
        published: formPublished,
      };
      let res;
      if (editingDesign) {
        res = await fetch('/api/admin/designs', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingDesign.id, ...payload }),
        });
      } else {
        res = await fetch('/api/admin/designs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Save nahi hua.');
      setDesignModalOpen(false);
      fetchDesigns();
      showSuccess(editingDesign ? 'Design update ho gaya.' : 'Naya design add ho gaya.');
    } catch (err) {
      setApiError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteDesign = async (id) => {
    if (!window.confirm('Ye design delete karna chahte hain? Yaqeen karen.')) return;
    setApiError(null);
    try {
      const res = await fetch('/api/admin/designs', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Delete nahi hua.');
      setDesigns((prev) => prev.filter((d) => d.id !== id));
      showSuccess('Design delete ho gaya.');
    } catch (err) {
      setApiError(err.message);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-6 mb-8">
          <div>
            <span className="text-xs font-mono font-bold tracking-wider text-emerald-600 uppercase">Admin Panel</span>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5 flex items-center space-x-2">
              <Scissors className="h-7 w-7 text-emerald-600" />
              <span>Bisma Fashion Dashboard</span>
            </h1>
          </div>
          <button
            onClick={() => activeTab === 'leads' ? fetchLeads(1, leadStatusFilter) : fetchDesigns()}
            className="p-2 border border-slate-200 text-slate-600 bg-white rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
            title="Refresh"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>

        {successMsg && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl font-medium text-xs mb-6 flex items-center space-x-2">
            <Check className="h-4 w-4" /><span>{successMsg}</span>
          </div>
        )}
        {apiError && (
          <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-xl font-medium text-xs mb-6 flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4" /><span>{apiError}</span>
          </div>
        )}

        {/* Tabs */}
        <div className="flex border-b border-slate-200 mb-8">
          <button
            id="tab-btn-leads"
            onClick={() => setActiveTab('leads')}
            className={`px-6 py-3 font-semibold text-sm border-b-2 transition-all cursor-pointer ${
              activeTab === 'leads' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <span className="flex items-center space-x-2"><Users className="h-4 w-4" /><span>Inquiries ({leads.length})</span></span>
          </button>
          <button
            id="tab-btn-designs"
            onClick={() => setActiveTab('designs')}
            className={`px-6 py-3 font-semibold text-sm border-b-2 transition-all cursor-pointer ${
              activeTab === 'designs' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <span className="flex items-center space-x-2"><ImageIcon className="h-4 w-4" /><span>Designs ({designs.length})</span></span>
          </button>
        </div>

        {/* LEADS TAB */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-150 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center space-x-2.5">
                <Filter className="h-4 w-4 text-slate-400" />
                <span className="text-xs font-semibold text-slate-700">Status Filter:</span>
                <div className="flex gap-1.5 flex-wrap">
                  {['', 'new', 'contacted', 'in-progress', 'completed', 'cancelled'].map((st) => (
                    <button
                      key={st}
                      id={`status-filter-${st || 'all'}`}
                      onClick={() => setLeadStatusFilter(st)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                        leadStatusFilter === st ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {st === '' ? 'All' : st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {leadsLoading ? (
              <div className="text-center py-20 bg-white border border-slate-150 rounded-2xl">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-r-transparent" />
                <p className="text-slate-500 text-xs mt-3">Inquiries load ho rahi hain...</p>
              </div>
            ) : leads.length === 0 ? (
              <div className="text-center py-20 bg-white border border-slate-200 rounded-2xl">
                <Users className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                <p className="font-bold text-slate-900">Abhi koi inquiry nahi hai.</p>
                <p className="text-xs text-slate-500 mt-1">Calculator ya order form submit hone par yahan dikhai dega.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {leads.map((lead) => {
                  const date = new Date(lead.createdAt).toLocaleDateString('en-PK', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
                  return (
                    <div
                      key={lead.id}
                      className="bg-white border border-slate-150 hover:border-slate-300 transition-colors rounded-2xl p-6 shadow-sm flex flex-col md:flex-row gap-6 justify-between items-start md:items-center"
                    >
                      <div className="space-y-1 md:max-w-xs">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-slate-950 text-base">{lead.name}</span>
                          <span className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded uppercase ${
                            lead.source === 'calculator' ? 'bg-emerald-50 border border-emerald-200 text-emerald-700' : 'bg-indigo-50 border border-indigo-200 text-indigo-700'
                          }`}>{lead.source}</span>
                        </div>
                        <a href={`mailto:${lead.email}`} className="text-xs text-slate-600 hover:text-emerald-500 font-medium block">{lead.email}</a>
                        {lead.phone && <span className="text-xs text-slate-500 font-mono block">{lead.phone}</span>}
                        {lead.whatsapp && (
                          <a href={`https://wa.me/${lead.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer"
                            className="text-xs text-green-600 font-medium block hover:text-green-700">
                            WhatsApp: {lead.whatsapp}
                          </a>
                        )}
                        <span className="text-[10px] text-slate-400 block pt-1 font-mono">{date}</span>
                      </div>

                      <div className="bg-slate-50 rounded-xl p-3.5 space-y-2 flex-grow max-w-lg w-full">
                        <div className="flex justify-between items-start text-xs">
                          <div>
                            <span className="font-bold text-slate-900 block">{lead.garmentType || '—'}</span>
                            <span className="text-slate-500">{lead.fabricQuality || ''} {lead.gender ? `• ${lead.gender}` : ''}</span>
                          </div>
                          {lead.estimatedPrice && (
                            <span className="font-mono text-emerald-600 font-bold text-xs shrink-0 ml-2">{lead.estimatedPrice}</span>
                          )}
                        </div>
                        {lead.customizations?.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {lead.customizations.map((c) => (
                              <span key={c} className="bg-white border border-slate-200 rounded px-1.5 py-0.5 text-[10px] text-slate-600 font-medium">{c}</span>
                            ))}
                          </div>
                        )}
                        {lead.deliveryPreference && (
                          <div className="text-[11px] text-slate-500">Delivery: <strong className="text-slate-800">{lead.deliveryPreference}</strong></div>
                        )}
                        {lead.notes && (
                          <div className="text-[11px] text-slate-500 border-t border-slate-100 pt-2 italic line-clamp-2">"{lead.notes}"</div>
                        )}
                        {lead.contactPreference && (
                          <div className="text-[10px] text-slate-400">Contact via: {lead.contactPreference}</div>
                        )}
                      </div>

                      <div className="shrink-0 space-y-1.5">
                        <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Status</span>
                        <select
                          value={lead.status}
                          onChange={(e) => handleLeadStatusChange(lead.id, e.target.value)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold focus:outline-none border cursor-pointer ${
                            lead.status === 'new' ? 'bg-amber-50 border-amber-200 text-amber-700'
                            : lead.status === 'contacted' ? 'bg-blue-50 border-blue-200 text-blue-700'
                            : lead.status === 'in-progress' ? 'bg-purple-50 border-purple-200 text-purple-700'
                            : lead.status === 'completed' ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                            : 'bg-slate-100 border-slate-300 text-slate-500'
                          }`}
                        >
                          <option value="new">● New</option>
                          <option value="contacted">● Contacted</option>
                          <option value="in-progress">● In Progress</option>
                          <option value="completed">✓ Completed</option>
                          <option value="cancelled">✕ Cancelled</option>
                        </select>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {!leadsLoading && leadTotalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 pt-4">
                {Array.from({ length: leadTotalPages }).map((_, idx) => {
                  const p = idx + 1;
                  return (
                    <button key={p} onClick={() => fetchLeads(p, leadStatusFilter)}
                      className={`h-8 w-8 flex items-center justify-center rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                        leadPage === p ? 'bg-emerald-500 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >{p}</button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* DESIGNS TAB */}
        {activeTab === 'designs' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-white border border-slate-150 rounded-2xl p-4 shadow-sm">
              <span className="text-xs text-slate-500">Trending designs add karein — customer website par dekhenge.</span>
              <button
                id="admin-create-design-btn"
                onClick={() => handleOpenDesignModal(null)}
                className="px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700 text-xs font-bold rounded-xl flex items-center space-x-1 transition-colors cursor-pointer"
              >
                <Plus className="h-4 w-4" /><span>Naya Design</span>
              </button>
            </div>

            {designsLoading ? (
              <div className="text-center py-20 bg-white border border-slate-150 rounded-2xl">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-r-transparent" />
                <p className="text-slate-500 text-xs mt-3">Designs load ho rahi hain...</p>
              </div>
            ) : designs.length === 0 ? (
              <div className="text-center py-20 bg-white border border-slate-200 rounded-2xl">
                <ImageIcon className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                <p className="font-bold text-slate-900">Abhi koi design nahi hai.</p>
                <p className="text-xs text-slate-500 mt-1">Upar "Naya Design" button se add karein.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {designs.map((design) => (
                  <div key={design.id} className="bg-white rounded-2xl border border-slate-150 overflow-hidden shadow-sm hover:shadow-md transition-all">
                    <div className="aspect-[4/3] bg-slate-100 overflow-hidden">
                      {design.featuredImage ? (
                        <img src={design.featuredImage} alt={design.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Scissors className="h-12 w-12 text-slate-300" />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          design.published ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'
                        }`}>{design.published ? 'Published' : 'Draft'}</span>
                        {design.startingPrice > 0 && (
                          <span className="text-xs font-bold text-emerald-600">Rs. {design.startingPrice.toLocaleString()}</span>
                        )}
                      </div>
                      <h3 className="font-bold text-slate-900 text-sm line-clamp-1 mb-1">{design.title}</h3>
                      <p className="text-xs text-slate-500 mb-1">{design.category}</p>
                      <div className="flex items-center space-x-1 text-xs text-slate-400 mb-3">
                        <Eye className="h-3 w-3" /><span>{design.views} views</span>
                      </div>
                      <div className="flex space-x-2">
                        <button onClick={() => handleOpenDesignModal(design)}
                          className="flex-1 flex items-center justify-center space-x-1 py-1.5 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 text-xs font-medium cursor-pointer">
                          <Edit className="h-3.5 w-3.5" /><span>Edit</span>
                        </button>
                        <button onClick={() => handleDeleteDesign(design.id)}
                          className="flex items-center justify-center p-1.5 border border-slate-200 text-rose-500 rounded-lg hover:bg-rose-50 cursor-pointer">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* DESIGN MODAL */}
        {designModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-2xl w-full border border-slate-200">
              <div className="bg-emerald-800 text-white px-6 py-4 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base">{editingDesign ? 'Design Edit Karein' : 'Naya Design Add Karein'}</h3>
                  <span className="text-[10px] font-mono text-emerald-300 block mt-0.5">Bisma Fashion Admin</span>
                </div>
                <button onClick={() => setDesignModalOpen(false)} className="p-1 text-emerald-200 hover:text-white cursor-pointer">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleDesignSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
                {apiError && (
                  <div className="bg-rose-50 border border-rose-200 text-rose-800 p-3 rounded-xl font-medium">{apiError}</div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-slate-700 font-semibold mb-1">Title *</label>
                    <input type="text" required value={formTitle} onChange={(e) => setFormTitle(e.target.value)}
                      placeholder="e.g. Blue Embroidered Shalwar Kameez"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Category</label>
                    <select value={formCategory} onChange={(e) => setFormCategory(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500">
                      {DESIGN_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Garment Type</label>
                    <input type="text" value={formGarmentType} onChange={(e) => setFormGarmentType(e.target.value)}
                      placeholder="e.g. shalwar-kameez-mens"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-slate-700 font-semibold mb-1">Description</label>
                    <textarea rows={3} value={formDescription} onChange={(e) => setFormDescription(e.target.value)}
                      placeholder="Is design ke baare mein likhein..."
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Starting Price (PKR)</label>
                    <input type="number" value={formStartingPrice} onChange={(e) => setFormStartingPrice(e.target.value)}
                      placeholder="e.g. 4500"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Tags (comma separated)</label>
                    <input type="text" value={formTags} onChange={(e) => setFormTags(e.target.value)}
                      placeholder="formal, blue, embroidery"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <ImageUploadField
                      label="Featured Image (Browse ya URL paste karein)"
                      value={formFeaturedImage}
                      onChange={setFormFeaturedImage}
                      id="form-featured-img"
                    />
                  </div>
                  <div className="sm:col-span-2 flex items-center space-x-2 pt-1">
                    <input id="form-published" type="checkbox" checked={formPublished} onChange={(e) => setFormPublished(e.target.checked)}
                      className="h-4 w-4 rounded text-emerald-500 border-slate-300"
                    />
                    <label htmlFor="form-published" className="font-semibold text-slate-800">
                      Website par publish karein (uncheck = Draft)
                    </label>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-100 flex justify-end space-x-2">
                  <button type="button" onClick={() => setDesignModalOpen(false)}
                    className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 cursor-pointer">
                    Cancel
                  </button>
                  <button type="submit" disabled={isSubmitting}
                    className="px-5 py-2 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 cursor-pointer disabled:bg-slate-300 transition-colors">
                    {isSubmitting ? 'Saving...' : (editingDesign ? 'Update Karein' : 'Add Karein')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
