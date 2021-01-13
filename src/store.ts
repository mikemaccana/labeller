// https://svelte.dev/tutorial/writable-stores
import { writable } from "svelte/store";

import type ObjectLiteral from "./object-literal";

// Labels and names from https://github.com/humanloop/frontend-test/blob/master/README.md

// Eg
// [{"start": 12, "end": 30, "text": "Southampton United", label: 'organization'},]

export enum Label {
  Person = "person",
  Organisation = "organization",
  Location = "location",
  Misc = "misc",
}

export interface Annotation {
  start: number;
  end: number;
  text: string;
  label: Label;
}

export const text = `After bowling Somerset out for 83 on the opening morning at Grace Road, Leicestershire extended their first innings by 94 runs before being bowled out for 296 with England discard Andy Caddick taking three for 83.`;

export const annotations = writable(new Array<Annotation>());
