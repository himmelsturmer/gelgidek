import type { H3Event } from 'h3'
import { getRequestHeader, createError } from 'h3'

const HTML_ESCAPE_MAP: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
}

export function escapeHtml(input: unknown): string {
    if (input === null || input === undefined) return ''
    return String(input).replace(/[&<>"']/g, (ch) => HTML_ESCAPE_MAP[ch] || ch)
}

export function sanitizeUrl(input: unknown): string {
    if (typeof input !== 'string') return ''
    const trimmed = input.trim()
    if (!trimmed) return ''
    if (trimmed.startsWith('/') && !trimmed.startsWith('//')) {
        return trimmed
    }
    try {
        const parsed = new URL(trimmed)
        if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
            return parsed.toString()
        }
    } catch {
        // Invalid URL
    }
    return ''
}

export function isValidEmail(email: unknown): email is string {
    if (typeof email !== 'string') return false
    const trimmed = email.trim()
    if (trimmed.length < 5 || trimmed.length > 254) return false
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)
}

interface RateLimitEntry {
    count: number
    resetAt: number
}

const rateLimitStore = new Map<string, RateLimitEntry>()

export function getClientIp(event: H3Event): string {
    const xff = getRequestHeader(event, 'x-forwarded-for')
    if (xff) {
        return xff.split(',')[0].trim()
    }
    const realIp = getRequestHeader(event, 'x-real-ip')
    if (realIp) return realIp.trim()
    return event.node?.req?.socket?.remoteAddress || 'unknown'
}

export function enforceRateLimit(
    event: H3Event,
    bucket: string,
    maxRequests: number,
    windowMs: number
): void {
    const now = Date.now()
    if (rateLimitStore.size > 5000) {
        for (const [k, v] of rateLimitStore.entries()) {
            if (v.resetAt <= now) rateLimitStore.delete(k)
        }
    }

    const ip = getClientIp(event)
    const key = `${bucket}:${ip}`
    const current = rateLimitStore.get(key)

    if (!current || current.resetAt <= now) {
        rateLimitStore.set(key, { count: 1, resetAt: now + windowMs })
        return
    }

    current.count += 1
    if (current.count > maxRequests) {
        throw createError({
            statusCode: 429,
            statusMessage: 'Çok fazla istek gönderildi. Lütfen kısa bir süre bekleyip tekrar deneyin.',
            message: 'Çok fazla istek gönderildi. Lütfen kısa bir süre bekleyip tekrar deneyin.',
        })
    }
}
