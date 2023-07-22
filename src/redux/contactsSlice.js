import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchContacts = createAsyncThunk('contacts/fetchContacts', async () => {
  const response = await fetch('https://64bb9b397b33a35a444682bc.mockapi.io/contacts/contacts');
  const data = await response.json();
  return data;
});

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    filter: '',
    isContactsLoaded: false,
    loadedContactIds: [],
  },
  reducers: {
    addContact: (state, action) => {
      state.contacts.push(action.payload);
    },
    deleteContact: (state, action) => {
      state.contacts = state.contacts.filter((contact) => contact.id !== action.payload);
    },
    updateFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        action.payload.forEach((contact) => {
          if (!state.loadedContactIds.includes(contact.id)) {
            state.contacts.push(contact);
            state.loadedContactIds.push(contact.id);
          }
        });
        state.isContactsLoaded = true;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
      });
  },
});

export const { addContact, deleteContact, updateFilter } = contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;
