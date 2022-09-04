import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const fetchPost = createAsyncThunk('fetch/post', async (params: string) => {
    try {
            const { data } = await axios.get('https://registry.npmjs.org/-/v1/search', { params: { text: params } })
            return data.objects.map((result: any) => {
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
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchPost.pending, (state) => {
            state.loading = true
        })
        .addCase(fetchPost.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        })
        .addCase(fetchPost.rejected, (state) => {
            state.loading = false;
            state.error = "error in api";
            state.data = [];
        })
    }
})
export { fetchPost };
export default repositorySlice.reducer;