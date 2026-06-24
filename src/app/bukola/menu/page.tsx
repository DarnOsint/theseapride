"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";
import { Plus, Edit3, Trash2, ChevronDown, ChevronRight, Upload, X, GripVertical } from "lucide-react";
import { useRouter } from "next/navigation";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

interface MenuCategory {
  id: number;
  name: string;
  icon: string;
  note: string;
  image: string;
  sort_order: number;
  items: MenuItem[];
}

interface MenuItem {
  id: number;
  category_id: number;
  name: string;
  price: number;
  description: string;
  includes: string[];
  serves: string;
  image: string;
  sort_order: number;
}

export default function MenuEditorPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<Set<number>>(new Set());
  const [editingCat, setEditingCat] = useState<MenuCategory | null>(null);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [showCatForm, setShowCatForm] = useState(false);
  const [showItemForm, setShowItemForm] = useState(false);
  const [selectedCatId, setSelectedCatId] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const sb = createClient(supabaseUrl, supabaseAnonKey);

  const fetchData = useCallback(async () => {
    const { data: cats } = await sb.from("menu_categories").select("*").order("sort_order").order("id");
    const { data: items } = await sb.from("menu_items").select("*").order("sort_order").order("id");

    if (cats) {
      const grouped = cats.map((cat: any) => ({
        ...cat,
        items: (items || []).filter((i: any) => i.category_id === cat.id) as MenuItem[],
      }));
      setCategories(grouped);
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const toggleCategory = (id: number) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  async function uploadImage(file: File): Promise<string> {
    setUploading(true);
    const ext = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { data, error } = await sb.storage.from("admin-images").upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });
    if (error) throw error;
    const { data: urlData } = sb.storage.from("admin-images").getPublicUrl(fileName);
    setUploading(false);
    return urlData.publicUrl;
  }

  async function saveCategory(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data: any = {
      name: formData.get("name"),
      icon: formData.get("icon"),
      note: formData.get("note") || "",
      image: formData.get("image_url") as string || editingCat?.image || "",
    };

    try {
      const imageFile = formData.get("image") as File;
      if (imageFile?.size > 0) {
        data.image = await uploadImage(imageFile);
      }

      if (editingCat) {
        await sb.from("menu_categories").update(data).eq("id", editingCat.id);
      } else {
        data.sort_order = categories.length;
        await sb.from("menu_categories").insert(data);
      }
      setShowCatForm(false);
      setEditingCat(null);
      fetchData();
      setMessage(editingCat ? "Category updated!" : "Category created!");
      setTimeout(() => setMessage(""), 3000);
    } catch (err: any) {
      setMessage("Error: " + err.message);
    }
    setSaving(false);
  }

  async function saveItem(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const includesRaw = (formData.get("includes") as string) || "";
    const data: any = {
      category_id: parseInt(formData.get("category_id") as string),
      name: formData.get("name"),
      price: parseInt(formData.get("price") as string) || 0,
      description: formData.get("description") || "",
      includes: includesRaw.split(",").map((s: string) => s.trim()).filter(Boolean),
      serves: formData.get("serves") || "",
      image: formData.get("image_url") as string || editingItem?.image || "",
    };

    try {
      const imageFile = formData.get("image") as File;
      if (imageFile?.size > 0) {
        data.image = await uploadImage(imageFile);
      }

      if (editingItem) {
        await sb.from("menu_items").update(data).eq("id", editingItem.id);
      } else {
        data.sort_order = categories.find(c => c.id === data.category_id)?.items.length || 0;
        await sb.from("menu_items").insert(data);
      }
      setShowItemForm(false);
      setEditingItem(null);
      fetchData();
      setMessage(editingItem ? "Item updated!" : "Item created!");
      setTimeout(() => setMessage(""), 3000);
    } catch (err: any) {
      setMessage("Error: " + err.message);
    }
    setSaving(false);
  }

  async function deleteCategory(id: number) {
    if (!confirm("Delete this category and all its items?")) return;
    await sb.from("menu_categories").delete().eq("id", id);
    fetchData();
    setMessage("Category deleted");
    setTimeout(() => setMessage(""), 3000);
  }

  async function deleteItem(id: number) {
    if (!confirm("Delete this item?")) return;
    await sb.from("menu_items").delete().eq("id", id);
    fetchData();
    setMessage("Item deleted");
    setTimeout(() => setMessage(""), 3000);
  }

  function openEditCat(cat: MenuCategory) {
    setEditingCat(cat);
    setShowCatForm(true);
    setShowItemForm(false);
  }

  function openNewCat() {
    setEditingCat(null);
    setShowCatForm(true);
    setShowItemForm(false);
  }

  function openEditItem(item: MenuItem) {
    setEditingItem(item);
    setSelectedCatId(item.category_id);
    setShowItemForm(true);
    setShowCatForm(false);
  }

  function openNewItem(catId: number) {
    setEditingItem(null);
    setSelectedCatId(catId);
    setShowItemForm(true);
    setShowCatForm(false);
  }

  if (loading) return <div className="text-center py-20 text-gray-500">Loading menu...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-800">Menu Editor</h1>
          <p className="text-sm text-gray-500 mt-1">Manage categories and menu items</p>
        </div>
        <button onClick={openNewCat} className="flex items-center gap-2 bg-sea-500 hover:bg-sea-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all hover:shadow-lg">
          <Plus className="w-4 h-4" /> New Category
        </button>
      </div>

      {message && (
        <div className="mb-6 bg-sea-50 border border-sea-200 text-sea-700 px-5 py-3 rounded-xl text-sm">{message}</div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-4">
          {categories.length === 0 && (
            <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center text-gray-400">
              No categories yet. Click "New Category" to begin.
            </div>
          )}
          {categories.map((cat) => (
            <div key={cat.id} className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="flex items-center gap-3 px-5 py-4 cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => toggleCategory(cat.id)}>
                <button className="text-gray-400 hover:text-gray-600">
                  {expanded.has(cat.id) ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
                <span className="text-xl">{cat.icon}</span>
                <div className="flex-1">
                  <span className="font-semibold text-gray-800">{cat.name}</span>
                  {cat.note && <span className="text-xs text-gray-400 ml-2">({cat.note})</span>}
                  <span className="text-xs text-gray-400 ml-3">{cat.items.length} items</span>
                </div>
                <div className="flex gap-1">
                  <button onClick={(e) => { e.stopPropagation(); openEditCat(cat); }} className="p-2 hover:bg-sea-50 rounded-lg text-sea-500 hover:text-sea-700 transition-colors">
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); deleteCategory(cat.id); }} className="p-2 hover:bg-red-50 rounded-lg text-red-400 hover:text-red-600 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {expanded.has(cat.id) && (
                <div className="border-t border-gray-100">
                  {cat.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 border-b border-gray-50 last:border-0">
                      {item.image && <img src={item.image} alt="" className="w-10 h-10 rounded-lg object-cover" />}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">{item.name}</p>
                        <p className="text-xs text-gray-400">₦{item.price.toLocaleString()}{item.serves ? ` • ${item.serves}` : ""}</p>
                      </div>
                      <div className="flex gap-1">
                        <button onClick={() => openEditItem(item)} className="p-1.5 hover:bg-sea-50 rounded-lg text-sea-500 hover:text-sea-700 transition-colors">
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => deleteItem(item.id)} className="p-1.5 hover:bg-red-50 rounded-lg text-red-400 hover:text-red-600 transition-colors">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                  <button onClick={() => openNewItem(cat.id)} className="flex items-center gap-2 px-5 py-3 text-sm text-sea-500 hover:text-sea-700 hover:bg-sea-50 w-full transition-colors">
                    <Plus className="w-3.5 h-3.5" /> Add Item to {cat.name}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="space-y-6">
          {showCatForm && (
            <FormCard title={editingCat ? "Edit Category" : "New Category"} onClose={() => { setShowCatForm(false); setEditingCat(null); }}>
              <form onSubmit={saveCategory} className="space-y-4">
                <input type="hidden" name="image_url" value={editingCat?.image || ""} />
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Name</label>
                  <input name="name" defaultValue={editingCat?.name || ""} required className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-sea-500 focus:ring-2 focus:ring-sea-100 outline-none text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Icon (emoji)</label>
                  <input name="icon" defaultValue={editingCat?.icon || ""} required className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-sea-500 focus:ring-2 focus:ring-sea-100 outline-none text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Note (optional)</label>
                  <input name="note" defaultValue={editingCat?.note || ""} className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-sea-500 focus:ring-2 focus:ring-sea-100 outline-none text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Current Image URL</label>
                  <input name="image_url" defaultValue={editingCat?.image || ""} className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-sea-500 focus:ring-2 focus:ring-sea-100 outline-none text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Upload New Image</label>
                  <input type="file" name="image" accept="image/*" className="w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-sea-50 file:text-sea-700 file:text-sm file:font-medium hover:file:bg-sea-100" />
                  {uploading && <p className="text-xs text-sea-500 mt-1">Uploading...</p>}
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="submit" disabled={saving || uploading} className="flex-1 bg-sea-500 hover:bg-sea-600 disabled:bg-sea-300 text-white py-2.5 rounded-xl font-semibold text-sm transition-all">
                    {saving ? "Saving..." : editingCat ? "Update" : "Create"}
                  </button>
                  <button type="button" onClick={() => { setShowCatForm(false); setEditingCat(null); }} className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm transition-all">
                    Cancel
                  </button>
                </div>
              </form>
            </FormCard>
          )}

          {showItemForm && (
            <FormCard title={editingItem ? "Edit Item" : "New Item"} onClose={() => { setShowItemForm(false); setEditingItem(null); }}>
              <form onSubmit={saveItem} className="space-y-3">
                <input type="hidden" name="image_url" value={editingItem?.image || ""} />
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Category</label>
                  <select name="category_id" defaultValue={selectedCatId || editingItem?.category_id || ""} required className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-sea-500 focus:ring-2 focus:ring-sea-100 outline-none text-sm bg-white">
                    {categories.map((c) => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Name</label>
                  <input name="name" defaultValue={editingItem?.name || ""} required className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-sea-500 focus:ring-2 focus:ring-sea-100 outline-none text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Price (₦)</label>
                  <input type="number" name="price" defaultValue={editingItem?.price || ""} required className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-sea-500 focus:ring-2 focus:ring-sea-100 outline-none text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Description (optional)</label>
                  <input name="description" defaultValue={editingItem?.description || ""} className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-sea-500 focus:ring-2 focus:ring-sea-100 outline-none text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Includes (comma separated)</label>
                  <input name="includes" defaultValue={(editingItem?.includes || []).join(", ")} className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-sea-500 focus:ring-2 focus:ring-sea-100 outline-none text-sm" placeholder="Sausage, Bacon, Egg" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Serves (optional)</label>
                  <input name="serves" defaultValue={editingItem?.serves || ""} className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-sea-500 focus:ring-2 focus:ring-sea-100 outline-none text-sm" placeholder="3–4 People" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Current Image URL</label>
                  <input name="image_url" defaultValue={editingItem?.image || ""} className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-sea-500 focus:ring-2 focus:ring-sea-100 outline-none text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Upload New Image</label>
                  <input type="file" name="image" accept="image/*" className="w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-sea-50 file:text-sea-700 file:text-sm file:font-medium hover:file:bg-sea-100" />
                  {uploading && <p className="text-xs text-sea-500 mt-1">Uploading...</p>}
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="submit" disabled={saving || uploading} className="flex-1 bg-sea-500 hover:bg-sea-600 disabled:bg-sea-300 text-white py-2.5 rounded-xl font-semibold text-sm transition-all">
                    {saving ? "Saving..." : editingItem ? "Update" : "Create"}
                  </button>
                  <button type="button" onClick={() => { setShowItemForm(false); setEditingItem(null); }} className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm transition-all">
                    Cancel
                  </button>
                </div>
              </form>
            </FormCard>
          )}
        </div>
      </div>
    </div>
  );
}

function FormCard({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden sticky top-24">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg text-gray-400 transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}
