import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Dog = {
  _id: string;
  name: string;
  age: number;
  breed: string;
  color: string;
  image: string;
};

interface DogsState {
  dogs: Dog[];
  dog: Dog | null; 
  loading: boolean;
  error: string | null;
}

const initialState: DogsState = {
  dogs: [],
  dog: null,
  loading: false,
  error: null,
};

const dogsSlice = createSlice({
  name: 'dogs',
  initialState,
  reducers: {
    setDogs(state, action: PayloadAction<Dog[]>) {
      state.dogs = action.payload;
    },
    setDog(state, action: PayloadAction<Dog>) {
      state.dog = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setDogs, setDog, setLoading, setError } = dogsSlice.actions;
export default dogsSlice.reducer;
