const API_BASE = process.env.NEXT_PUBLIC_BACKEND_API || 'http://localhost:5000';

/* ─── Types ─── */

export interface IColumnInfo {
  name: string;
  type: 'TEXT' | 'REAL' | 'INTEGER';
  sampleValues: string[];
}

export interface IDatasetMetadata {
  id: string;
  originalName: string;
  tableName: string;
  columns: IColumnInfo[];
  rowCount: number;
  sampleRows: Record<string, unknown>[];
  createdAt: string;
}

export interface IUploadResponse {
  success: boolean;
  message: string;
  data: IDatasetMetadata;
}

export interface IChatApiResponse {
  success: boolean;
  data: {
    sessionId: string;
    dashboard: {
      title: string;
      charts: Array<{
        id: string;
        title: string;
        type: string;
        sql: string;
        config: Record<string, unknown>;
        data: Record<string, unknown>[];
        error?: string;
      }>;
      insights: string;
    };
  };
}

export interface ISuggestionsResponse {
  success: boolean;
  data: {
    suggestions: string[];
  };
}

/* ─── API Functions ─── */

/**
 * Upload a CSV file to the backend.
 */
export async function uploadDataset(file: File): Promise<IUploadResponse> {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch(`${API_BASE}/v1/dataset/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Upload failed' }));
    throw new Error(err.message || `Upload failed with status ${res.status}`);
  }

  return res.json();
}

/**
 * Send a chat query to generate a dashboard.
 */
export async function sendChatQuery(
  prompt: string,
  datasetId: string,
  sessionId?: string
): Promise<IChatApiResponse> {
  const body: Record<string, string> = { prompt, datasetId };
  if (sessionId) body.sessionId = sessionId;

  const res = await fetch(`${API_BASE}/v1/ai/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Chat request failed' }));
    throw new Error(err.message || `Chat request failed with status ${res.status}`);
  }

  return res.json();
}

/**
 * Fetch AI-generated suggestions for a dataset.
 */
export async function fetchSuggestions(datasetId: string): Promise<string[]> {
  const res = await fetch(`${API_BASE}/v1/ai/suggestions/${datasetId}`);

  if (!res.ok) {
    return [
      'Show me a summary of the data',
      'What are the top entries?',
      'Show me trends over time',
    ];
  }

  const json: ISuggestionsResponse = await res.json();
  return json.data.suggestions;
}
