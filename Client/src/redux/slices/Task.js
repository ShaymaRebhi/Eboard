import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const AddTask = (
    Title,
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
    formData.append("status",status)
    for (const key of Object.keys(listStudents)) {
        formData.append("listStudents", listStudents[key]);
    }
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
export const UpdateTask = (
    taskId,
    Title,
    Description,
    ResourcesQuestionFile
) => async (dispatch) => {
    const task = {
        Title : Title,
        Description : Description,
        QuestionFile : ResourcesQuestionFile
    };
    console.log("this is task");
    console.log(task);

    const promise = await axios
        .put("http://localhost:3000/task/updateQuestionTask/" + taskId, task)
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
export const UpdateResourcesQuestionFile = createAsyncThunk(
    "task/UpdateResourcesQuestionFile",

    async (resources) => {
        //CoursesSlice.state.Resources.push(resources);
        console.log(resources);
        return resources;
    }
);
export const DeleteResourcesQuestionFile = createAsyncThunk(
    "task/DeleteResourcesQuestionFile",

    async (index) => {
        return index;
    }
);

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
        [UpdateResourcesQuestionFile.fulfilled]: (state, action) => {
            //state.Resources.push(action.payload);

            state.ResourcesQuestionFile.push(action.payload);
        },
        [DeleteResourcesQuestionFile.fulfilled]: (state, action) => {
            //state.Resources.splice(action.payload, 1);
            let res = action.payload;
            let resourcesResponse = state.ResourcesResponse.slice();
            resourcesResponse = resourcesResponse.filter((u) => {
                return u.url !== res;
            });
            state.ResourcesQuestionFile = resourcesResponse;
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
        UpdateTask: (state, action) => {
            let task = action.payload.result;

            for (let i = 0, n = state.task.length; i < n; i++) {
                if (state.task[i]._id === task._id) {
                    state.task[i].Title = task.Title;
                    state.task[i].Description = task.Description;
                    state.task[i].QuestionFile = task.QuestionFile;

                    break; // Stop this loop, we found it!
                }
            }
        },
    }
});

export default TaskSlice.reducer;