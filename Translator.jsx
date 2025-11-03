import React, { useEffect, useMemo, useState } from 'react'

// Small offline English <-> Nyanja dictionary (best-effort) — used as fallback
const FALLBACK = {
  'hello': 'moni',
  'hi': 'moni',
  'good': 'bwino',
  'morning': 'madzulo',
  'evening': 'madzulo',
  'afternoon': 'masikati',
  'how': 'ndi',
  'are': 'ali',
  'you': 'inu',
  'how are you': 'muli bwanji',
  'please': 'chonde',
  'thank': 'zikomo',
  'thanks': 'zikomo',
  'yes': 'inde',
  'no': 'ayi',
  'goodbye': 'mwamva bwino',
  'i': 'ine',
  'we': 'ife',
  'they': 'awo',
  'he': 'iye',
  'she': 'iye',
  'name': 'dzina',
  'my': 'wanga',
  'what': 'chiyani'
}

function tokenize(text){
  // split into words and punctuation, preserve spaces by joining later
  const tokens = text.match(/\w+|[^\u0000-\w]+/g) || []
  return tokens
}

// Build forward dict map and reverse map from array of pairs or object
function buildMapsFromPairs(pairs){
  const forward = {}
  const reverse = {}
  let maxPhraseLen = 1

  pairs.forEach(item => {
    const en = (item.en || item.english || item.src || '').toString().toLowerCase().trim()
    const ny = (item.ny || item.nyanja || item.target || item.tgt || item.dst || '').toString().trim()
    if (!en || !ny) return
    forward[en] = ny
    // reverse may contain multiple options
    if (!reverse[ny.toLowerCase()]) reverse[ny.toLowerCase()] = []
    if (!reverse[ny.toLowerCase()].includes(en)) reverse[ny.toLowerCase()].push(en)

    const len = en.split(/\s+/).length
    if (len > maxPhraseLen) maxPhraseLen = len
  })

  return { forward, reverse, maxPhraseLen }
}

function buildMapsFromObject(obj){
  // obj: key->value mapping
  const forward = {}
  const reverse = {}
  let maxPhraseLen = 1
  Object.keys(obj).forEach(k => {
    const en = k.toString().toLowerCase().trim()
    const ny = obj[k].toString().trim()
    forward[en] = ny
    if (!reverse[ny.toLowerCase()]) reverse[ny.toLowerCase()] = []
    if (!reverse[ny.toLowerCase()].includes(en)) reverse[ny.toLowerCase()].push(en)
    const len = en.split(/\s+/).length
    if (len > maxPhraseLen) maxPhraseLen = len
  })
  return { forward, reverse, maxPhraseLen }
}

// Greedy longest-match translator for EN -> NY using forward map and tokenization
function translateENtoNYGreedy(text, forward, maxPhraseLen){
  if (!text) return ''
  const tokens = tokenize(text)
  const out = []

  for (let i = 0; i < tokens.length; ){
    // if token is non-word (space/punct) pass through
    if (!/\w+/.test(tokens[i])){ out.push(tokens[i]); i++; continue }

    // Try to find longest phrase starting at token i (count phrases by word tokens)
    let found = null
    let foundLen = 0
    // Build a sliding window over tokens to capture words and intermediate punctuation
    // We'll try lengths in words up to maxPhraseLen
    for (let l = Math.min(maxPhraseLen, tokens.length); l >= 1; l--){
      // collect next l word tokens into phraseLower, also count how many token indices we consume
      let words = []
      let consumed = 0
      for (let j = i; j < tokens.length && words.length < l; j++){
        consumed++
        if (/\w+/.test(tokens[j])) words.push(tokens[j].toLowerCase())
      }
      if (words.length < l) continue
      const phrase = words.join(' ')
      if (forward[phrase]){ found = forward[phrase]; foundLen = consumed; break }
    }

    if (found){
      // preserve capitalization of first original token
      if (/^[A-Z]/.test(tokens[i])) found = found.charAt(0).toUpperCase() + found.slice(1)
      out.push(found)
      i += foundLen
    } else {
      // no phrase match, map single word if available
      const token = tokens[i]
      const lc = token.toLowerCase()
      if (forward[lc]){
        let mapped = forward[lc]
        if (/^[A-Z]/.test(token)) mapped = mapped.charAt(0).toUpperCase() + mapped.slice(1)
        out.push(mapped)
      } else {
        out.push(token)
      }
      i++
    }
  }

  return out.join('')
}

