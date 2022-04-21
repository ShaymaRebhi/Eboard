import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const RetrieveThemes = createAsyncThunk("/theme", async () => {
  const { data } = await axios.get(
    "http://localhost:3000/theme"
  );

  return data;
});

export const AddTheme = createAsyncThunk(
  "theme/AddTheme",
  async (theme) => {
    const promise = await axios
      .post("http://localhost:3000/theme", theme)

      .then((response) => {
        console.log("this is response");
        console.log(response);
        console.log("this is data");
        console.log(response.data);
        //console.log(response);
        const data = response.data;

        // assign data
        return data;
      });

    const data = await promise;
    return data;
  }
);

export const GetThemeById = createAsyncThunk(
  "theme/GetThemeById",
  async (themeId) => {
    const promise = await axios
      .get("http://localhost:3000/theme/" + themeId)

      .then((response) => {
        console.log("this is response");
        console.log(response);
        console.log("this is data");
        console.log(response.data);
        //console.log(response);
        const data = response.data;

        // assign data
        return data;
      });

    const data = await promise;
    return data;
  }
);

export const GetThemeByIdClass = createAsyncThunk(
  "theme/GetThemeByIdClass",
  async (idClass) => {
    const promise = await axios
      .get(
        "http://localhost:3000/theme/findByIdClass/" + idClass
      )

      .then((response) => {
        console.log("this is response");
        console.log(response);
        console.log("this is data");
        console.log(response.data);
        //console.log(response);
        const data = response.data;

        // assign data
        return data;
      });

    const data = await promise;
    return data;
  }
);

export const EditTheme = createAsyncThunk(
  "theme/EditTeme",
  async (theme) => {
   

    const promise = await axios
      .put("http://localhost:3000/theme/" + theme._id, theme)

      .then((response) => {
        console.log("this is response");
        console.log(response);
        console.log("this is data");
        console.log(response.data);
        //console.log(response);
        const data = response.data;

        // assign data
        return data;
      });

    const data = await promise;
    return data;
  }
);

export const DeleteTheme = createAsyncThunk(
  "Theme/DeleteTheme",

  async (themeId) => {
    const promise = await axios
      .delete("http://localhost:3000/theme/" + themeId)

      .then((response) => {
        console.log("this is response");
        console.log(response);
        console.log("this is data");
        console.log(response.data);
        //console.log(response);
        const data = response.data;

        // assign data
        return data;
      });

    const data = await promise;
    return data;
  }
);

export const ThemeSlice = createSlice({
  name: "Theme",
  initialState: {
    theme: [],
    status: null,
    statusUpdate: null,
    themeById: null,
  },
  extraReducers: {
    [RetrieveThemes.pending]: (state, action) => {
      state.status = "loading";
    },
    [RetrieveThemes.fulfilled]: (state, { payload }) => {
      state.theme = payload;
      state.status = "success";
    },
    [RetrieveThemes.rejected]: (state, action) => {
      state.status = "failed";
    },
    [AddTheme.fulfilled]: (state, action) => {
      state.theme.push(action.payload.result);
    },
    [GetThemeById.fulfilled]: (state, action) => {
      state.themeById = action.payload;
    },
    [GetThemeByIdClass.fulfilled]: (state, action) => {
      state.theme = action.payload;
    },
    [DeleteTheme.fulfilled]: (state, action) => {
      state.theme = state.theme.filter((u) => {
        return u._id !== action.payload.result._id;
      });
    },
    [EditTheme.fulfilled]: (state, action) => {
      state.statusUpdate = "success";
      let theme = action.payload.result;
      let themes = state.theme.slice();
      for (let i = 0, n = themes.length; i < n; i++) {
        if (themes[i]._id === theme._id) {
          themes[i].idCour = theme.idCour;
          themes[i].titre = theme.titre;
          themes[i].description = theme.description;

          break; // Stop this loop, we found it!
        }
      }
      state.theme = themes;
    },

    
  },
});

export default ThemeSlice.reducer;
