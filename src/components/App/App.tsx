import NoteList from "../NoteList/NoteList";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import css from "./App.module.css";
import { fetchNotes } from "../../services/noteService";
import { useState } from "react";
import SearchBox from "../SearchBox/SearchBox";
import { useDebouncedCallback } from "use-debounce";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const { data } = useQuery({
    queryKey: ["getNotes", searchQuery],
    queryFn: () => fetchNotes(searchQuery, page),
    placeholderData: keepPreviousData,
  });

  const onClickDelete = () => {};
  const onChange = useDebouncedCallback((newSearchValue: string) => {
    setSearchQuery(newSearchValue);
  }, 300);
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={onChange} />
        {/* Пагінація */}
        {/* Кнопка створення нотатки */}
      </header>
      {data && data.notes.length > 0 && (
        <NoteList onClick={onClickDelete} notes={data.notes} />
      )}
    </div>
  );
}

export default App;
