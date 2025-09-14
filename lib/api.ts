export const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'https://analogent.ai/api/wp-json/analogent/v1'

export async function getJson<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(resolve(path), {
    ...init,
    method: 'GET',
    headers: {
      Accept: 'application/json',
      ...(init?.headers || {}),
    },
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`)
  return res.json() as Promise<T>
}

export async function postJson<T>(path: string, data: any, init?: RequestInit): Promise<T> {
  const res = await fetch(resolve(path), {
    ...init,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(init?.headers || {}),
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`POST ${path} failed: ${res.status} ${text}`)
  }
  return res.json() as Promise<T>
}

export async function postMultipart<T>(path: string, formData: FormData, init?: RequestInit): Promise<T> {
  const res = await fetch(resolve(path), {
    ...init,
    method: 'POST',
    body: formData,
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`POST ${path} failed: ${res.status} ${text}`)
  }
  return res.json() as Promise<T>
}

function resolve(path: string) {
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  return `${API_BASE}${path.startsWith('/') ? '' : '/'}${path}`
}
