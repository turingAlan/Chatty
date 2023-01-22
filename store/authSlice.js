import { createSlice } from "@reduxjs/toolkit"
 const AuthSlice = createSlice({
    name:"auth",
    initialState:{
        token:null,
        userData:null,
        didTryToLogin:false
    },
    reducers:{
        authenticate:(state,action)=>{
            const {payload} = action
            state.token = payload.token
            state.userData = payload.userData

        },
        setDidtryAutoLogin:(state,action)=>{
            state.didTryToLogin = true
        },
        logout: (state, action) => {
            state.token = null;
            state.userData = null;
            state.didTryToLogin = false;
        }
    }
    
})
export const authenticate = AuthSlice.actions.authenticate
export const setDidTryToLogin = AuthSlice.actions.setDidtryAutoLogin
export const logout = AuthSlice.actions.logout;


export default AuthSlice.reducer