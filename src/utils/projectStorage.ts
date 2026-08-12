import { Character, PackInfo, TimelineClip } from '../types';

export interface SavedProject {
  id: string;
  title: string;
  updatedAt: number;
  packInfo: PackInfo;
  characters: Character[];
  clips: TimelineClip[];
  duration?: number;
  videoMediaName?: string;
  videoMediaUrl?: string;
  backingTrackName?: string;
  backingTrackUrl?: string;
}

const STORAGE_KEY_CURRENT = 'cvmodmaker_current_project';
const STORAGE_KEY_PROJECTS = 'cvmodmaker_saved_projects';

export function saveActiveProjectLocally(
  projectId: string,
  packInfo: PackInfo,
  characters: Character[],
  clips: TimelineClip[],
  videoMediaName?: string,
  backingTrackName?: string,
  videoMediaUrl?: string,
  backingTrackUrl?: string
): SavedProject {
  // Clean temporary blob object URLs while keeping persistent data/http URLs
  const sanitizeUrl = (url?: string, defaultFallback?: string) => {
    if (!url) return defaultFallback;
    if (url.startsWith('blob:')) return defaultFallback;
    return url;
  };

  const cleanPackInfo: PackInfo = {
    ...packInfo,
    iconBlob: undefined,
    fillerImageBlob: undefined,
    iconUrl: sanitizeUrl(packInfo.iconUrl),
    fillerImageUrl: sanitizeUrl(packInfo.fillerImageUrl),
  };

  const cleanCharacters = characters.map((c) => ({
    ...c,
  }));

  const cleanClips = clips.map((c) => ({
    ...c,
    audioBlob: undefined,
    imageUrl: sanitizeUrl(c.imageUrl),
  }));

  const project: SavedProject = {
    id: projectId,
    title: cleanPackInfo.title || 'Untitled Dub Modpack',
    updatedAt: Date.now(),
    packInfo: cleanPackInfo,
    characters: cleanCharacters,
    clips: cleanClips,
    videoMediaName,
    videoMediaUrl: sanitizeUrl(videoMediaUrl),
    backingTrackName,
    backingTrackUrl: sanitizeUrl(backingTrackUrl),
  };

  try {
    localStorage.setItem(STORAGE_KEY_CURRENT, JSON.stringify(project));

    // Update project list
    const existingList = getSavedProjectsList();
    const filtered = existingList.filter((p) => p.id !== project.id);
    const updatedList = [project, ...filtered].slice(0, 10); // Keep top 10 recent
    localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(updatedList));
  } catch (err) {
    console.warn('Could not save project to localStorage:', err);
  }

  return project;
}

export function getActiveProjectFromStorage(): SavedProject | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CURRENT);
    if (!raw) return null;
    return JSON.parse(raw) as SavedProject;
  } catch {
    return null;
  }
}

export function getSavedProjectsList(): SavedProject[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROJECTS);
    if (!raw) return [];
    return JSON.parse(raw) as SavedProject[];
  } catch {
    return [];
  }
}

export function deleteSavedProject(id: string): void {
  try {
    const list = getSavedProjectsList();
    const updated = list.filter((p) => p.id !== id);
    localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(updated));

    const current = getActiveProjectFromStorage();
    if (current && current.id === id) {
      localStorage.removeItem(STORAGE_KEY_CURRENT);
    }
  } catch (err) {
    console.warn('Error deleting project from storage:', err);
  }
}
