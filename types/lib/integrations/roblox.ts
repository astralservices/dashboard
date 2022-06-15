type WebhookDefaults = {
  enabled: boolean;
  webhook: string;
  groupId: string;
};

export type MemberCounter = WebhookDefaults & {
  message: string;
};

export type ShoutProxy = WebhookDefaults;

export type WallFilter = {
  bannedPhrases?: string[];
};

export type BadActorDetection = {
  enabled: boolean;
  factors: {
    bannedGroups?: string[];
    sketchyUsername?: boolean;
    noDescription?: boolean;
  };
};

export type Settings = {
  token: string;
  groupId: string;
  memberCounter: MemberCounter;
  shoutProxy: ShoutProxy;
  wallFilter: WallFilter;
  badActorDetection: BadActorDetection;
};
