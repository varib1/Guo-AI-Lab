import fs from 'fs';
import path from 'path';
import type { Member, Publication } from './types';

const MEMBERS_DIR = path.join(process.cwd(), 'src/data/members');
const PUBLICATIONS_DIR = path.join(process.cwd(), 'src/data/publications');

// Top-level category folders that contain member subdirectories
const MEMBER_CATEGORIES = ['teacher', 'students', 'alumni'] as const;

/**
 * Auto-discover all members by scanning two-level directory structure:
 *   src/data/members/{category}/{slug}/data.json
 *
 * Categories: teacher, students, alumni
 * The slug is derived from the innermost folder name.
 * Adding a new member: just create a folder + data.json in the right category.
 */
export function getAllMembers(): Member[] {
  const members: Member[] = [];

  for (const category of MEMBER_CATEGORIES) {
    const categoryDir = path.join(MEMBERS_DIR, category);
    if (!fs.existsSync(categoryDir)) continue;

    const entries = fs.readdirSync(categoryDir, { withFileTypes: true });

    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      if (entry.name.startsWith('_') || entry.name.startsWith('.')) continue;

      const dataPath = path.join(categoryDir, entry.name, 'data.json');
      if (!fs.existsSync(dataPath)) continue;

      const raw = fs.readFileSync(dataPath, 'utf-8');
      const member = JSON.parse(raw) as Member;
      // Derive slug from folder name (single source of truth)
      member.slug = entry.name;
      members.push(member);
    }
  }

  return members;
}

/**
 * Get a member by their slug (folder name).
 */
export function getMemberBySlug(slug: string): Member | undefined {
  const members = getAllMembers();
  return members.find((m) => m.slug === slug);
}

/**
 * Get all member slugs (for generateStaticParams).
 */
export function getAllSlugs(): string[] {
  return getAllMembers().map((m) => m.slug);
}

/**
 * Auto-discover all publications by scanning:
 *   src/data/publications/{slug}/data.json
 *
 * Adding a new publication: just create a folder + data.json in src/data/publications/.
 * Then reference the slug in the member's publicationSlugs array.
 */
export function getAllPublications(): Publication[] {
  const publications: Publication[] = [];

  if (!fs.existsSync(PUBLICATIONS_DIR)) return publications;

  const entries = fs.readdirSync(PUBLICATIONS_DIR, { withFileTypes: true });

  let idCounter = 0;
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (entry.name.startsWith('_') || entry.name.startsWith('.')) continue;

    const dataPath = path.join(PUBLICATIONS_DIR, entry.name, 'data.json');
    if (!fs.existsSync(dataPath)) continue;

    const raw = fs.readFileSync(dataPath, 'utf-8');
    const pub = JSON.parse(raw) as Publication;
    pub.id = `pub-${idCounter++}`;
    // Derive slug from folder name
    if (!pub.id) pub.id = `pub-${entry.name}`;
    publications.push(pub);
  }

  return publications.sort((a, b) => b.year - a.year);
}

/**
 * Get a publication by its slug (folder name).
 */
export function getPublicationBySlug(slug: string): Publication | undefined {
  const dataPath = path.join(PUBLICATIONS_DIR, slug, 'data.json');
  if (!fs.existsSync(dataPath)) return undefined;

  const raw = fs.readFileSync(dataPath, 'utf-8');
  const pub = JSON.parse(raw) as Publication;
  pub.id = slug;
  return pub;
}

/**
 * Get publications for a specific member by their publicationSlugs.
 */
export function getMemberPublications(member: Member): Publication[] {
  if (!member.publicationSlugs || member.publicationSlugs.length === 0) return [];

  const pubs: Publication[] = [];
  for (const slug of member.publicationSlugs) {
    const pub = getPublicationBySlug(slug);
    if (pub) pubs.push(pub);
  }

  return pubs.sort((a, b) => b.year - a.year);
}

/**
 * Get unique years from all publications.
 */
export function getUniqueYears(): number[] {
  const publications = getAllPublications();
  const years = [...new Set(publications.map((p) => p.year))];
  return years.sort((a, b) => b - a);
}

/**
 * Get unique venues from all publications.
 */
export function getUniqueVenues(): string[] {
  const publications = getAllPublications();
  const venues = [...new Set(publications.map((p) => p.venue))];
  return venues.sort();
}
