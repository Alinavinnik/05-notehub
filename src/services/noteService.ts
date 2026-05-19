import axios from "axios";
import type { Note, NoteTag } from "../types/note";

interface FetchNotesResponse {
  notes: Note[];
  page: number;
  totalPages: number;
}

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
export async function fetchNotes(query: string, page: number) {
  const { data } = await axios.get<FetchNotesResponse>("/notes", {
    params: { page, query },
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
    },
  });
  return data;
}

export async function createNote(newNote: NoteTag) {
  const { data } = await axios.post<Note>("/notes", newNote);
  return data;
}

export async function deleteNote(id: string) {
  const { data } = await axios.delete<Note>(`/notes${id}`);
  return data;
}
