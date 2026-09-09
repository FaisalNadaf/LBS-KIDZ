/**
 * Production server.
 *
 * Node.js + Express is the stack named in the project's own vendor scope
 * ("Website development (Node.js + Express, backend upload facility, admin
 *  panel)"). Source: Website Reference Document S8; Project Decisions Log S5.
 *
 * Two jobs:
 *  1. Serve the prerendered per-route HTML from dist/, so a crawler and a
 *     first-time visitor both get the right <head> immediately.
 *  2. Receive Register Interest submissions and store them whole, because
 *     "Phase 1 leads carry forward into Phase 2's real admission funnel - no
 *      data loss, no restart." Source: Project Decisions Log S4.
 *
 * The admin panel named in the vendor scope is not built here; this server is
 * the minimum that makes the site and its one form work end to end.
 * See docs/decisions-and-todos.md item T-07.
 */
import express from 'express'
import { appendFile, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(fileURLToPath(import.meta.url))
const dist = join(root, 'dist')
const dataDir = join(root, 'data')
const leadsFile = join(dataDir, 'register-interest.jsonl')

if (!existsSync(dist)) {
  console.error('dist/ not found. Run "npm run build" first.')
  process.exit(1)
}

const app = express()
app.disable('x-powered-by')
app.use(express.json({ limit: '32kb' }))

/* ---- Leads ------------------------------------------------------------- */

const FIELDS = ['parentName', 'phone', 'childName', 'childClass', 'email', 'zone', 'message']
const MAX_LEN = 2000

app.post('/api/register-interest', async (req, res) => {
  const body = req.body ?? {}

  const parentName = String(body.parentName ?? '').trim()
  const phone = String(body.phone ?? '').replace(/[\s-]/g, '')

  if (parentName.length < 2 || !/^(?:\+?91|0)?[6-9]\d{9}$/.test(phone)) {
    return res.status(400).json({ ok: false, error: 'A name and a valid mobile number are required.' })
  }

  // Only known fields are stored, each length-capped.
  const record = { receivedAt: new Date().toISOString() }
  for (const field of FIELDS) {
    const value = body[field]
    if (typeof value === 'string' && value.trim()) record[field] = value.trim().slice(0, MAX_LEN)
  }

  try {
    await mkdir(dataDir, { recursive: true })
    await appendFile(leadsFile, `${JSON.stringify(record)}\n`, 'utf8')
    return res.status(201).json({ ok: true })
  } catch (error) {
    console.error('Failed to store enquiry:', error)
    return res.status(500).json({ ok: false, error: 'Could not store the enquiry.' })
  }
})

/* ---- Permanent redirects ----------------------------------------------- */

/**
 * The sitemap document sanctions both a long keyword-bearing slug and a short
 * variant for the curriculum page. The long one is canonical, so the short one
 * is served as a real 301 here rather than as a client-side redirect delivered
 * with a 404 status.
 * Source: Full Website Sitemap S3 (URL Structure Recommendation).
 */
const permanentRedirects = new Map([
  ['/curriculum', '/curriculum-nep-2020-activity-based-learning'],
])

app.use((req, res, next) => {
  const target = permanentRedirects.get(req.path.replace(/\/+$/, '') || '/')
  if (target) return res.redirect(301, target)
  next()
})

/* ---- Static ------------------------------------------------------------ */

// Hashed build assets can be cached hard; HTML must not be.
app.use(
  '/assets',
  express.static(join(dist, 'assets'), {
    immutable: true,
    maxAge: '1y',
  }),
)

app.use(
  express.static(dist, {
    extensions: ['html'],
    // No trailing-slash redirect: /faqs must serve dist/faqs/index.html directly,
    // because that is the URL the canonical tag and sitemap.xml both declare.
    redirect: false,
    setHeaders: (res, path) => {
      if (path.endsWith('.html')) res.setHeader('Cache-Control', 'no-cache')
    },
  }),
)

// SPA fallback: serve the prerendered file for the route when one exists,
// otherwise the shell, and let the router render the 404 page.
app.use((req, res) => {
  const candidate = join(dist, req.path, 'index.html')
  if (req.method === 'GET' && existsSync(candidate)) {
    res.setHeader('Cache-Control', 'no-cache')
    return res.sendFile(candidate)
  }
  res.status(req.method === 'GET' ? 404 : 405)
  res.setHeader('Cache-Control', 'no-cache')
  return res.sendFile(join(dist, 'index.html'))
})

const port = Number(process.env.PORT ?? 3000)
app.listen(port, () => {
  console.log(`LBS KidZ running on http://localhost:${port}`)
})
