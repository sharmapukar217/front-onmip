import { twMerge } from "tailwind-merge";
import { cnBase, type ClassValue } from "tailwind-variants";

export function clsx(...inputs: ClassValue[]) {
  return twMerge(cnBase(inputs));
}
