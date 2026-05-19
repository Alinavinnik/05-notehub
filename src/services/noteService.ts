import axios from "axios";
import type { Note, NoteTag } from "../types/note";

interface FetchNotesResponse {
  notes: Note[];
  page: number;
  totalPages: number;
}

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

//Get request
export async function fetchNotes(search: string, page: number) {
  const { data } = await axios.get<FetchNotesResponse>("/notes", {
    params: { page, search, perPage: 12 },
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
    },
  });
  return data;
}
console.log(import.meta.env.VITE_NOTEHUB_TOKEN);

//Post request
export async function createNote(newNote: NoteTag) {
  const { data } = await axios.post<Note>("/notes", newNote);
  return data;
}

//Delete request
export async function deleteNote(id: string) {
  const { data } = await axios.delete<Note>(`/notes${id}`);
  return data;
}
