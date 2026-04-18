import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { algoliasearch } from 'algoliasearch';

const projectRoot = process.cwd();
const distDir = path.join(projectRoot, '.vitepress', 'dist');

loadEnvFile(path.join(projectRoot, '.env'));

const appId = process.env.ALGOLIA_APP_ID ?? process.env.VITEPRESS_ALGOLIA_APP_ID;
const apiKey =
  process.env.ALGOLIA_ADMIN_API_KEY
  ?? process.env.VITEPRESS_ALGOLIA_ADMIN_API_KEY
  ?? process.env.ALGOLIA_API_KEY
  ?? process.env.VITEPRESS_ALGOLIA_API_KEY;
const indexName = process.env.ALGOLIA_INDEX_NAME ?? process.env.VITEPRESS_ALGOLIA_INDEX_NAME;

if (!appId || !apiKey || !indexName) {
  throw new Error(
    'Missing Algolia credentials. Expected ALGOLIA_ADMIN_API_KEY or VITEPRESS_ALGOLIA_ADMIN_API_KEY, plus APP_ID and INDEX_NAME.'
  );
}

if (!existsSync(distDir)) {
  throw new Error('Missing .vitepress/dist. Run `pnpm build` first.');
}

const htmlFiles = (await walk(distDir))
  .filter((file) => file.endsWith('.html'))
  .filter((file) => !file.endsWith(path.join('.vitepress', 'dist', '404.html')));

const records = [];

for (const file of htmlFiles) {
  const html = await fs.readFile(file, 'utf8');
  const page = buildPageRecords(file, html);
  records.push(...page);
}

if (records.length === 0) {
  throw new Error('No records were generated from .vitepress/dist.');
}

const client = algoliasearch(appId, apiKey);

const settingsResponse = await client.setSettings({
  indexName,
  indexSettings: {
    searchableAttributes: [
      'unordered(hierarchy.lvl0)',
      'unordered(hierarchy.lvl1)',
      'unordered(hierarchy.lvl2)',
      'unordered(hierarchy.lvl3)',
      'unordered(hierarchy.lvl4)',
      'unordered(hierarchy.lvl5)',
      'content'
    ],
    attributesForFaceting: ['filterOnly(lang)', 'filterOnly(type)'],
    attributesToSnippet: ['content:20'],
    attributesToHighlight: [
      'hierarchy.lvl0',
      'hierarchy.lvl1',
      'hierarchy.lvl2',
      'hierarchy.lvl3',
      'hierarchy.lvl4',
      'hierarchy.lvl5',
      'content'
    ],
    distinct: false,
    removeStopWords: ['en'],
    ignorePlurals: ['en'],
    camelCaseAttributes: ['content'],
    customRanking: ['asc(weight)', 'asc(position)']
  }
});

await client.waitForTask({ indexName, taskID: settingsResponse.taskID });

const replaceResponse = await client.replaceAllObjects({
  indexName,
  objects: records,
  waitForTasks: true
});

console.log(
  JSON.stringify(
    {
      indexName,
      records: records.length,
      settingsTaskID: settingsResponse.taskID,
      replaceTaskID: replaceResponse.taskID ?? null
    },
    null,
    2
  )
);

function buildPageRecords(file, html) {
  const mainMatch = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i);
  if (!mainMatch) {
    return [];
  }

  const main = mainMatch[1]
    .replace(/<a\b[^>]*class="header-anchor"[\s\S]*?<\/a>/gi, '')
    .replace(/<script\b[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[\s\S]*?<\/style>/gi, '');

  const pageUrl = fileToUrl(file);
  const lang = pageUrl.startsWith('/en/') ? 'en' : 'zh-Hans';
  const pageTitle = extractFirstHeading(main) ?? extractTitle(html) ?? pageUrl;
  const tokens = [...main.matchAll(/<(h[1-6]|p|li|pre|blockquote|td)\b([^>]*)>([\s\S]*?)<\/\1>/gi)];
  const hasH1 = tokens.some((match) => match[1].toLowerCase() === 'h1');

  const hierarchy = Array(6).fill(null);
  hierarchy[0] = pageTitle;
  const sections = [];
  let currentSection = createSection(pageUrl, pageTitle);
  let position = 0;

  if (!hasH1) {
    sections.push(
      makeRecord({
        pageUrl,
        lang,
        hierarchy: hierarchyObject(hierarchy),
        content: null,
        type: 'lvl0',
        anchor: null,
        weight: 0,
        position: position++
      })
    );
  }

  for (const match of tokens) {
    const tag = match[1].toLowerCase();
    const attrs = match[2] ?? '';
    const rawInnerHtml = match[3] ?? '';
    const text = normalizeWhitespace(stripTags(rawInnerHtml));

    if (!text) {
      continue;
    }

    if (tag.startsWith('h')) {
      flushCurrentSection();

      const level = Number(tag[1]);
      const idMatch = attrs.match(/\bid="([^"]+)"/i);
      const anchor = idMatch?.[1] ?? null;

      for (let i = level; i < hierarchy.length; i += 1) {
        hierarchy[i] = null;
      }
      hierarchy[level - 1] = text;

      currentSection = createSection(pageUrl, pageTitle, anchor, hierarchyObject(hierarchy));

      sections.push(
        makeRecord({
          pageUrl,
          lang,
          hierarchy: hierarchyObject(hierarchy),
          content: null,
          type: `lvl${Math.max(0, level - 1)}`,
          anchor,
          weight: level * 10,
          position: position++
        })
      );

      continue;
    }

    currentSection.content.push(text);
  }

  flushCurrentSection();
  return sections;

  function flushCurrentSection() {
    const chunks = chunkContentBlocks(currentSection.content);
    if (chunks.length === 0) {
      return;
    }

    for (const content of chunks) {
      sections.push(
        makeRecord({
          pageUrl,
          lang,
          hierarchy: currentSection.hierarchy,
          content,
          type: 'content',
          anchor: currentSection.anchor,
          weight: 100,
          position: position++
        })
      );
    }

    currentSection = createSection(
      pageUrl,
      pageTitle,
      currentSection.anchor,
      currentSection.hierarchy
    );
  }
}

