import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
    },

    reducers: {
        addUser: (state, action) => {
            return action.payload;
        },
        removeUser: (state, action) => {
            return null;
        },
        login: (state, action) => {
            state.user = action.payload;
        } 
    }

});

export const { login, addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;