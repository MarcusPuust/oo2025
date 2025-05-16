import type { User } from "./User";

export interface Post {
  id: number;
  title: string;
  body: string;
  user: User;
}
