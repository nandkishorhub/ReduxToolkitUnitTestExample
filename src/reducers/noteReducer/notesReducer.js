import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import remoteCall from "../../apis/api";

const initialState = [];

export const getNotes = createAsyncThunk("notes/getnotes", async () => {
  const inputData = {
    url: `/api/notes/fetchallnotes`,
    method: "GET",
  };
  return remoteCall(inputData);
});

export const addNotes = createAsyncThunk("notes/addnotes", async (note) => {
  const inputData = {
    url: `/api/notes/addnote`,
    method: "POST",
    body: note,
  };
  return remoteCall(inputData);
});

export const editNotes = createAsyncThunk("notes/editnotes", async (note) => {
  const inputData = {
    url: `/api/notes/updatenote/${note._id}`,
    method: "PUT",
    body: note,
  };
  return remoteCall(inputData);
});

export const deletNotes = createAsyncThunk("notes/deletenotes", async (id) => {
  const inputData = {
    url: `/api/notes/deletenote/${id}`,
    method: "DELETE",
  };
  let jsonData = await remoteCall(inputData);
  return { jsonData: jsonData, id: id };
});

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(getNotes.rejected, (state) => {
        console.log("Rejected getnotes");
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state = action.payload;
        return state;
      })
      .addCase(addNotes.rejected, (state, action) => {
        console.log("Rejected addNotes");
      })
      .addCase(addNotes.fulfilled, (state, action) => {
        console.log("Fullfilled addNotes");
        const updatedState = state.concat(action.payload);
        return updatedState;
      })
      .addCase(editNotes.rejected, (state, action) => {
        console.log("Rejected editnotes");
      })
      .addCase(editNotes.fulfilled, (state, action) => {
        console.log("Fullfilled editnotes");
        for (let index = 0; index < state.length; index++) {
          if (state[index]._id === action.payload._id) {
            state[index].title = action.payload.title;
            state[index].description = action.payload.description;
            state[index].tag = action.payload.tag;
            break;
          }
        }
        const updatedState = state;
        return updatedState;
      })
      .addCase(deletNotes.rejected, (state, action) => {
        console.log("Rejected deletenotes");
      })
      .addCase(deletNotes.fulfilled, (state, action) => {
        let updatedNotes = [];
        if (action.payload.jsonData.note._id === action.payload.id) {
          const filterNotes = state.filter(
            (note) => note._id !== action.payload.id
          );
          console.log("Deleted successfully");
          updatedNotes = filterNotes;
        } else {
          console.log("Delete failed ");
        }
        return updatedNotes;
      });
  },
});

export default notesSlice.reducer;