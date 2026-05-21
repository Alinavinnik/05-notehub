import NoteList from "../NoteList/NoteList";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import css from "./App.module.css";
import { createNote, deleteNote, fetchNotes } from "../../services/noteService";
import { useState } from "react";
import SearchBox from "../SearchBox/SearchBox";
import { useDebouncedCallback } from "use-debounce";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import type { NewNote } from "../../types/note";
import { error, success } from "../../notification/notification";
import Loader from "../Loader/Loader";

function App() {
  //States
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const queryClient = useQueryClient();

  const openModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);

  //Search note
  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: ["notes", searchQuery, page],
    queryFn: () => fetchNotes(searchQuery, page),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages ?? 0;

  const onChange = useDebouncedCallback((newSearchValue: string) => {
    setSearchQuery(newSearchValue);
    setPage(1);
  }, 300);

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
          <Modal onClose={closeModal}>
            <NoteForm closeModal={closeModal} />
          </Modal>
        )}
      </header>
      {isError && (
        <p style={{ color: "#f61515" }}>
          Somthing went wrong!Please reload your page
        </p>
      )}
      {isLoading && <Loader />}
      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
    </div>
  );
}

export default App;