function createSection(pageUrl, pageTitle, anchor = null, hierarchy = null) {
  return {
    pageUrl,
    pageTitle,
    anchor,
    hierarchy: hierarchy ?? {
      lvl0: pageTitle,
      lvl1: null,
      lvl2: null,
      lvl3: null,
      lvl4: null,
      lvl5: null
    },
    content: []
  };
}

function hierarchyObject(levels) {
  return {
    lvl0: levels[0] ?? null,
    lvl1: levels[1] ?? null,
    lvl2: levels[2] ?? null,
    lvl3: levels[3] ?? null,
    lvl4: levels[4] ?? null,
    lvl5: levels[5] ?? null
  };
}

function makeRecord({ pageUrl, lang, hierarchy, content, type, anchor, weight, position }) {
  const url = anchor ? `${pageUrl}#${anchor}` : pageUrl;
  return {
    objectID: createHash('sha1')
      .update(`${url}|${type}|${position}|${content ?? ''}`)
      .digest('hex'),
    url,
    url_without_anchor: pageUrl,
    anchor,
    hierarchy,
    content,
    type,
    lang,
    weight,
    position
  };
}

function fileToUrl(file) {
  const relative = path.relative(distDir, file).replace(/\\/g, '/');
  if (relative === 'index.html') {
    return '/';
  }
  if (relative.endsWith('/index.html')) {
    return `/${relative.slice(0, -'/index.html'.length)}/`;
  }
  return `/${relative}`;
}

function extractFirstHeading(html) {
  const match = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i);
  return match ? normalizeWhitespace(stripTags(match[1])) : null;
}

function extractTitle(html) {
  const match = html.match(/<title>([\s\S]*?)<\/title>/i);
  if (!match) {
    return null;
  }
  return normalizeWhitespace(decodeHtml(match[1]).replace(/\s*\|\s*.*$/, ''));
}

function stripTags(html) {
  return decodeHtml(
    html
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/(p|li|pre|blockquote|td|tr|h[1-6])>/gi, '\n')
      .replace(/<[^>]+>/g, ' ')
  );
}

function normalizeWhitespace(value) {
  return value.replace(/\s+/g, ' ').trim();
}

function chunkContentBlocks(blocks, maxLength = 2000) {
  const normalized = blocks
    .map((block) => normalizeWhitespace(block))
    .filter(Boolean);

  const chunks = [];
  let current = '';

  for (const block of normalized) {
    if (block.length > maxLength) {
      if (current) {
        chunks.push(current);
        current = '';
      }

      for (const piece of splitLargeBlock(block, maxLength)) {
        chunks.push(piece);
      }
      continue;
    }

    const next = current ? `${current} ${block}` : block;
    if (next.length > maxLength) {
      chunks.push(current);
      current = block;
      continue;
    }

    current = next;
  }

  if (current) {
    chunks.push(current);
  }

  return chunks;
}

function splitLargeBlock(block, maxLength) {
  const sentences = block
    .split(/(?<=[。！？.!?;；])\s+/)
    .map((sentence) => normalizeWhitespace(sentence))
    .filter(Boolean);

  if (sentences.length <= 1) {
    return splitByLength(block, maxLength);
  }

  const parts = [];
  let current = '';

  for (const sentence of sentences) {
    if (sentence.length > maxLength) {
      if (current) {
        parts.push(current);
        current = '';
      }
      parts.push(...splitByLength(sentence, maxLength));
      continue;
    }

    const next = current ? `${current} ${sentence}` : sentence;
    if (next.length > maxLength) {
      parts.push(current);
      current = sentence;
      continue;
    }

    current = next;
  }

  if (current) {
    parts.push(current);
  }

  return parts;
}

function splitByLength(value, maxLength) {
  const parts = [];
  for (let index = 0; index < value.length; index += maxLength) {
    parts.push(value.slice(index, index + maxLength));
  }
  return parts;
}

function decodeHtml(value) {
  return value
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(Number.parseInt(hex, 16)))
    .replace(/&#([0-9]+);/g, (_, num) => String.fromCodePoint(Number.parseInt(num, 10)));
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const resolved = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return walk(resolved);
      }
      return resolved;
    })
  );
  return files.flat();
}

function loadEnvFile(file) {
  if (!existsSync(file)) {
    return;
  }

  const content = readFileSync(file, 'utf8');
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }

    const equalIndex = trimmed.indexOf('=');
    if (equalIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, equalIndex).trim();
    if (!key || process.env[key]) {
      continue;
    }

    let value = trimmed.slice(equalIndex + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"'))
      || (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    process.env[key] = value;
  }
}
