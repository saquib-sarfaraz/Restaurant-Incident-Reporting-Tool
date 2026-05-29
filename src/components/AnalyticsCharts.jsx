import React from 'react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, 
  PieChart, Pie, Cell, BarChart, Bar, CartesianGrid 
} from 'recharts';
import { STORES } from '../data/mockIncidents';

// Explicitly dark tooltip for high contrast and modern look across both themes
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-3 bg-slate-900 border border-slate-700/80 backdrop-blur-md rounded-xl text-left shadow-lg text-slate-100">
        {label && <p className="text-[10px] font-bold text-slate-400 mb-1">{label}</p>}
        {payload.map((item, idx) => (
          <div key={idx} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color || item.payload.fill }} />
            <span className="text-xs text-slate-350 font-semibold">
              {item.name}: <span className="font-extrabold text-white">{item.value}</span>
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function AnalyticsCharts({ incidents, theme }) {
  const isDark = theme === 'dark';
  
  // Clean theme-adaptive colors
  const gridColor = isDark ? '#334155' : '#e2e8f0';
  const labelColor = isDark ? '#94A3B8' : '#64748B';

  // 1. Process Trend Data (last 7 days)
  const getTrendData = () => {
    const datesMap = {};
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateString = d.toISOString().split('T')[0];
      datesMap[dateString] = 0;
    }

    incidents.forEach(inc => {
      if (datesMap[inc.date] !== undefined) {
        datesMap[inc.date]++;
      }
    });

    return Object.keys(datesMap).map(date => {
      const parts = date.split('-');
      const d = new Date(parts[0], parts[1] - 1, parts[2]);
      const formattedDate = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      return {
        dateString: formattedDate,
        "Incidents": datesMap[date]
      };
    });
  };

  // 2. Process Severity Data (Pie)
  const getSeverityData = () => {
    const counts = { Critical: 0, High: 0, Medium: 0, Low: 0 };
    incidents.forEach(inc => {
      if (counts[inc.severity] !== undefined) {
        counts[inc.severity]++;
      }
    });

    return [
      { name: "Critical", value: counts.Critical, color: "#EF4444" },
      { name: "High", value: counts.High, color: "#F59E0B" },
      { name: "Medium", value: counts.Medium, color: "#6366F1" },
      { name: "Low", value: counts.Low, color: "#94A3B8" }
    ].filter(item => item.value > 0);
  };

  // 3. Process Category Data (Bar)
  const getCategoryData = () => {
    const catMap = {};
    incidents.forEach(inc => {
      catMap[inc.category] = (catMap[inc.category] || 0) + 1;
    });

    return Object.keys(catMap).map(cat => ({
      category: cat,
      "Incident Count": catMap[cat]
    })).sort((a, b) => b["Incident Count"] - a["Incident Count"]);
  };

  // 4. Process Store Performance Data (Horizontal Bar)
  const getStoreData = () => {
    const storeMap = {};
    // Ensure all stores from the STORES list exist in the map
    STORES.forEach(s => {
      storeMap[s] = 0;
    });

    incidents.forEach(inc => {
      if (storeMap[inc.store] !== undefined) {
        storeMap[inc.store]++;
      } else if (inc.store) {
        storeMap[inc.store] = 1;
      }
    });

    return Object.keys(storeMap).map(store => {
      // Clean display name (e.g. California Burrito - Saket -> Saket)
      const displayName = store.includes(' - ') ? store.split(' - ')[1] : store;
      return {
        store: displayName,
        "Incidents": storeMap[store]
      };
    }).sort((a, b) => b["Incidents"] - a["Incidents"]);
  };

  const trendData = getTrendData();
  const severityData = getSeverityData();
  const categoryData = getCategoryData();
  const storeData = getStoreData();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6 w-full text-left">
      
      {/* 1. Area Chart: Incident Trends */}
      <div className="lg:col-span-2 p-6 rounded-[24px] bg-card-saas border border-border-saas relative flex flex-col justify-between min-h-[300px]">
        <div>
          <h4 className="font-display font-bold text-xs text-text-main uppercase tracking-widest block">
            Incident Frequency Trends
          </h4>
          <span className="block text-[11px] text-text-muted font-medium mt-0.5">
            Operational alerts volume submitted over the past 7 days
          </span>
        </div>

        <div className="h-[200px] w-full mt-4 flex-1">
          {trendData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 5, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                <XAxis dataKey="dateString" stroke={labelColor} fontSize={9} tickLine={false} axisLine={false} />
                <YAxis stroke={labelColor} fontSize={9} tickLine={false} axisLine={false} allowDecimals={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="Incidents" stroke="#6366F1" strokeWidth={2} fillOpacity={1} fill="url(#trendGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-text-muted text-xs">
              No matching records for daily trend analytics.
            </div>
          )}
        </div>
      </div>

      {/* 2. Donut Chart: Severity Breakdown */}
      <div className="p-6 rounded-[24px] bg-card-saas border border-border-saas flex flex-col justify-between min-h-[300px]">
        <div>
          <h4 className="font-display font-bold text-xs text-text-main uppercase tracking-widest block">
            Severity Distribution
          </h4>
          <span className="block text-[11px] text-text-muted font-medium mt-0.5">
            Weight breakdown of current active incidents
          </span>
        </div>

        <div className="h-[140px] w-full flex items-center justify-center relative my-3">
          {severityData.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip content={<CustomTooltip />} />
                  <Pie
                    data={severityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={65}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {severityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-lg font-extrabold text-text-main tracking-tight">{incidents.length}</span>
                <span className="text-[9px] text-text-muted font-bold uppercase tracking-wider">Reports</span>
              </div>
            </>
          ) : (
            <div className="text-text-muted text-xs">No records log metrics.</div>
          )}
        </div>

        {/* Custom Legend */}
        {severityData.length > 0 && (
          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-border-saas">
            {severityData.map((item, idx) => (
              <div key={idx} className="flex items-center gap-1.5 justify-start text-[10px]">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="font-semibold text-text-muted truncate">{item.name}: <strong className="text-text-main">{item.value}</strong></span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3. Bar Chart: Category distribution */}
      <div className="lg:col-span-2 p-6 rounded-[24px] bg-card-saas border border-border-saas flex flex-col justify-between min-h-[300px]">
        <div>
          <h4 className="font-display font-bold text-xs text-text-main uppercase tracking-widest block">
            Category Breakdown
          </h4>
          <span className="block text-[11px] text-text-muted font-medium mt-0.5">
            Incident distribution across core operational modules
          </span>
        </div>

        <div className="h-[200px] w-full mt-4 flex-1">
          {categoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} margin={{ top: 10, right: 5, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="barSaaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06B6D4" />
                    <stop offset="100%" stopColor="#0891B2" stopOpacity={0.15} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                <XAxis dataKey="category" stroke={labelColor} fontSize={9} tickLine={false} axisLine={false} />
                <YAxis stroke={labelColor} fontSize={9} tickLine={false} axisLine={false} allowDecimals={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.01)' }} />
                <Bar dataKey="Incident Count" fill="url(#barSaaGradient)" radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-text-muted text-xs">
              No matching records for category splits.
            </div>
          )}
        </div>
      </div>

      {/* 4. Horizontal Bar Chart: Store Performance Metrics */}
      <div className="p-6 rounded-[24px] bg-card-saas border border-border-saas flex flex-col justify-between min-h-[300px]">
        <div>
          <h4 className="font-display font-bold text-xs text-text-main uppercase tracking-widest block">
            Store Performance
          </h4>
          <span className="block text-[11px] text-text-muted font-medium mt-0.5">
            Total active incidents logged by branch location
          </span>
        </div>

        <div className="h-[200px] w-full mt-4 flex-1">
          {storeData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={storeData} layout="vertical" margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <defs>
                  <linearGradient id="storeSaaGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#6366F1" />
                    <stop offset="100%" stopColor="#06B6D4" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} horizontal={false} />
                <XAxis type="number" stroke={labelColor} fontSize={9} tickLine={false} axisLine={false} allowDecimals={false} />
                <YAxis dataKey="store" type="category" stroke={labelColor} fontSize={9} tickLine={false} axisLine={false} width={80} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.01)' }} />
                <Bar dataKey="Incidents" fill="url(#storeSaaGradient)" radius={[0, 4, 4, 0]} maxBarSize={18} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-text-muted text-xs">
              No matching records for store analytics.
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
