export const BLUE = "#1976d2";
export const GREEN = "#8AE881";
export const RED = "#d32f2f";

export const ANGELA_IMAGE =
  "https://valurank-user-data.s3.amazonaws.com/avatars/c606c665b91e4e8aac981095898cad8d.jpg";

export const ASHLEY_IMAGE =
  "https://valurank-user-data.s3.amazonaws.com/avatars/64dca4cbfad4ead0c536c82b.jpg";

export const IMAGE_PLACEHOLDER = "/assets/admin-panel-avatar-placeholder.jpg";

export const LINK_OTHERWEB_IMAGE = "https://otherweb.com/favicon.ico";

export const articleLabels = [
  "TOP STORY",
  "OFFBEAT",
  "OTHER NEWS",
  "AVIATION",
  "BUSINESS & ECONOMICS",
  "CLIMATE & ENERGY",
  "EDUCATION",
  "EMPLOYMENT",
  "ENERGY",
  "ENTERTAINMENT",
  "ENVIRONMENT",
  "HEALTH",
  "MATHEMATICS",
  "MARKETS",
  "US POLITICS",
  "POLITICS",
  "SCIENCE",
  "SOCIAL MEDIA",
  "SPORTS",
  "SOCIETY",
  "TECHNOLOGY",
  "LAW",
  "WORLD",
];

export const defaultUser = {
  username: "",
  name: null,
  password: "",
  image: null,
  permissions: [],
  createdAt: null,
  updatedAt: null,
  isAdmin: false,
};

export const storiesBrief = ["stories", "bubbling_under"] as const;

export const draft = { state: "draft" };
export const published = { state: "published" };

// export const menuItemsType = [{ image: "Image Block" }, { news: "News Block" }];

export const menuItemsType = [
  { type: "image", text: "Image Block" },
  { type: "news", text: "News Block" },
];

export const formValues = [
  { firstProperty: "source", secondProperty: "name" },
  { firstProperty: "link_url", secondProperty: null },
  { firstProperty: "image_url", secondProperty: null },
];

export const errorMessages = {
  slug: "The chosen slug is already used by another brief. Change the slug to be able to complete the form",
  date: "The chosen date is already used by another brief. Change the date or edit the brief that has already this date",
};

// TODO : Make a function that auto-generates permissions

export const permissionsBrief = {
  create: "/briefs:create",
  read: "/briefs:read",
  update: "/briefs:update",
  delete: "/briefs:delete",
  publish: "/briefs:publish",
};

export const permissionsHostname = {
  create: "/hostnames:create",
  read: "/hostnames:read",
  update: "/hostnames:update",
  delete: "/hostnames:delete",
  publish: "/hostnames:publish",
};
export const permissionAdmin = {
  create: "/admin:create",
  read: "/admin:read",
  update: "/admin:update",
  delete: "/admin:delete",
  publish: "/admin:publish",
};

export const permissionPosts = {
  create: "/posts:create",
  read: "/posts:read",
  update: "/posts:update",
  delete: "/posts:delete",
  publish: "/posts:publish",
};
export const permissionUserPreferences = {
  create: "/user-preferences:create",
  read: "/user-preferences:read",
  update: "/user-preferences:update",
  delete: "/user-preferences:delete",
  publish: "/user-preferences:publish",
};
export const permissionNews = {
  create: "/flagged-news:create",
  read: "/flagged-news:read",
  update: "/flagged-news:update",
  delete: "/flagged-news:delete",
  publish: "/flagged-news:publish",
};

export const ROUTES = {
  // HOME: '/',
  DAILY_BRIEF: "/top-stories",
  PROFILE: "/configure",
  ACCOUNT: "/configure/account",
  CHANGE_EMAIL: "/configure/account/change-email",
  CHANGE_PASSWORD_PROFILE: "/configure/account/change-password",
  LOCATIONS: "/configure/locations",
  PREFERENCES: "/preferences",
  NOTIFICATIONS: "/configure/notifications",
  NOTIFICATIONS_SETTINGS: "/configure/notifications/settings",
  NEWS: "/news",
  BROWSE: "/",
  PUNDITRY: "/punditry",
  CATEGORIES: "/categories",
  SOURCES: "/sources",
  SEARCH: "/search",
  ADVANCED: "/advanced",
  EMOTIONS: "/emotions",
  TOS: "/terms",
  PRIVACY_POLICY: "/privacy",
  CHANGE_PASSWORD: "/change-password",
  LOGIN: "/login",
  SIGN_UP: "/signup",
  SUMMARY_NEWS: "/n",
  SUMMARY_OPINION: "/o",
  NEWS_RESUTL: "/result",
  MEDIA: "/media",
  CONTACT_US: "/contact-us",
  ABOUT_US: "/aboutus",
  DELETE: "/delete",
  BLOG: "/blog",
  SUPPORT: "/support",
  NEWS_WIDGET: "/news-widget",
  ARCHIVE: "/archive",
  WIDGET: "/widget",
  CONFIGURE: "/configure",
  NEWS_GPT: "/news-gpt",
  NEWS_GPT_PREVIOUS_QUESTIONS: "/news-gpt/previous-questions",
  DISCUSSIONS: "/discussions",
} as const;

