import type { Manager } from "./Manager"

export type Word = {
    id: number,
    type: string,
    description: string,
    manager: Manager
}