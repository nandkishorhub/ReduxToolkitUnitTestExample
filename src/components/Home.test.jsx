import { expect, vi } from "vitest";
import { findByText, screen } from "../test-utils/testing-lib-utils";
import Home from "./Home";
import App from "../App";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../test-utils/testing-lib-utils";

// eslint-disable-next-line no-undef
test("Notes rendered successfully", async () => {
  renderWithProviders(<App showAlert={vi.fn()} />);
  const loginPage = screen.getByRole("heading", {
    name: /Login to Continue/i,
  });
  // check landing correctly on login page
  expect(loginPage).toBeInTheDocument();
  const loginEmailIn = screen.getByRole("textbox", {
    name: /Email address/i,
  });
  await userEvent.type(loginEmailIn, "sample@gmail.com");
  const loginPass = screen.getByTestId("loginPassword");
  await userEvent.type(loginPass, "12345");

  const loginSubmit = screen.getByTestId("loginSubmit");
  await userEvent.click(loginSubmit);

  const title = await screen.findByRole("heading", {
    name: /Learn React course with Redux/i,
  });

  const description = await screen.findByText(
    "React works excellent with redux for efficient state mangement"
  );

  expect(title).toBeInTheDocument();
  expect(description).toBeInTheDocument();
});

// eslint-disable-next-line no-undef
test("validate input areas for create new note", async () => {
  // here I have tested for only Title inputbox due to time crunch
  // other two input box yet to be tested- pending
  renderWithProviders(<App showAlert={vi.fn()} />);
  const titleBox = screen.getByRole("textbox", {
    name: /Title/i,
  });
  await userEvent.type(titleBox, "xyz");
  expect(titleBox).toHaveValue("xyz");
  const validationErrEl = screen.getByText("Must be mininum 5 character long");
  expect(validationErrEl).toBeInTheDocument();
});

// eslint-disable-next-line no-undef
test("Add new note", async () => {
  renderWithProviders(<App showAlert={vi.fn()} />);
  const titleBox = screen.getByRole("textbox", {
    name: /Title/i,
  });
  const decripBox = screen.getByRole("textbox", {
    name: /Description/i,
  });
  const tagBox = screen.getByRole("textbox", {
    name: /Tag/i,
  });

  //assert the entred values to creating new note
  await userEvent.type(titleBox, "Namobudhay");
  expect(titleBox).toHaveValue("Namobudhay");
  await userEvent.type(decripBox, "budha is logical symbol");
  expect(decripBox).toHaveValue("budha is logical symbol");
  await userEvent.type(tagBox, "om");
  expect(tagBox).toHaveValue("om");

  // after adding text in above all textboxes make sure add note button
  // should be enabled
  const addNoteBtn = screen.getByRole("button", {
    name: /Add Note/i,
  });
  expect(addNoteBtn).not.toBeDisabled();
  await userEvent.click(addNoteBtn);

  const title = await screen.findByRole("heading", {
    name: /Namobudhay/i,
  });

  const description = await screen.findByText("budha is logical symbol");

  expect(title).toBeInTheDocument();
  expect(description).toBeInTheDocument();

  // Delete above added note
  const deleteBtn = screen.getByTestId("om");
  await userEvent.click(deleteBtn);
  const descriptionAfterDel = screen.queryByText("budha is logical symbol");
  expect(descriptionAfterDel).not.toBeInTheDocument();
});

// eslint-disable-next-line no-undef
test("Edit note", async () => {
  renderWithProviders(<App showAlert={vi.fn()} />);
  const randomNote = await screen.findByText("Save Soil");
  expect(randomNote).toBeInTheDocument();

  const getEditBtn = screen.getByTestId("SaveSoiledit");
  await userEvent.click(getEditBtn);

  const inputTitle = screen.getByLabelText("Title Update");
  console.log("InputEidit", inputTitle);
  expect(inputTitle).toHaveValue("Save Soil");

  await userEvent.clear(inputTitle);
  await userEvent.type(inputTitle, "water tank");
  expect(inputTitle).toHaveValue("water tank");
  //here we didn't use getByRole because this button's parent div has
  // aria-hidden=true so it would not be accessible by getByRole
  const saveEditedChanges = screen.getByText("Save Changes");
  await userEvent.click(saveEditedChanges);

  const titleUpdate = await screen.findByText("water tank");
  expect(titleUpdate).toBeInTheDocument();
});
