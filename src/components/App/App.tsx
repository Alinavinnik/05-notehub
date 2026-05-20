import NoteList from "../NoteList/NoteList";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import css from "./App.module.css";
import { fetchNotes } from "../../services/noteService";
import { useState } from "react";
import SearchBox from "../SearchBox/SearchBox";
import { useDebouncedCallback } from "use-debounce";
import Pagination from "../Pagination/Pagination";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  // const [noteId, setNoteId] = useState("");

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
        {/* Кнопка створення нотатки */}
      </header>
      {data && data.notes.length > 0 && (
        <NoteList onClick={onClickDelete} notes={data.notes} />
      )}
    </div>
  );
}

export default App;
