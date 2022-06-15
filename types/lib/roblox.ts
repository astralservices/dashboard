export type RobloxAPIResponse<T> = {
  data: T;
};

export type Group = {
  id: number;
  name: string;
  description: string;
  owner: {
    userId: number;
    username: string;
    displayName: string;
    buildersClubMembershipType: string;
  };
  memberCount: number;
  created: Date;
};