// Greedy NY -> EN using reverse map (which stores arrays of english options)
function translateNYtoENGreedy(text, reverse, maxPhraseLen){
  if (!text) return ''
  const tokens = tokenize(text)
  const out = []

  for (let i = 0; i < tokens.length; ){
    if (!/\w+/.test(tokens[i])){ out.push(tokens[i]); i++; continue }

    let found = null
    let foundLen = 0
    for (let l = Math.min(maxPhraseLen, tokens.length); l >= 1; l--){
      let words = []
      let consumed = 0
      for (let j = i; j < tokens.length && words.length < l; j++){
        consumed++
        if (/\w+/.test(tokens[j])) words.push(tokens[j].toLowerCase())
      }
      if (words.length < l) continue
      const phrase = words.join(' ')
      if (reverse[phrase]){ found = reverse[phrase][0]; foundLen = consumed; break }
    }

    if (found){
      if (/^[A-Z]/.test(tokens[i])) found = found.charAt(0).toUpperCase() + found.slice(1)
      out.push(found)
      i += foundLen
    } else {
      const token = tokens[i]
      const lc = token.toLowerCase()
      if (reverse[lc] && reverse[lc][0]){
        let mapped = reverse[lc][0]
        if (/^[A-Z]/.test(token)) mapped = mapped.charAt(0).toUpperCase() + mapped.slice(1)
        out.push(mapped)
      } else {
        out.push(token)
      }
      i++
    }
  }

  return out.join('')
}

export default function Translator(){
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)
  const [direction, setDirection] = useState('en->ny') // 'en->ny' or 'ny->en'

  // maps/state
  const [forward, setForward] = useState(null)
  const [reverse, setReverse] = useState(null)
  const [maxPhraseLen, setMaxPhraseLen] = useState(1)

  // bootstrap: load dataset if present, otherwise use FALLBACK
  useEffect(() => {
    // Load dataset at runtime from the public folder so the bundler doesn't need a local file at build time.
    // This avoids Rollup/Vite failing the build when a locally-ignored dataset file is absent on the server.
    let mounted = true
    async function load(){
      try{
        // Try fetching runtime dataset from public path
        const res = await fetch('/tools/translator/data.json')
        if (res.ok){
          const data = await res.json()
          let maps
          if (Array.isArray(data)) maps = buildMapsFromPairs(data)
          else maps = buildMapsFromObject(data)
          if (!mounted) return
          setForward(maps.forward)
          setReverse(maps.reverse)
          setMaxPhraseLen(maps.maxPhraseLen)
          return
        }
      }catch(e){
        // fetch failed or JSON invalid — fall back to built-in map
      }

      // fallback to built-in mapping
      const fb = buildMapsFromObject(FALLBACK)
      setForward(fb.forward)
      setReverse(fb.reverse)
      setMaxPhraseLen(fb.maxPhraseLen)
    }

    load()
    return () => { mounted = false }
  }, [])

  function doTranslate(){
    if (!forward) return // still loading
    if (direction === 'en->ny'){
      setOutput(translateENtoNYGreedy(input, forward, maxPhraseLen))
    } else {
      setOutput(translateNYtoENGreedy(input, reverse, maxPhraseLen))
    }
    setCopied(false)
  }

  function doCopy(){
    if (!output) return
    navigator.clipboard?.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }

  function doClear(){
    setInput('')
    setOutput('')
    setCopied(false)
  }

  const inputLabel = direction === 'en->ny' ? 'Enter English text' : 'Enter Nyanja text'
  const outputLabel = direction === 'en->ny' ? 'Nyanja' : 'English'

  return (
    <main className="min-h-screen bg-white p-4 md:p-6">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold">Language Translator</h2>
          <select className="ml-3 border rounded-md p-1" value={direction} onChange={e => setDirection(e.target.value)} aria-label="Translation direction">
            <option value="en->ny">English → Nyanja</option>
            <option value="ny->en">Nyanja → English</option>
          </select>
        </div>

        <label className="block text-sm text-gray-600 mb-1">{inputLabel}</label>
        <textarea value={input} onChange={e => setInput(e.target.value)} rows={4} className="w-full p-3 border rounded-md mb-3" placeholder={inputLabel} />

        <div className="flex gap-2 mb-4">
          <button onClick={doTranslate} className="px-4 py-2 bg-ancestro-primary text-white rounded-md">Translate</button>
          <button onClick={doClear} className="px-4 py-2 bg-gray-100 rounded-md">Clear</button>
          <button onClick={doCopy} disabled={!output} className={`px-4 py-2 rounded-md ${output ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>

        <label className="block text-sm text-gray-600 mb-1">{outputLabel}</label>
        <div className="w-full p-3 border rounded-md min-h-[80px] bg-gray-50">{output || <span className="text-gray-400">Translation will appear here</span>}</div>

  <p className="mt-4 text-sm text-gray-500">Note: this is a simple offline translator (word/phrase mapping). To provide a larger dataset for production, place a JSON file at <code>/tools/translator/data.json</code> in the app's <code>public/</code> folder (either an array of objects with keys "en" and "ny", or an object mapping english-&gt;nyanja). The app will fetch that file at runtime and use it for translations.</p>
      </div>
    </main>
  )
}
