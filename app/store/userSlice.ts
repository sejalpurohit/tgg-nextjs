import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
 
  postcode: string;
  address1: string;
  address2: string;
  townCity: string;
  county: string;

  title: string;
  firstName: string;
  surname: string;
  dob: {
    dd: string;
    mm: string;
    yyyy: string;
  };

  mobile: string;
  email: string;
}

const initialState: UserState = {
  postcode: '',
  address1: '',
  address2: '',
  townCity: '',
  county: '',
  title: '',
  firstName: '',
  surname: '',
  dob: {
    dd: '',
    mm: '',
    yyyy: '',
  },
  mobile: '',
  email: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setPostcode: (state, action: PayloadAction<string>) => {
      state.postcode = action.payload;
    },
    setAddress1: (state, action: PayloadAction<string>) => {
      state.address1 = action.payload;
    },
    setAddress2: (state, action: PayloadAction<string>) => {
      state.address2 = action.payload;
    },
    setTownCity: (state, action: PayloadAction<string>) => {
      state.townCity = action.payload;
    },
    setCounty: (state, action: PayloadAction<string>) => {
      state.county = action.payload;
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setFirstName: (state, action: PayloadAction<string>) => {
      state.firstName = action.payload;
    },
    setSurname: (state, action: PayloadAction<string>) => {
      state.surname = action.payload;
    },
    setDob: (state, action: PayloadAction<{ dd: string; mm: string; yyyy: string }>) => {
      state.dob = action.payload;
    },
    setMobile: (state, action: PayloadAction<string>) => {
      state.mobile = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
  },
});

export const {
  setPostcode,
  setAddress1,
  setAddress2,
  setTownCity,
  setCounty,
  setTitle,
  setFirstName,
  setSurname,
  setDob,
  setMobile,
  setEmail,
} = userSlice.actions;

export default userSlice.reducer;
