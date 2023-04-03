import {
  Sequence,
  AsyncStatus,
  MangaStatus,
  ReaderMode,
  ReaderDirection,
  customTheme,
  env,
} from '~/utils';
import { Plugin } from '~/plugins';

declare global {
  type GET = 'GET' | 'get';
  type POST = 'POST' | 'post';
  interface FetchData {
    url: string;
    method?: GET | POST;
    body?: FormData | Record<string, any>;
    headers?: Headers;
    timeout?: number;
  }

  type PartialOption<T, K extends string | number | symbol> = Omit<T, K> & {
    [A in Extract<keyof T, K>]?: T[A];
  };

  type OptionItem = { label: string; value: string };

  declare interface Manga {
    href: string;
    hash: string;
    source: Plugin;
    sourceName: string;
    mangaId: string;
    cover: string;
    headers?: Record<string, string>;
    title: string;
    latest: string;
    updateTime: string;
    author: string[];
    tag: string[];
    status: MangaStatus;
    chapters: ChapterItem[];
    lastWatchChapter?: string;
    lastWatchPage?: number;
    history: Record<
      string,
      {
        total: number;
        progress: number;
        imagesLoaded: number[];
        isVisited: boolean;
      }
    >;
  }
  declare interface IncreaseManga
    extends PartialOption<
      Manga,
      'latest' | 'updateTime' | 'author' | 'tag' | 'status' | 'chapters' | 'history'
    > {}
  declare interface ChapterItem {
    hash: string;
    mangaId: string;
    chapterId: string;
    href: string;
    title: string;
  }
  declare interface Chapter {
    hash: string;
    mangaId: string;
    chapterId: string;
    name: string;
    title: string;
    headers?: Record<string, string>;
    images: { uri: string; needUnscramble?: boolean }[];
  }
  declare interface Release {
    loadStatus: AsyncStatus;
    name: string;
    version: string;
    publishTime: string;
    latest?: LatestRelease;
  }
  declare interface LatestRelease {
    url: string;
    version: string;
    changeLog: string;
    publishTime: string;
    file?: {
      apk: {
        size: number;
        downloadUrl: string;
      };
      ipa: {
        size: number;
        downloadUrl: string;
      };
    };
  }

  declare interface RootState {
    app: {
      launchStatus: AsyncStatus;
      message: string[];
    };
    datasync: {
      syncStatus: AsyncStatus;
      clearStatus: AsyncStatus;
      backupStatus: AsyncStatus;
      restoreStatus: AsyncStatus;
    };
    release: Release;
    setting: {
      mode: ReaderMode;
      direction: ReaderDirection;
      sequence: Sequence;
      firstPrehandle: boolean;
    };
    plugin: {
      source: Plugin;
      list: {
        name: string;
        label: string;
        value: Plugin;
        score: number;
        href: string;
        userAgent?: string;
        description: string;
        disabled: boolean;
      }[];
    };
    batch: {
      loadStatus: AsyncStatus;
      stack: string[];
      queue: string[];
      success: string[];
      fail: string[];
    };
    favorites: { mangaHash: string; isTrend: boolean; inQueue: boolean }[];
    search: {
      filter: Record<string, string>;
      keyword: string;
      page: number;
      isEnd: boolean;
      loadStatus: AsyncStatus;
      list: string[];
    };
    discovery: {
      filter: Record<string, string>;
      page: number;
      isEnd: boolean;
      loadStatus: AsyncStatus;
      list: string[];
    };
    manga: {
      loadStatus: AsyncStatus;
      loadingMangaHash: string;
    };
    chapter: {
      loadStatus: AsyncStatus;
      loadingChapterHash: string;
      openDrawer: boolean;
      showDrawer: boolean;
      prehandleLog: {
        id: string;
        text: string;
        status: AsyncStatus;
      }[];
    };
    dict: {
      manga: Record<string, Manga | undefined>;
      chapter: Record<string, Chapter | undefined>;
    };
  }

  interface String {
    splic(f: string): string[];
  }

  interface Window {
    MangaPlugin: any;
  }
}
