export type ResourceType = "youtube" | "article" | "doc" | "note";

export type Resource = {
  id: string;
  type: ResourceType;
  title: string;
  url?: string;
  note?: string;
};

export type Skill = {
  id: string;
  title: string;
  description: string;
  confidence: "low" | "medium" | "high";
  verified: boolean;
  lastCheckedAt?: string; // ISO
};

export type Topic = {
  id: string;
  title: string;
  goal: string;
  createdAt: string;
  resources: Resource[];
  skills: Skill[];
};