import React, { useEffect, useState, useMemo } from 'react';
import { AuthService } from '../../services/AuthService';
import { DataService } from '../../services/DataService';
import { MockDataService } from '../../services/MockDataService';
import { Session, UserProgress } from '../../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';
import { Search, Clock, CheckCircle2, Users } from 'lucide-react';

export function AdminView() {
  const [activeTab, setActiveTab] = useState<'users' | 'analytics'>('users');
  const [users, setUsers] = useState<any[]>([]);
  const [allSessions, setAllSessions] = useState<Session[]>([]);
  const [allProgress, setAllProgress] = useState<UserProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved'>('all');

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    if (activeTab === 'analytics' && allSessions.length === 0) {
      loadAnalytics();
    }
  }, [activeTab]);

  const loadUsers = async () => {
    setLoading(true);
    const data = await AuthService.getUsers();
    setUsers(data);
    setLoading(false);
  };

  const loadAnalytics = async () => {
    setLoading(true);
    const [sessionsData, progressData] = await Promise.all([
      DataService.getAllSessions(),
      DataService.getAllProgress()
    ]);
    setAllSessions(sessionsData);
    setAllProgress(progressData);
    setLoading(false);
  };

  const generateDemoData = async () => {
    if (!confirm('¿Seguro? Esto aprobará a todos los usuarios y generará datos de simulación ficticios para que puedas ver los gráficos completos.')) return;
    setIsGenerating(true);
    try {
      await MockDataService.generateGlobalMockData(users);
      await loadAnalytics();
      await loadUsers();
      alert('Simulación de datos completada con éxito.');
    } catch (e) {
      console.error(e);
      alert('Error generando datos. Revisa la consola.');
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleApproval = async (uid: string, currentStatus: boolean) => {
    await AuthService.toggleUserApproval(uid, currentStatus);
    loadUsers(); // reload
  };

  const pendingUsersCount = useMemo(() => {
    return users.filter(u => !u.isApproved).length;
  }, [users]);

  const approvedUsersCount = useMemo(() => {
    return users.filter(u => u.isApproved).length;
  }, [users]);

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = 
        (user.displayName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.email || '').toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = 
        statusFilter === 'all' ? true :
        statusFilter === 'pending' ? !user.isApproved :
        user.isApproved;

      return matchesSearch && matchesStatus;
    });
  }, [users, searchTerm, statusFilter]);

  // --- ANALÍTICAS GLOBALES ---
  
  // 1. Precisión Global de la Academia
  const globalAccuracy = useMemo(() => {
    const totalQ = allSessions.reduce((sum, s) => sum + s.total_questions, 0);
    const totalC = allSessions.reduce((sum, s) => sum + s.score, 0);
    return totalQ > 0 ? Math.round((totalC / totalQ) * 100) : 0;
  }, [allSessions]);

  // 2. Materias con más dificultad (Global)
  const materiaPerformance = useMemo(() => {
    const groups: Record<string, { correct: number, total: number }> = {};
    allSessions.forEach(s => {
      if (!groups[s.materia]) groups[s.materia] = { correct: 0, total: 0 };
      groups[s.materia].total += s.total_questions;
      groups[s.materia].correct += s.score;
    });
    return Object.entries(groups).map(([name, data]) => ({
      name,
      score: Math.round((data.correct / data.total) * 100)
    })).sort((a, b) => a.score - b.score);
  }, [allSessions]);

  // 3. Top 5 Subtemas Más Difíciles (Zonas Críticas Globales)
  const worstSubtopics = useMemo(() => {
    const groups: Record<string, { correct: number, total: number }> = {};
    allProgress.forEach(p => {
      const key = p.subtema_grupo || p.subtema || 'General';
      if (!groups[key]) groups[key] = { correct: 0, total: 0 };
      groups[key].total++;
      if (p.is_correct) groups[key].correct++;
    });
    return Object.entries(groups).map(([name, data]) => ({
      name,
      score: Math.round((data.correct / data.total) * 100),
      total: data.total
    })).filter(t => t.total >= 10) 
       .sort((a, b) => a.score - b.score)
       .slice(0, 5);
  }, [allProgress]);

  // 4. Ranking de Alumnos (Top 5)
  const topStudents = useMemo(() => {
    const groups: Record<string, { correct: number, total: number }> = {};
    allSessions.forEach(s => {
      if (!groups[s.user_id]) groups[s.user_id] = { correct: 0, total: 0 };
      groups[s.user_id].total += s.total_questions;
      groups[s.user_id].correct += s.score;
    });
    return Object.entries(groups).map(([user_id, data]) => {
      const user = users.find(u => u.uid === user_id);
      return {
        name: user?.displayName || user?.email || 'Usuario',
        photo: user?.photoURL,
        score: Math.round((data.correct / data.total) * 100),
        total: data.total
      };
    }).filter(s => s.total >= 20) 
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
  }, [allSessions, users]);

  if (loading && users.length === 0) {
    return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div></div>;
  }

  return (
    <div className="flex flex-col gap-6">
      {/* TABS & TOOLS */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-white/5 pb-4">
        <div className="flex gap-2 md:gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          <button 
            onClick={() => setActiveTab('users')}
            className={`whitespace-nowrap px-4 md:px-6 py-2.5 md:py-3 rounded-xl font-bold uppercase tracking-widest text-[10px] md:text-xs transition-all ${activeTab === 'users' ? 'bg-primary text-[#0A0A0A]' : 'bg-white/5 text-[#A0A0A0] hover:text-white hover:bg-white/10 border border-white/5'}`}
          >
            Usuarios
          </button>
          <button 
            onClick={() => setActiveTab('analytics')}
            className={`whitespace-nowrap px-4 md:px-6 py-2.5 md:py-3 rounded-xl font-bold uppercase tracking-widest text-[10px] md:text-xs transition-all ${activeTab === 'analytics' ? 'bg-primary text-[#0A0A0A]' : 'bg-white/5 text-[#A0A0A0] hover:text-white hover:bg-white/10 border border-white/5'}`}
          >
            Global
          </button>
        </div>
        
        <button 
          onClick={generateDemoData}
          disabled={isGenerating}
          className="w-full md:w-auto px-4 md:px-6 py-2.5 md:py-3 bg-[#1E1E1E] text-white rounded-xl font-bold uppercase tracking-widest text-[9px] md:text-[10px] hover:bg-white/5 transition-all flex items-center justify-center gap-2 border border-white/5"
        >
          {isGenerating ? (
            <><div className="animate-spin rounded-full h-3 w-3 border-t-2 border-[#1E1E1E]"></div> Generando...</>
          ) : (
            'Modo Demo: Poblar con Datos'
          )}
        </button>
      </div>

      {activeTab === 'users' && (
        <div className="bg-[#121212]/50 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/5 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-white/5 pb-6">
            <div>
              <h2 className="text-2xl font-black text-white tracking-tighter leading-none flex items-center gap-3">
                <Users className="w-6 h-6 text-primary" />
                Gestión de Aspirantes
              </h2>
              <p className="text-[#A0A0A0] text-xs font-medium mt-1">
                Busca y examina uno por uno las solicitudes de acceso a la plataforma.
              </p>
            </div>

            {/* Quick Status Filter Tabs */}
            <div className="flex items-center gap-2 bg-white/5 p-1 rounded-2xl border border-white/5">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  statusFilter === 'all'
                    ? 'bg-primary text-[#0A0A0A] shadow-md'
                    : 'text-[#A0A0A0] hover:text-white'
                }`}
              >
                Todos ({users.length})
              </button>
              <button
                onClick={() => setStatusFilter('pending')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  statusFilter === 'pending'
                    ? 'bg-amber-400 text-black shadow-md font-black'
                    : 'text-amber-400/80 hover:text-amber-300'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                Pendientes ({pendingUsersCount})
              </button>
              <button
                onClick={() => setStatusFilter('approved')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  statusFilter === 'approved'
                    ? 'bg-emerald-400 text-black shadow-md font-black'
                    : 'text-emerald-400/80 hover:text-emerald-300'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Aprobados ({approvedUsersCount})
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A0A0A0]" />
            <input
              type="text"
              placeholder="Buscar aspirante por nombre o correo electrónico..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#1A1A1A] text-white placeholder-[#666666] text-sm pl-11 pr-20 py-3 rounded-2xl border border-white/10 focus:outline-none focus:border-primary transition-all shadow-inner"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-primary hover:underline"
              >
                Limpiar
              </button>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-[#A0A0A0] text-[10px] uppercase tracking-widest">
                  <th className="pb-4 font-bold">Usuario</th>
                  <th className="pb-4 font-bold">Email</th>
                  <th className="pb-4 font-bold">Rol</th>
                  <th className="pb-4 font-bold">Estado</th>
                  <th className="pb-4 font-bold text-right">Acción</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(user => (
                  <tr key={user.uid} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={user.photoURL || 'https://via.placeholder.com/40'} 
                          alt="avatar" 
                          className="w-10 h-10 rounded-full border-2 border-white/10 shadow-lg" 
                          referrerPolicy="no-referrer"
                        />
                        <span className="font-bold text-white whitespace-nowrap">{user.displayName || 'Sin nombre'}</span>
                      </div>
                    </td>
                    <td className="py-4 text-[#A0A0A0] text-sm">{user.email}</td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest ${user.role === 'admin' ? 'bg-primary/20 text-primary' : 'bg-white/5 text-[#A0A0A0]'}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-4">
                      <span className={`flex items-center gap-2 text-sm font-bold ${user.isApproved ? 'text-emerald-400' : 'text-amber-400'}`}>
                        <span className={`w-2 h-2 rounded-full ${user.isApproved ? 'bg-emerald-400' : 'bg-amber-400'} shadow-[0_0_10px_rgba(52,211,153,0.3)]`}></span>
                        {user.isApproved ? 'Aprobado' : 'Pendiente'}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      {user.role !== 'admin' && (
                        <button 
                          onClick={() => toggleApproval(user.uid, user.isApproved)}
                          className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
                            user.isApproved 
                              ? 'bg-red-950/20 text-red-400 hover:bg-red-900/20 border border-red-500/20' 
                              : 'bg-emerald-950/20 text-emerald-400 hover:bg-emerald-900/20 border border-emerald-500/20'
                          }`}
                        >
                          {user.isApproved ? 'Revocar' : 'Aprobar'}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}

                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-[#A0A0A0] text-sm italic">
                      No se encontraron usuarios que coincidan con los criterios de búsqueda.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {loading ? (
            <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div></div>
          ) : (
            <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {/* GLOBAL ACCURACY */}
                <div className="bg-[#121212]/50 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/5 shadow-2xl flex flex-col justify-center items-center text-center relative overflow-hidden h-full">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
                  <h3 className="text-[#A0A0A0] font-black uppercase tracking-[0.2em] text-[10px] mb-2 leading-none">Precisión Global</h3>
                  <div className="text-5xl md:text-7xl font-black text-white tracking-tighter font-manrope leading-none mt-2">
                    {globalAccuracy}<span className="text-2xl md:text-3xl text-primary">%</span>
                  </div>
                  <p className="text-[#A0A0A0] text-[10px] font-bold uppercase tracking-widest mt-4">
                    Academia {users.length} alumnos
                  </p>
                </div>

                {/* MATERIA COMPARISON */}
                <div className="lg:col-span-3 bg-[#121212]/50 backdrop-blur-md rounded-3xl p-8 border border-white/5 shadow-2xl">
                  <h3 className="text-white font-black uppercase tracking-[0.2em] text-[10px] mb-8 flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                    Desempeño por Materia (Promedio Global)
                  </h3>
                  <div className="h-48 w-full">
                    {materiaPerformance.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={materiaPerformance} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                          <XAxis dataKey="name" stroke="#ffffff30" fontSize={10} tickLine={false} axisLine={false} />
                          <YAxis domain={[0, 100]} stroke="#ffffff30" fontSize={10} tickLine={false} axisLine={false} />
                          <Tooltip 
                            contentStyle={{ background: '#121212', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px' }}
                            itemStyle={{ color: '#C6A84A', fontWeight: 'bold' }}
                          />
                          <Bar dataKey="score" fill="#C6A84A" radius={[6, 6, 0, 0]} barSize={40}>
                            {materiaPerformance.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.score < 60 ? '#ef4444' : '#C6A84A'} fillOpacity={0.8 + (index * 0.05)} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center border border-dashed border-white/5 rounded-2xl text-[#A0A0A0] text-sm">Sin datos aún</div>
                    )}
                  </div>
                </div>
              </div>

              {/* TOP STUDENTS RANKING */}
              <div className="bg-[#121212]/50 backdrop-blur-md rounded-3xl p-8 border border-white/5 shadow-2xl">
                <h3 className="text-white font-black uppercase tracking-[0.2em] text-[10px] mb-8 flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Top Rankings (Élite Med)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {topStudents.map((student, i) => (
                    <div key={i} className="flex flex-col items-center p-4 md:p-6 bg-[#121212]/30 rounded-2xl border border-white/5 relative overflow-hidden group">
                      <div className={`absolute top-0 right-0 w-8 h-8 md:w-12 md:h-12 flex items-center justify-center font-black text-xs md:text-xl italic ${i === 0 ? 'text-primary' : 'text-[#A0A0A0]'}`}>
                        {i + 1}
                      </div>
                      <img src={student.photo || 'https://via.placeholder.com/60'} alt="avatar" className="w-12 h-12 md:w-16 md:h-16 rounded-full border-4 border-white/5 mb-3 md:mb-4 group-hover:scale-110 transition-transform shadow-xl" referrerPolicy="no-referrer" />
                      <p className="font-bold text-white text-xs md:text-sm text-center line-clamp-1">{student.name}</p>
                      <div className="mt-2 md:mt-4 flex items-center gap-2">
                        <span className="text-xl md:text-2xl font-black text-emerald-400 tracking-tighter">{student.score}%</span>
                      </div>
                      <p className="text-[8px] md:text-[10px] text-[#A0A0A0] uppercase tracking-widest font-bold mt-1 text-center">{student.total} respuestas</p>
                    </div>
                  ))}
                  {topStudents.length === 0 && (
                    <p className="col-span-full text-[#A0A0A0] text-sm italic text-center py-8">No hay suficientes datos para el ranking.</p>
                  )}
                </div>
              </div>

              {/* RADAR DEL PROFESOR: ZONAS CRÍTICAS GLOBALES */}
              <div className="bg-gradient-to-br from-[#2A2515] to-[#121212] rounded-3xl p-8 md:p-12 text-white border border-primary/20 shadow-2xl relative overflow-hidden">
                <div className="absolute -right-20 -top-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
                
                <div className="relative z-10 max-w-2xl mb-12">
                    <h3 className="font-manrope font-black text-4xl uppercase tracking-tighter mb-4 leading-none text-white">Radar del Profesor</h3>
                    <p className="text-[#D5D5D5] text-lg font-medium leading-relaxed">
                        Estas son las <strong className="font-black underline decoration-2 underline-offset-4">zonas de peligro</strong>. Tu academia está fallando críticamente en estos subtemas específicos.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative z-10">
                  {worstSubtopics.map((subtema, i) => (
                    <div key={i} className="bg-white/5 p-5 md:p-6 rounded-2xl border border-white/5 backdrop-blur-md group hover:bg-white/10 transition-all border-b-4 border-b-primary/30">
                      <div className="flex justify-between items-start mb-3 md:mb-4">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-[10px] font-black">{i + 1}</span>
                        <span className="text-primary text-[8px] md:text-[9px] font-black uppercase tracking-widest">Alerta</span>
                      </div>
                      <p className="text-white font-bold text-sm md:text-base mb-4 md:mb-6 leading-tight h-10 md:h-12 overflow-hidden">{subtema.name}</p>
                      <div className="flex items-end justify-between mt-auto">
                        <span className="text-white font-black text-2xl md:text-3xl tracking-tighter leading-none">{subtema.score}<span className="text-xs md:text-sm opacity-70">%</span></span>
                        <div className="text-right">
                            <p className="text-primary/75 text-[7px] md:text-[8px] uppercase font-black font-manrope whitespace-nowrap">Fallos</p>
                            <p className="text-white font-black text-[10px] md:text-xs">{subtema.total}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {worstSubtopics.length === 0 && (
                    <div className="col-span-full text-center py-20 border-2 border-dashed border-white/5 rounded-3xl text-[#A0A0A0] font-bold uppercase tracking-widest text-sm italic">
                      Aún no hay suficientes datos para detectar zonas críticas globales.
                    </div>
                  )}
                </div>
                
                <div className="mt-12 pt-8 border-t border-white/5 flex justify-end relative z-10">
                    <button className="px-8 py-4 bg-primary text-[#0A0A0A] font-black rounded-2xl uppercase tracking-widest text-[10px] shadow-2xl hover:scale-105 hover:-translate-y-0.5 transition-all">
                        Descargar Reporte PDF
                    </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
