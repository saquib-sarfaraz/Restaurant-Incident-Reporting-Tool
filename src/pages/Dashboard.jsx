import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiPlusCircle, HiChartBar, HiClipboardList } from 'react-icons/hi';
import Navbar from '../components/Navbar';
import StatsCards from '../components/StatsCards';
import Filters from '../components/Filters';
import IncidentCard from '../components/IncidentCard';
import AnalyticsCharts from '../components/AnalyticsCharts';
import AIAssistant from '../components/AIAssistant';
import IncidentFormModal from '../components/IncidentFormModal';
import { mockIncidents } from '../data/mockIncidents';

export default function Dashboard() {
  // 1. Incidents State
  const [incidents, setIncidents] = useState(mockIncidents);

  // 2. Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSeverity, setSelectedSeverity] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  // 3. Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 4. Update status handler
  const handleStatusChange = (id, newStatus) => {
    setIncidents(prevIncidents => 
      prevIncidents.map(inc => 
        inc.id === id ? { ...inc, status: newStatus } : inc
      )
    );
  };

  // 5. Submit new incident handler
  const handleSubmitIncident = (newIncident) => {
    // Generate next ID
    const currentNum = incidents.length + 1;
    const nextId = `INC-2026-${String(currentNum).padStart(3, '0')}`;
    
    const formattedIncident = {
      ...newIncident,
      id: nextId
    };

    setIncidents(prev => [formattedIncident, ...prev]);
    setIsModalOpen(false);
  };

  // 6. Reset Filters
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedSeverity("");
    setSelectedStatus("");
  };

  // 7. Dynamic Filtering with useMemo
  const filteredIncidents = useMemo(() => {
    return incidents.filter(inc => {
      const matchesSearch = searchQuery === "" ||
        inc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inc.store.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inc.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === "" || inc.category === selectedCategory;
      const matchesSeverity = selectedSeverity === "" || inc.severity === selectedSeverity;
      const matchesStatus = selectedStatus === "" || inc.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesSeverity && matchesStatus;
    });
  }, [incidents, searchQuery, selectedCategory, selectedSeverity, selectedStatus]);

  // 8. Dynamic Metrics Calculation
  const metrics = useMemo(() => {
    const total = incidents.length;
    const open = incidents.filter(i => i.status === 'Open').length;
    const critical = incidents.filter(i => i.severity === 'Critical' && i.status !== 'Resolved').length;
    const resolved = incidents.filter(i => i.status === 'Resolved').length;
    return { total, open, critical, resolved };
  }, [incidents]);

  // 9. Scroll to Analytics Section
  const scrollToAnalytics = () => {
    const section = document.getElementById('analytics-dashboard');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 relative overflow-hidden pb-16">
      
      {/* Background Radial Glow Effects */}
      <div className="gradient-glow-primary top-[10%] left-[5%] w-[40vw] h-[40vw]" />
      <div className="gradient-glow-secondary top-[40%] right-[10%] w-[35vw] h-[35vw]" />
      <div className="gradient-glow-primary bottom-[10%] left-[20%] w-[30vw] h-[30vw]" />

      {/* Navbar Container */}
      <Navbar 
        searchFilter={searchQuery} 
        setSearchFilter={setSearchQuery} 
        openIncidentsCount={metrics.open}
        criticalIncidentsCount={metrics.critical}
        activeIncidents={incidents}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* HERO SECTION */}
        <section className="py-8 md:py-12 border-b border-slate-900">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            {/* Left Hero Details */}
            <div className="text-left space-y-2 max-w-2xl">
              <span className="text-xs font-bold text-violet-400 uppercase tracking-widest bg-violet-600/10 border border-violet-500/20 px-3 py-1 rounded-full inline-block">
                Operations HQ Control
              </span>
              <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-slate-100 tracking-tight leading-tight">
                Restaurant Incident <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Management</span>
              </h1>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                Track, report and resolve operational issues efficiently. Integrated AI diagnostics and advanced telemetry analytics for California Burrito, McDonald's, and Starbucks branches.
              </p>
            </div>

            {/* Right Hero Action Buttons */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Secondary button */}
              <button
                onClick={scrollToAnalytics}
                className="px-5 py-2.5 rounded-xl border border-slate-800 hover:border-violet-500/30 hover:bg-slate-900/60 text-slate-300 hover:text-violet-300 text-xs font-bold font-display cursor-pointer transition-all flex items-center gap-1.5 shadow-md"
              >
                <HiChartBar className="w-4 h-4 text-violet-400" />
                View Analytics
              </button>

              {/* Primary button */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white text-xs font-bold font-display cursor-pointer transition-all flex items-center gap-1.5 border border-violet-500/30 shadow-lg shadow-violet-950/20"
              >
                <HiPlusCircle className="w-4.5 h-4.5" />
                Report Incident
              </button>
            </div>
          </motion.div>
        </section>

        {/* METRICS / STATS SECTION */}
        <StatsCards 
          total={metrics.total}
          open={metrics.open}
          critical={metrics.critical}
          resolved={metrics.resolved}
        />

        {/* DASHBOARD SPLIT GRID (Filters, List & AI Panel) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4 items-start">
          
          {/* Left Columns (Filters & List of Incident Cards) - Span 2 */}
          <div className="lg:col-span-2 space-y-5">
            {/* Filters Deck */}
            <Filters
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedSeverity={selectedSeverity}
              setSelectedSeverity={setSelectedSeverity}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              resetFilters={resetFilters}
            />

            {/* Incidents Cards List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-900">
                <div className="flex items-center gap-2">
                  <HiClipboardList className="w-4.5 h-4.5 text-slate-400" />
                  <h3 className="font-display font-semibold text-xs text-slate-400 uppercase tracking-widest">
                    Incident Logs ({filteredIncidents.length})
                  </h3>
                </div>
                <span className="text-[10px] text-slate-500 font-semibold uppercase">
                  Sort: Recent first
                </span>
              </div>

              {/* Staggered cards loader list */}
              <motion.div 
                layout 
                className="space-y-3.5"
              >
                <AnimatePresence mode="popLayout">
                  {filteredIncidents.map((incident) => (
                    <motion.div
                      key={incident.id}
                      initial={{ opacity: 0, scale: 0.98, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      transition={{ duration: 0.25 }}
                    >
                      <IncidentCard 
                        incident={incident} 
                        onStatusChange={handleStatusChange} 
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Empty State placeholder */}
                {filteredIncidents.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-12 rounded-2xl glass-panel border border-slate-800/80 text-center space-y-2 mt-4"
                  >
                    <div className="text-3xl">🛡️</div>
                    <h4 className="font-display font-bold text-slate-200 text-sm">No incidents matched your query</h4>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      Try resetting your active filters or clear search keywords to inspect all recorded incidents.
                    </p>
                    <button
                      onClick={resetFilters}
                      className="mt-3 text-xs font-semibold text-violet-400 hover:text-violet-300 underline cursor-pointer"
                    >
                      Clear all active filters
                    </button>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>

          {/* Right Column: AI Co-pilot Widget */}
          <div className="lg:sticky lg:top-24">
            <AIAssistant />
          </div>

        </div>

        {/* BOTTOM METRIC CHARTS SECTION */}
        <section id="analytics-dashboard" className="pt-12 mt-12 border-t border-slate-900">
          <div className="text-left">
            <h2 className="font-display font-black text-2xl text-slate-100 tracking-tight flex items-center gap-2">
              📊 Operational Analytics & Intelligence
            </h2>
            <p className="text-xs text-slate-400 max-w-xl mt-0.5">
              Live visual feedback and trends mapping computed dynamically using matching record datasets.
            </p>
          </div>

          <AnalyticsCharts incidents={filteredIncidents} />
        </section>

      </main>

      {/* Submission Overlay Modal */}
      <IncidentFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmitIncident={handleSubmitIncident}
      />
    </div>
  );
}
