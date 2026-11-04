'use client';
import React, { useState } from 'react';
import { 
  Shield, 
  Building2, 
  CreditCard, 
  Activity, 
  CheckCircle, 
  AlertTriangle, 
  Settings2, 
  Users, 
  Plus, 
  X,
  Lock,
  Layers,
  Database
} from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

interface TenantItem {
  id: string;
  name: string;
  region: string;
  plan: 'Starter' | 'Business' | 'Professional';
  status: 'ACTIVE' | 'TRIAL' | 'SUSPENDED';
  unitsUsed: number;
  maxUnits: number;
  projectsUsed: number;
  maxProjects: number;
  usersUsed: number;
  maxUsers: number;
  expiry: string;
}

export default function SuperAdminPage() {
  const { showToast } = useToast();

  const [tenants, setTenants] = useState<TenantItem[]>([
    {
      id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
      name: 'Garut Sejahtera Property',
      region: 'Kabupaten Garut',
      plan: 'Business',
      status: 'ACTIVE',
      unitsUsed: 75,
      maxUnits: 250,
      projectsUsed: 3,
      maxProjects: 5,
      usersUsed: 6,
      maxUsers: 15,
      expiry: '31 Des 2026'
    },
    {
      id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
      name: 'Bandung Raya Land',
      region: 'Kota Bandung',
      plan: 'Professional',
      status: 'ACTIVE',
      unitsUsed: 420,
      maxUnits: 1000,
      projectsUsed: 8,
      maxProjects: 15,
      usersUsed: 22,
      maxUsers: 40,
      expiry: '15 Jan 2027'
    },
    {
      id: 'cccccccc-cccc-cccc-cccc-cccccccccccc',
      name: 'Priangan Asri Propertindo',
      region: 'Kabupaten Tasikmalaya',
      plan: 'Starter',
      status: 'TRIAL',
      unitsUsed: 45,
      maxUnits: 60,
      projectsUsed: 1,
      maxProjects: 2,
      usersUsed: 3,
      maxUsers: 5,
      expiry: '14 Hari Percobaan'
    }
  ]);

  const [selectedTenant, setSelectedTenant] = useState<TenantItem | null>(null);
  const [editPlan, setEditPlan] = useState<'Starter' | 'Business' | 'Professional'>('Business');
  const [editStatus, setEditStatus] = useState<'ACTIVE' | 'TRIAL' | 'SUSPENDED'>('ACTIVE');
  const [editMaxUnits, setEditMaxUnits] = useState(250);

  // Add Tenant State
  const [isAddTenantOpen, setIsAddTenantOpen] = useState(false);
  const [newTenantName, setNewTenantName] = useState('');
  const [newTenantRegion, setNewTenantRegion] = useState('Kabupaten Garut');
  const [newTenantPlan, setNewTenantPlan] = useState<'Starter' | 'Business' | 'Professional'>('Starter');

  const handleOpenManage = (tenant: TenantItem) => {
    setSelectedTenant(tenant);
    setEditPlan(tenant.plan);
    setEditStatus(tenant.status);
    setEditMaxUnits(tenant.maxUnits);
  };

  const handleAddTenant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTenantName.trim()) {
      showToast('Nama developer / organisasi wajib diisi.', 'error');
      return;
    }

    const maxUnits = newTenantPlan === 'Starter' ? 60 : newTenantPlan === 'Business' ? 250 : 1000;
    const maxProjects = newTenantPlan === 'Starter' ? 2 : newTenantPlan === 'Business' ? 5 : 15;
    const maxUsers = newTenantPlan === 'Starter' ? 5 : newTenantPlan === 'Business' ? 15 : 40;

    const created: TenantItem = {
      id: `t-${Date.now()}`,
      name: newTenantName.trim(),
      region: newTenantRegion.trim() || 'Jawa Barat',
      plan: newTenantPlan,
      status: 'ACTIVE',
      unitsUsed: 0,
      maxUnits,
      projectsUsed: 0,
      maxProjects,
      usersUsed: 1,
      maxUsers,
      expiry: '31 Des 2027'
    };

    setTenants(prev => [...prev, created]);
    setIsAddTenantOpen(false);
    showToast(`Developer "${created.name}" berhasil didaftarkan ke platform (Paket ${created.plan})!`, 'success');

    // Reset
    setNewTenantName('');
  };

  const handleSaveTenant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTenant) return;

    setTenants(prev => prev.map(t => {
      if (t.id === selectedTenant.id) {
        return {
          ...t,
          plan: editPlan,
          status: editStatus,
          maxUnits: Number(editMaxUnits)
        };
      }
      return t;
    }));

    showToast(`Konfigurasi tenant "${selectedTenant.name}" berhasil diperbarui ke paket ${editPlan}!`, 'success');
    setSelectedTenant(null);
  };

  const totalTenants = tenants.length;
  const activeTenants = tenants.filter(t => t.status === 'ACTIVE').length;
  const totalUnitsTracked = tenants.reduce((acc, t) => acc + t.unitsUsed, 0);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Warning Notice Super Admin Privilege */}
      <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 flex items-start gap-4 shadow-md">
        <div className="p-2.5 bg-blue-600/30 text-blue-400 rounded-xl shrink-0 mt-0.5 border border-blue-500/40">
          <Shield className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-sm sm:text-base text-white">Konsol Super Admin HOMIQ Platform</h3>
            <span className="text-[10px] font-mono bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded border border-blue-500/30">
              ISOLATION LEVEL: STRICT
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            Anda berada di area isolasi platform multi-tenant SaaS. Sesuai arsitektur PostgreSQL Row Level Security (RLS), akun Super Admin hanya berwenang mengelola metadata organisasi, kuota kapasitas, dan status subscription, dan <strong>dibatasi secara kriptografis dari akses data konsumen pribadi</strong> setiap developer.
          </p>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition relative overflow-hidden border-t-4 border-t-blue-600">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Organisasi Terdaftar</span>
            <Building2 className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 mt-2">{totalTenants} Perusahaan</p>
          <p className="text-[11px] text-emerald-600 mt-1 font-medium">{activeTenants} Tenant Berlangganan Aktif</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition relative overflow-hidden border-t-4 border-t-purple-600">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Struktur Paket Master</span>
            <CreditCard className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-2xl font-extrabold text-purple-600 mt-2">3 Subscription Tiers</p>
          <p className="text-[11px] text-slate-500 mt-1">Starter, Business, Professional</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition relative overflow-hidden border-t-4 border-t-emerald-600">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Kavling Terkelola</span>
            <Database className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 mt-2">{totalUnitsTracked} Unit Kavling</p>
          <p className="text-[11px] text-slate-500 mt-1">Row-Locking DB Protected</p>
        </div>
      </div>

      {/* Subscription Tier Guide Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-slate-700 uppercase">Paket Starter</span>
            <span className="text-xs font-extrabold text-blue-600 font-mono">Rp 99.000/bln</span>
          </div>
          <p className="text-[11px] text-slate-500">Developer perumahan klaster tunggal / pemula</p>
          <ul className="mt-3 text-[11px] text-slate-600 space-y-1.5 border-t border-slate-100 pt-3">
            <li>• Kuota: Hingga 60 Kavling Unit</li>
            <li>• Maksimum 2 Proyek Perumahan</li>
            <li>• 5 Akun Marketing Staff</li>
          </ul>
        </div>

        <div className="bg-blue-50/60 p-5 rounded-2xl border border-blue-300 shadow-xs relative">
          <span className="absolute top-3 right-3 text-[9px] font-bold bg-blue-600 text-white px-2 py-0.5 rounded-full">POPULER</span>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-blue-900 uppercase">Paket Business</span>
            <span className="text-xs font-extrabold text-blue-700 font-mono">Rp 249.000/bln</span>
          </div>
          <p className="text-[11px] text-blue-700">Developer berkembang & agensi properti multi-lokasi</p>
          <ul className="mt-3 text-[11px] text-blue-800 space-y-1.5 border-t border-blue-200/60 pt-3">
            <li>• Kuota: Hingga 250 Kavling Unit</li>
            <li>• Maksimum 5 Proyek Perumahan</li>
            <li>• 15 Akun Marketing Staff + WhatsApp Center</li>
          </ul>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-slate-700 uppercase">Paket Professional</span>
            <span className="text-xs font-extrabold text-indigo-600 font-mono">Rp 499.000/bln</span>
          </div>
          <p className="text-[11px] text-slate-500">Grup pengembang perumahan skala korporat</p>
          <ul className="mt-3 text-[11px] text-slate-600 space-y-1.5 border-t border-slate-100 pt-3">
            <li>• Kuota: Hingga 1.000 Kavling Unit</li>
            <li>• 15 Proyek Perumahan</li>
            <li>• 40 Akun Staff + Integrasi Webhook API</li>
          </ul>
        </div>
      </div>

      {/* Tenant Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4 className="font-bold text-sm text-slate-900">Daftar Developer / Tenant Terdaftar</h4>
            <p className="text-xs text-slate-500 mt-0.5">Monitoring penggunaan kuota kavling dan status paket</p>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-semibold text-slate-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
              Total: {tenants.length} Tenant
            </span>
            <button
              onClick={() => setIsAddTenantOpen(true)}
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Daftarkan Developer Baru</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 min-w-[650px]">
            <thead className="bg-slate-100/80 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3.5">Nama Organisasi</th>
                <th className="p-3.5">Wilayah</th>
                <th className="p-3.5">Paket</th>
                <th className="p-3.5">Kapasitas Kavling</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Masa Berlaku</th>
                <th className="p-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tenants.map((t) => {
                const percent = Math.round((t.unitsUsed / t.maxUnits) * 100);

                return (
                  <tr key={t.id} className="hover:bg-slate-50/80 transition">
                    <td className="p-3.5 font-bold text-slate-900">
                      <div className="flex items-center gap-2">
                        <span>{t.name}</span>
                        {t.id.startsWith('aaa') && (
                          <span className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-mono font-bold">DEMO</span>
                        )}
                      </div>
                    </td>
                    <td className="p-3.5">{t.region}</td>
                    <td className="p-3.5">
                      <span className={`font-semibold ${
                        t.plan === 'Professional' ? 'text-indigo-600' : t.plan === 'Business' ? 'text-blue-600' : 'text-slate-700'
                      }`}>
                        {t.plan}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <div>
                        <div className="flex justify-between text-[10px] text-slate-500 mb-0.5">
                          <span>{t.unitsUsed} / {t.maxUnits} Unit</span>
                          <span>{percent}%</span>
                        </div>
                        <div className="w-28 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${percent > 85 ? 'bg-rose-500' : 'bg-blue-600'}`} 
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="p-3.5">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        t.status === 'ACTIVE' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : t.status === 'TRIAL'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {t.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-500">{t.expiry}</td>
                    <td className="p-3.5 text-right">
                      <button 
                        onClick={() => handleOpenManage(t)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg font-semibold text-[11px] text-slate-700 transition"
                      >
                        Kelola Tenant
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manage Tenant Modal */}
      {selectedTenant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden animate-in zoom-in-95">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center">
                  <Settings2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Kelola Tenant & Kuota</h3>
                  <p className="text-[11px] text-slate-500">{selectedTenant.name}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedTenant(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveTenant} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Paket Subscription Langganan</label>
                <select 
                  value={editPlan}
                  onChange={(e) => {
                    const p = e.target.value as 'Starter' | 'Business' | 'Professional';
                    setEditPlan(p);
                    if (p === 'Starter') setEditMaxUnits(60);
                    else if (p === 'Business') setEditMaxUnits(250);
                    else if (p === 'Professional') setEditMaxUnits(1000);
                  }}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Starter">Starter (Maks 60 Unit - Rp 99.000/bln)</option>
                  <option value="Business">Business (Maks 250 Unit - Rp 249.000/bln)</option>
                  <option value="Professional">Professional (Maks 1000 Unit - Rp 499.000/bln)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Batas Maksimum Unit Kavling (Quota)</label>
                <input 
                  type="number"
                  value={editMaxUnits}
                  onChange={(e) => setEditMaxUnits(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Status Operasional Tenant</label>
                <select 
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value as 'ACTIVE' | 'TRIAL' | 'SUSPENDED')}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="ACTIVE">ACTIVE (Akses Penuh)</option>
                  <option value="TRIAL">TRIAL (14 Hari)</option>
                  <option value="SUSPENDED">SUSPENDED (Ditangguhkan)</option>
                </select>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedTenant(null)}
                  className="px-4 py-2 text-xs text-slate-600 hover:bg-slate-100 rounded-lg transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg shadow-sm transition"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Register New Tenant Modal */}
      {isAddTenantOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden animate-in zoom-in-95">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                  <Plus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Daftarkan Developer / Tenant Baru</h3>
                  <p className="text-[11px] text-slate-500">HOMIQ Multi-Tenant SaaS Platform</p>
                </div>
              </div>
              <button 
                onClick={() => setIsAddTenantOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddTenant} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Developer / Perusahaan *</label>
                <input 
                  type="text" 
                  required
                  placeholder="Contoh: Cianjur Asri Property"
                  value={newTenantName}
                  onChange={(e) => setNewTenantName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Wilayah / Kota Operasional</label>
                <input 
                  type="text" 
                  placeholder="Contoh: Kabupaten Cianjur"
                  value={newTenantRegion}
                  onChange={(e) => setNewTenantRegion(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Pilihan Paket Langganan</label>
                <select 
                  value={newTenantPlan}
                  onChange={(e) => setNewTenantPlan(e.target.value as 'Starter' | 'Business' | 'Professional')}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Starter">Paket Starter (Maks 60 Unit / 2 Proyek / 5 Staff)</option>
                  <option value="Business">Paket Business (Maks 250 Unit / 5 Proyek / 15 Staff)</option>
                  <option value="Professional">Paket Professional (Maks 1000 Unit / 15 Proyek / 40 Staff)</option>
                </select>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddTenantOpen(false)}
                  className="px-4 py-2 text-xs text-slate-600 hover:bg-slate-100 rounded-lg transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg shadow-sm transition"
                >
                  Daftarkan Organisasi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
