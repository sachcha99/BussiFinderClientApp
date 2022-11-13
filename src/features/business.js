import { createSlice } from '@reduxjs/toolkit'

export const businessSlice = createSlice({
    name: "business",
    initialState: {
        value: []
    },
    reducers: {
        addBusiness: (state, action) => {
            // state.value.push(action.payload)
            console.log("sssssssssssssssssss", action.payload)
            state.value[0] = action.payload
        },
        addNewBusiness: (state, action) => {
            let temp = []

            for (let i = 0; i < state.value.length; i++) {
                if (i == 0) {
                    temp.push("")
                }
                temp.push(state.value[i])
            }
            // state.value.push(action.payload)
            console.log("temppppppppppppppppppppppppppppppppppppppppppp", temp)
            state.value = temp;
            state.value[0] = action.payload
        },
        compareBusiness: (state, action) => {
            // console.log("action.payload", action.payload)
            // state.value[action.payload.length] = state.value[0]
            // state.value[0] = null
            let temp = []

            for (let i = 0; i < state.value.length; i++) {
                if (i == 0) {
                    temp.push("")
                }
                temp.push(state.value[i])
            }
            // state.value.push(action.payload)
            // console.log("temppppppppppppppppppppppppppppppppppppppppppp", temp)
            state.value = temp;
            state.value[0] = action.payload
        },
    }
});
export const { addBusiness: addBusiness, compareBusiness: compareBusiness, addNewBusiness: addNewBusiness } = businessSlice.actions;
export default businessSlice.reducer;