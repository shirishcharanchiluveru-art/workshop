import { ProduceInspection, VisualScanResult, SeasonalProduceItem, ShoppingListItem, UserPreferences, ChatMessage } from '../types/produce';

const BASE_URL = '/api';

export async function fetchHealthStatus() {
  const res = await fetch(`${BASE_URL}/health`);
  return res.json();
}

export async function fetchUserPreferences(): Promise<UserPreferences> {
  const res = await fetch(`${BASE_URL}/preferences`);
  return res.json();
}

export async function updateUserPreferences(prefs: Partial<UserPreferences>): Promise<UserPreferences> {
  const res = await fetch(`${BASE_URL}/preferences`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(prefs)
  });
  return res.json();
}

export async function fetchInspections(): Promise<ProduceInspection[]> {
  const res = await fetch(`${BASE_URL}/inspections`);
  return res.json();
}

export async function fetchInspectionById(id: string): Promise<ProduceInspection> {
  const res = await fetch(`${BASE_URL}/inspections/${id}`);
  if (!res.ok) throw new Error('Inspection report not found');
  return res.json();
}

export async function createInspection(payload: any): Promise<ProduceInspection> {
  const res = await fetch(`${BASE_URL}/inspections`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to generate inspection report');
  }
  return res.json();
}

export async function deleteInspection(id: string): Promise<void> {
  await fetch(`${BASE_URL}/inspections/${id}`, { method: 'DELETE' });
}

export async function fetchVisualScans(): Promise<VisualScanResult[]> {
  const res = await fetch(`${BASE_URL}/scans`);
  return res.json();
}

export async function uploadVisualScan(imageBase64: string, mimeType?: string): Promise<VisualScanResult> {
  const res = await fetch(`${BASE_URL}/scans`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ imageBase64, imageMimeType: mimeType || 'image/jpeg' })
  });
  if (!res.ok) throw new Error('Failed to analyze produce scan');
  return res.json();
}

export async function fetchSeasonalProduce(): Promise<SeasonalProduceItem[]> {
  const res = await fetch(`${BASE_URL}/seasonal`);
  return res.json();
}

export async function fetchShoppingList(): Promise<ShoppingListItem[]> {
  const res = await fetch(`${BASE_URL}/shopping`);
  return res.json();
}

export async function addShoppingItem(item: Partial<ShoppingListItem>): Promise<ShoppingListItem> {
  const res = await fetch(`${BASE_URL}/shopping`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item)
  });
  return res.json();
}

export async function toggleShoppingItem(id: string): Promise<ShoppingListItem> {
  const res = await fetch(`${BASE_URL}/shopping/${id}/toggle`, { method: 'PATCH' });
  return res.json();
}

export async function deleteShoppingItem(id: string): Promise<void> {
  await fetch(`${BASE_URL}/shopping/${id}`, { method: 'DELETE' });
}

export async function sendSommelierChat(messages: ChatMessage[], contextProduce?: string): Promise<ChatMessage> {
  const res = await fetch(`${BASE_URL}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, contextProduce })
  });
  if (!res.ok) throw new Error('FreshBot failed to respond');
  const data = await res.json();
  return data.reply;
}
