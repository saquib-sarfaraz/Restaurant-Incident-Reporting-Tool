// Prefer Vite env for production, otherwise use Vite dev proxy via relative URLs.
// - Dev: BASE_URL = ""  -> requests go to `/api/*` and Vite proxies to backendUrl.
// - Prod: set VITE_API_BASE_URL=https://your-backend.example.com
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

/**
 * Maps backend Incident document -> UI incident shape used across dashboards.
 * Backend uses Mongo `_id`, `storeName`, `createdAt`, etc.
 */
const mapIncidentFromApi = (doc) => {
  if (!doc) return null;
  const createdAt = doc.createdAt ? new Date(doc.createdAt) : null;
  return {
    id: doc._id || doc.id,
    title: doc.title || "",
    description: doc.description || "",
    category: doc.category || "Other",
    severity: doc.severity || "Low",
    status: doc.status || "Open",
    store: doc.storeName || doc.location || "Other",
    reportedTime: createdAt ? createdAt.toLocaleString() : "Just now",
    assignedManager: doc.assignedManager || "",
    resolutionNotes: doc.resolutionNotes || "",
    storeName: doc.storeName || "",
    location: doc.location || ""
  };
};

/**
 * Builds request headers embedding role credentials for mock authentication.
 */
const getHeaders = (role, name) => {
  return {
    "Content-Type": "application/json",
    "x-user-role": role || "staff",
    "x-user-name": name || "Saquib Sarfaraz"
  };
};

/**
 * REST API Client for Restaurant Incident Hub HQ.
 */
export const api = {
  /**
   * Fetch incidents list.
   * Staff receives only their own; Managers receive all.
   */
  fetchIncidents: async (role, name) => {
    const res = await fetch(`${BASE_URL}/api/incidents`, {
      method: "GET",
      headers: getHeaders(role, name)
    });
    if (!res.ok) throw new Error("Failed to fetch incidents");
    const json = await res.json();
    const list = json.success ? json.data : [];
    return Array.isArray(list) ? list.map(mapIncidentFromApi).filter(Boolean) : [];
  },

  /**
   * Submit a new incident.
   */
  createIncident: async (payload, role, name) => {
    // Normalize location and storeName fields standardly for MongoDB
    const bodyPayload = {
      ...payload,
      location: payload.location || payload.store || "Other",
      storeName: payload.storeName || payload.store || "Other"
    };

    const res = await fetch(`${BASE_URL}/api/incidents`, {
      method: "POST",
      headers: getHeaders(role, name),
      body: JSON.stringify(bodyPayload)
    });
    if (!res.ok) throw new Error("Failed to submit incident");
    const json = await res.json();
    return json.success ? mapIncidentFromApi(json.data) : null;
  },

  /**
   * Update full incident fields (PUT).
   */
  updateIncident: async (id, payload, role, name) => {
    const bodyPayload = {
      ...payload,
      location: payload.location || payload.store,
      storeName: payload.storeName || payload.store
    };

    const res = await fetch(`${BASE_URL}/api/incidents/${id}`, {
      method: "PUT",
      headers: getHeaders(role, name),
      body: JSON.stringify(bodyPayload)
    });
    if (!res.ok) throw new Error("Failed to update incident details");
    const json = await res.json();
    return json.success ? mapIncidentFromApi(json.data) : null;
  },

  /**
   * PATCH updates for status, assigned manager, or resolution notes.
   */
  updateIncidentStatus: async (id, statusPayload, role, name) => {
    const res = await fetch(`${BASE_URL}/api/incidents/${id}/status`, {
      method: "PATCH",
      headers: getHeaders(role, name),
      body: JSON.stringify(statusPayload)
    });
    if (!res.ok) throw new Error("Failed to update status workflow");
    const json = await res.json();
    return json.success ? mapIncidentFromApi(json.data) : null;
  },

  /**
   * Delete an incident.
   */
  deleteIncident: async (id, role, name) => {
    const res = await fetch(`${BASE_URL}/api/incidents/${id}`, {
      method: "DELETE",
      headers: getHeaders(role, name)
    });
    if (!res.ok) throw new Error("Failed to delete incident");
    const json = await res.json();
    return json.success ? json.data : null;
  },

  /**
   * Request LLM-backed incident diagnostics.
   */
  analyzeIncident: async (description, role, name) => {
    const res = await fetch(`${BASE_URL}/api/ai/analyze`, {
      method: "POST",
      headers: getHeaders(role, name),
      body: JSON.stringify({ description })
    });
    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      throw new Error(errJson.message || "Failed to query AI copilot");
    }
    const json = await res.json();
    return json.success ? json.data : null;
  },

  /**
   * Fetch aggregated AI / operational insights.
   */
  fetchAIInsights: async (role, name) => {
    const res = await fetch(`${BASE_URL}/api/ai/insights`, {
      method: "GET",
      headers: getHeaders(role, name)
    });
    if (!res.ok) throw new Error("Failed to fetch aggregate insights");
    const json = await res.json();
    return json.success ? json.data : null;
  }
};