export const emotions = `${ROUTES.PREFERENCES}${ROUTES.EMOTIONS}`;
export const newsCategories = `${ROUTES.PREFERENCES}${ROUTES.NEWS}${ROUTES.CATEGORIES}`;
export const newsSources = `${ROUTES.PREFERENCES}${ROUTES.NEWS}${ROUTES.SOURCES}`;
export const punditryCategories = `${ROUTES.PREFERENCES}${ROUTES.PUNDITRY}${ROUTES.CATEGORIES}`;
export const punditrySources = `${ROUTES.PREFERENCES}${ROUTES.PUNDITRY}${ROUTES.SOURCES}`;
export const advancedNews = `${newsCategories}${ROUTES.ADVANCED}`;

// -------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------

import { SidebarType } from "./types";

export const isPunditryCategoriesClearAuthKey = "isPunditryCategoriesClearAuth";
export const isPunditryCategoriesClearKey = "isPunditryCategoriesClear";

export const isNewsSourcesClearAuthKey = "isNewsSourcesClearAuth";
export const isNewsSourcesClearKey = "isNewsSourcesClear";

export const isPunditrySourcesClearAuthKey = "isPunditrySourcesClearAuth";
export const isPunditrySourcesClearKey = "isPunditrySourcesClear";

export const searchPageInputId = "search-page-input";

export const thirtyDaysMaxAge = 2592000;
export const greetingsMessagesName = "greetings_messages";
export const greetingsMessagesUnAuthName = "greetings_messages_un_auth";
export const previousQuestionsName = "previous_questions";
export const anonymousIdName = "anonymous_user_id";

export const maxAdvancedTopicValue = 65536;

export const STORE = {
  ONBOARDING_STATUS: "otherweb:onboarding_status",

  NEWS_CUTOFFS: "otherweb:cutoffs",
  NEWS_CUTOFFS_V2: "otherweb_cutoffs_v2",
  TOPICS_AFFINITY_STORAGE_KEY: "otherweb_topics_affinity",
  EMOTIONS_AFFINITY_STORAGE_KEY: "otherweb_emotions_affinity",
  NEWS_CATEGORY: "otherweb:news_type",
  NEWS_ALL_SOURCES: "otherweb:all_sources",
  NEWS_UNSELECTED_SOURCES: "otherweb_news_unselected_sources",
  NEWS_SELECTED_SOURCES: "otherweb_news_selected_sources",
  NEWS_READ_ARTICLE_LIST: "otherweb_read_articles",
  DISCUSSION_ONBOARDING_USER: "otherweb:onboarding_discussion_user_onboarding",
  DISCUSSION_ONBOARDING: "otherweb:onboarding_discussion_onboarding",
  SIGNUP_ONBOARDING: "otherweb:register_onboarding_is_passed",

  NARRATION_SPEED: "otherweb:narration_speed",

  SEARCH_AUTO_EXPAND: "otherweb:auto_expand",

  AUDIO_SPEED: "otherweb:audio_speed",

  ERROR_REPORTS: "otherweb:error_reports",

  PUNDITRY_ALL_SOURCES: "otherweb_opinion_all_sources",
  PUNDITRY_UNSELECTED_SOURCES: "otherweb_opinions_unselected_sources",
  PUNDITRY_SELECTED_SOURCES: "otherweb:opinion_selected_sources",
  PUNDITRY_CATEGORY: "otherweb_opinion_category_v2",
  PUNDITRY_CUTOFFS: "otherweb:opinion_cutoffs",
  PUNDITRY_READ_ARTICLE_LIST: "otherweb:opinion_read_articles",

  FONT_SIZE: "otherweb:font_size",

  BLOG_SUBSCRIBED: "otherweb:blog_subscribed",
  FEED_STYLE: "otherweb:feed_presentation_style",

  FRIENDS: "otherweb:friends",
  DEVICES_TOKENS: "otherweb:devices_tokens",

  CONCIERGE_OPENED: "otherweb:concierge_opened",
  CONCIERGE_PREVIOUS_QUESTION: "otherweb:concierge_previous_questions",
} as const;
