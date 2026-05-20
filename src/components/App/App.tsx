import NoteList from "../NoteList/NoteList";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import css from "./App.module.css";
import { createNote, fetchNotes } from "../../services/noteService";
import { useState } from "react";
import SearchBox from "../SearchBox/SearchBox";
import { useDebouncedCallback } from "use-debounce";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import type { NoteTag } from "../../types/note";

function App() {
  //States
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);

  const { data, isSuccess } = useQuery({
    queryKey: ["notes", searchQuery, page],
    queryFn: () => fetchNotes(searchQuery, page),
    placeholderData: keepPreviousData,
  });

  // const mutation = useMutation({
  //   mutationFn: (noteId: string) => deleteNote(noteId),
  // });

  const onClickDelete = () => {};
  const onChange = useDebouncedCallback((newSearchValue: string) => {
    setSearchQuery(newSearchValue);
  }, 300);

  const totalPages = data?.totalPages ?? 0;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (createdNote: NoteTag) => createNote(createdNote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const handleOnCreateNote = (value: NoteTag) => {
    mutation.mutate(value);
  };

  //Markup
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={onChange} />
        {isSuccess && totalPages > 1 && (
          <Pagination
            forcePage={page - 1}
            pageCount={totalPages}
            onPageChange={setPage}
          />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
        {isOpenModal && (
          <Modal>
            <NoteForm
              closeModal={closeModal}
              onCreateNote={(values) => handleOnCreateNote(values)}
            />
          </Modal>
        )}
      </header>
      {data && data.notes.length > 0 && (
        <NoteList onClick={onClickDelete} notes={data.notes} />
      )}
    </div>
  );
}

export default App;
