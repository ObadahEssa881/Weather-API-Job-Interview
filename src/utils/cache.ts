// src/utils/cache.ts

interface CacheEntry<T> {
  timestamp: number;
  data: T;
}

export class SimpleCache<T> {
  private cache: Map<string, CacheEntry<T>> = new Map();
  private ttl: number; // time to live in milliseconds

  constructor(ttlSeconds: number) {
    this.ttl = ttlSeconds * 1000;
  }

  get(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    const isExpired = Date.now() - entry.timestamp > this.ttl;
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }
    return entry.data;
  }

  set(key: string, value: T): void {
    this.cache.set(key, { timestamp: Date.now(), data: value });
  }
}
