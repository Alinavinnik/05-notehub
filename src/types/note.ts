export interface Note {
  id: string;
  title: string;
  content: string;
  tag: string;
}
export type TypeTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

export interface NoteTag {
  title: string;
  content: string;
  tag: TypeTag;
}
