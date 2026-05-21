import axios from "axios";
import type { Note, NoteTag } from "../types/note";

interface FetchNotesResponse {
  notes: Note[];
  page: number;
  totalPages: number;
}

const apiClient = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
  },
});

//Get request
export async function fetchNotes(search: string, page: number) {
  const { data } = await apiClient.get<FetchNotesResponse>("/notes", {
    params: { page, search, perPage: 12 },
  });
  return data;
}

//Post request
export async function createNote(newNote: NoteTag) {
  const { data } = await apiClient.post<Note>("/notes", newNote);
  return data;
}

//Delete request
export async function deleteNote(id: string) {
  const { data } = await apiClient.delete<Note>(`/notes/${id}`);
  return data;
}
