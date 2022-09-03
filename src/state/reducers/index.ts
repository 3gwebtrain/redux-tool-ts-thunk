import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchPost = createAsyncThunk('fetch/post', async (params) => {
    try {
            const { data } = await axios.get('https://registry.npmjs.org/-/v1/search', { params: { text: params } })
            data.objects.map((result: any) => {
                return result.package.name; 
            });
        } catch (err: any) {
            return err?.response;
        }
})

interface RepositoriesState {
    loading: boolean;
    error: string | null;
    data: string[];
}


const initialRepoState:RepositoriesState = {
    loading: false,
    error: null,
    data:[]
}


const repositorySlice = createSlice({
    name: 'repo-slice',
    initialState: initialRepoState,
    reducers: {
        
    },
    extraReducers: {
        [fetchPost.pending]: (state: RepositoriesState) => {
            state.loading = true
        },
        [fetchPost.fulfilled]: (state: RepositoriesState, action) => {
            state.data = action.payload;
            state.loading = false;
        },
        [fetchPost.rejected]: (state: RepositoriesState, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export default repositorySlice.reducer;