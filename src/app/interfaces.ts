export interface HostName {
  id?: string;
  title: string;
  description: string;
  image: string;
  favicon: string;
  hostname: string;
  url: string;
}

export interface ArticleBlock {
  // removed null from type
  type: "news";
  label: string;
  title: string;
  content: string;
  description: string | null;
  link_url: string;
  image_url: string;
  source: {
    name: string;
    image_url: string | null;
    source_url: string;
  };
  stories:
    | {
        title: string;
        link_title: string;
        link_url: string;
      }[]
    | null;
  bubbling_under:
    | {
        title: string;
        link_title: string;
        link_url: string;
      }[]
    | null;
}
export interface ImageBlock {
  type: "image";
  image: string;
}

export interface Brief {
  id?: string;
  date: string;
  detail?: string;
  updated_at: string | null;
  created_at: string | null;
  published_at: string | null;
  state: "draft" | "published";
  title: string;
  slug: string | null;
  description: string;
  author: {
    name: string;
    avatar_url: string | null;
  };
  blocks: (ArticleBlock | ImageBlock)[];
}

export interface StoryType {
  title: string;
  link_title: string;
  link_url: string;
}

export interface MainBriefData
  extends Omit<
    Brief,
    | "author"
    | "blocks"
    | "id"
    | "updated_at"
    | "created_at"
    | "state"
    | "published_at"
    | "detail"
  > {}

export interface dataHostname {
  data: HostName[];
  page: number;
  page_size: number;
  total: number;
  total_pages: number;
}

export interface AdminUser {
  id?: string;
  name: string | null;
  username: string;
  password: string;
  permissions: string[];
  image: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  isAdmin: boolean;
}

export interface UserSession {
  name: string;
  image: string;
  username: string;
  isAdmin: boolean;
  permissions: string[];
  expires: string;
}
export interface CustomSession {
  user: UserSession;
}

export interface IconsHostName {
  description: React.JSX.Element;
  url: React.JSX.Element;
  image: React.JSX.Element;
  favicon: React.JSX.Element;
}

export interface UserPreference {
  id: string;
  name: string;
  username: string;
  email: string;
}
