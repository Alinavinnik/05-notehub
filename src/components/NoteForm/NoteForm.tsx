import { useId } from "react";
import css from "./NoteForm.module.css";
import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from "formik";
import type { NoteTag, TypeTag } from "../../types/note";
import * as Yup from "yup";

const Schema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(3, "must be at least 3 characters long")
    .max(50, "Title is too long"),
  content: Yup.string().max(500, "Content is too long"),
  tag: Yup.string<TypeTag>().required().required("Tag is required"),
});

const initialValues: NoteTag = {
  title: "",
  content: "",
  tag: "Todo",
};

interface NoteFormProps {
  closeModal: () => void;
  onCreateNote: (note: NoteTag) => void;
  isDisable: boolean;
}

export default function NoteForm({
  closeModal,
  onCreateNote,
  isDisable,
}: NoteFormProps) {
  const fieldId = useId();

  const handleSubmit = (values: NoteTag, actions: FormikHelpers<NoteTag>) => {
    onCreateNote(values);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={Schema}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-title`}>Title</label>
          <Field
            id={`${fieldId}-title`}
            type="text"
            name="title"
            className={css.input}
          />
          <ErrorMessage name="title">
            {(msg) => <span className={css.error}>{msg}</span>}
          </ErrorMessage>
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-content`}>Content</label>
          <Field
            as="textarea"
            id={`${fieldId}-content`}
            name="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage name="content">
            {(msg) => <span className={css.error}>{msg}</span>}
          </ErrorMessage>
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-tag`}>Tag</label>
          <Field
            as="select"
            id={`${fieldId}-tag`}
            name="tag"
            className={css.select}
          >
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag">
            {(msg) => <span className={css.error}>{msg}</span>}
          </ErrorMessage>
        </div>

        <div className={css.actions}>
          <button
            type="button"
            className={css.cancelButton}
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={css.submitButton}
            disabled={isDisable}
          >
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
}
