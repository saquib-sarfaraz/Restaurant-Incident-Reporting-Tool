import React from 'react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, 
  PieChart, Pie, Cell, BarChart, Bar, CartesianGrid 
} from 'recharts';
import { motion } from 'framer-motion';

// Custom Tooltip component for premium glass styling
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-3 bg-slate-900/90 border border-slate-800 backdrop-blur-md rounded-xl text-left shadow-xl">
        {label && <p className="text-xs font-bold text-slate-400 mb-1">{label}</p>}
        {payload.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color || item.payload.fill }} />
            <span className="text-xs text-slate-200 font-semibold">
              {item.name}: <span className="font-extrabold text-white">{item.value}</span>
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function AnalyticsCharts({ incidents }) {
  // 1. Process Trend Data (last 7 days)
  const getTrendData = () => {
    const datesMap = {};
    // Seed last 7 days with 0
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateString = d.toISOString().split('T')[0];
      datesMap[dateString] = 0;
    }

    // Accumulate
    incidents.forEach(inc => {
      if (datesMap[inc.date] !== undefined) {
        datesMap[inc.date]++;
      }
    });

    return Object.keys(datesMap).map(date => {
      // Formatter e.g. "May 29"
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
      { name: "Medium", value: counts.Medium, color: "#3B82F6" },
      { name: "Low", value: counts.Low, color: "#64748B" }
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
      "Count": catMap[cat]
    })).sort((a, b) => b.Count - a.Count);
  };

  const trendData = getTrendData();
  const severityData = getSeverityData();
  const categoryData = getCategoryData();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8 w-full">
      {/* Line / Area Chart: Trends */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="lg:col-span-2 p-5 rounded-2xl glass-panel border border-slate-800/80 relative"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-display font-bold text-sm text-slate-100 uppercase tracking-wider text-left">
              Incident Frequency Trends
            </h3>
            <span className="block text-left text-[11px] text-slate-500 font-medium mt-0.5">
              Daily volume of incident logs submitted over the last week
            </span>
          </div>
        </div>

        <div className="h-[250px] w-full mt-2">
          {trendData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="trendGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#7C3AED" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                <XAxis 
                  dataKey="dateString" 
                  stroke="#475569" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                />
                <YAxis 
                  stroke="#475569" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                  allowDecimals={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="Incidents" 
                  stroke="#7C3AED" 
                  strokeWidth={2.5} 
                  fillOpacity={1} 
                  fill="url(#trendGlow)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-500 text-xs">
              No matching records for timeline analytics.
            </div>
          )}
        </div>
      </motion.div>

      {/* Pie Chart: Severity Distribution */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="p-5 rounded-2xl glass-panel border border-slate-800/80 flex flex-col justify-between"
      >
        <div className="mb-4">
          <h3 className="font-display font-bold text-sm text-slate-100 uppercase tracking-wider text-left">
            Severity Distribution
          </h3>
          <span className="block text-left text-[11px] text-slate-500 font-medium mt-0.5">
            Severity break-down of current incidents
          </span>
        </div>

        <div className="h-[180px] w-full flex items-center justify-center relative">
          {severityData.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip content={<CustomTooltip />} />
                  <Pie
                    data={severityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {severityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              
              {/* Central counter */}
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-xl font-extrabold text-white tracking-tight">{incidents.length}</span>
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Total</span>
              </div>
            </>
          ) : (
            <div className="text-slate-500 text-xs">No severity metrics available.</div>
          )}
        </div>

        {/* Legend */}
        {severityData.length > 0 && (
          <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-800/60">
            {severityData.map((item, idx) => (
              <div key={idx} className="flex items-center gap-1.5 justify-start text-left">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <div className="text-[10px] leading-tight">
                  <span className="font-bold text-slate-300 block">{item.name}</span>
                  <span className="text-slate-500 font-medium">{item.value} ({Math.round((item.value / incidents.length) * 100)}%)</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Bar Chart: Category Distribution */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25 }}
        className="lg:col-span-3 p-5 rounded-2xl glass-panel border border-slate-800/80"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-display font-bold text-sm text-slate-100 uppercase tracking-wider text-left">
              Category Breakdown
            </h3>
            <span className="block text-left text-[11px] text-slate-500 font-medium mt-0.5">
              Volume split across operational categories
            </span>
          </div>
        </div>

        <div className="h-[200px] w-full">
          {categoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} margin={{ top: 10, right: 5, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06B6D4" />
                    <stop offset="100%" stopColor="#0891B2" stopOpacity={0.2} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                <XAxis 
                  dataKey="category" 
                  stroke="#475569" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                />
                <YAxis 
                  stroke="#475569" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                  allowDecimals={false}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
                <Bar 
                  dataKey="Count" 
                  fill="url(#barGradient)" 
                  radius={[6, 6, 0, 0]} 
                  maxBarSize={45}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-500 text-xs">
              No matching records for category distribution analysis.
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
