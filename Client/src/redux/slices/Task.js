import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const AddTask = (
    Title,
    Theme,
    Description,
    QuestionFile,
    status,
    listStudents,
    Class,
    Creator
) => async (dispatch) => {
    console.log(QuestionFile);
    var formData = new FormData();
    for (const key of Object.keys(QuestionFile)) {
        formData.append("QuestionFile", QuestionFile[key]);
    }
    formData.append("Title", Title);

    formData.append("Description", Description);
    if (Theme !== "") {
        formData.append("Theme", Theme);
    }
    formData.append("status",status)
    formData.append("listStudents", listStudents);
    formData.append("Creator", Creator);
    formData.append("Class", Class);

    const promise = await axios
        .post("http://localhost:3000/task/add", formData)
        .then((response) => {
            const CurrentClass = JSON.parse(localStorage.getItem("idClass"));
            console.log(CurrentClass._id);
            const data = response.data;

            // assign data
            return data;
        })
        .catch((error) => {
            console.log(error);
        });
    const data = promise;
    console.log("this is data");
    console.log(data);
    return data;
};

/*TaskStatus : "Worked",
    TaskCorrected : "Not Corrected",
    TaskResponseFile : req.body.TaskResponseFile*/
export const UpdateEvaluation = (
    evaluationId,
    TaskStatus,
    TaskCorrected,
    ResourcesResponse
) => async (dispatch) => {
    const evaluation = {
        TaskStatus : "Worked",
        TaskCorrected : "Not Corrected",
        TaskResponseFile : ResourcesResponse
    };
    console.log("this is evaluation");
    console.log(evaluation);

    const promise = await axios
        .put("http://localhost:3000/task/updateEvaluationStatus/" + evaluationId, evaluation)
        .then((response) => {
            const data = response.data;

            // assign data
            return data;
        })
        .catch((error) => {
            console.log(error);
        });
    const data = promise;
    console.log("this is data");
    console.log(data);
    return data;
};
export const UpdateResources = createAsyncThunk(
    "Evaluation/UpdateResources",

    async (resources) => {
        //CoursesSlice.state.Resources.push(resources);
        console.log(resources);
        return resources;
    }
);
export const DeleteResources = createAsyncThunk(
    "Evaluation/DeleteResources",

    async (index) => {
        return index;
    }
);


export const TaskSlice = createSlice({
    name:"Task",
    initialState: {
        task: [],
        status: null,
        statusUpdate: null,
        Resources: [],
        ResourcesResponse:[]
    },
    extraReducers: {
        [UpdateResources.fulfilled]: (state, action) => {
            //state.Resources.push(action.payload);

            state.ResourcesResponse.push(action.payload);
        },
        [DeleteResources.fulfilled]: (state, action) => {
            //state.Resources.splice(action.payload, 1);
            let res = action.payload;
            let resourcesResponse = state.ResourcesResponse.slice();
            resourcesResponse = resourcesResponse.filter((u) => {
                return u.url !== res;
            });
            state.ResourcesResponse = resourcesResponse;
        },
        AddTask: (state, action) => {
            state.task.push(action.payload.result);
        },

        UpdateEvaluation: (state, action) => {
            let evaluation = action.payload.result;

            for (let i = 0, n = state.evaluations.length; i < n; i++) {
                if (state.evaluations[i]._id === evaluation._id) {
                    state.evaluations[i].TaskStatus = evaluation.TaskStatus;
                    state.evaluations[i].TaskCorrected = evaluation.TaskCorrected;
                    state.evaluations[i].TaskResponseFile = evaluation.TaskResponseFile;

                    break; // Stop this loop, we found it!
                }
            }
        },
    }
});

export default TaskSlice.reducer;