import { type ChangeEvent } from "react";
import css from "./SearchBox.module.css";
import type { DebouncedState } from "use-debounce";

interface SearchBoxProps {
  onChange: DebouncedState<(newSearchValue: string) => void>;
}
export default function SearchBox({ onChange }: SearchBoxProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      onChange={handleChange}
    />
  );
}
