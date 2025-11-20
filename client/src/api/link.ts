import { api } from './client';

export interface Link {
  code: string;
  targetUrl: string;
  totalClicks: number;
  lastClickedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export async function createLink(targetUrl: string, code?: string) {
  const res = await api.post<Link>('/links', { targetUrl, code });
  return res.data;
}

export async function getLinks() {
  const res = await api.get<Link[]>('/links');
  return res.data;
}

export async function getLink(code: string) {
  const res = await api.get<Link>(`/links/${code}`);
  return res.data;
}

export async function deleteLink(code: string) {
  await api.delete(`/links/${code}`);
}
