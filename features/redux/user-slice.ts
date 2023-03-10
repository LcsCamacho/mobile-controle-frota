import { createSlice } from "@reduxjs/toolkit";

interface userSlice {
    user: null | {
        token: string;
        name: string;
        management: string;
    }
}

const initialState:userSlice = {
    user: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        }
    }
});

export const { login } = userSlice.actions;

export default userSlice.reducer;