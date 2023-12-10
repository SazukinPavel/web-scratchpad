import {createSlice} from '@reduxjs/toolkit'

const defaultDuration = 3000
const defaultSeverity = 'info'
const defaultPosition = {
    vertical: 'top', horizontal: 'right'
}

const initialState = {
    message: "",
    duration: defaultDuration,
    isOpen: false,
    severity: defaultSeverity,
    position: defaultPosition
}


const showSnackbarHelp = (state, payload) => {
    state.message = payload.message
    state.duration = payload.duration || defaultDuration
    state.severity = payload.severity || defaultSeverity
    state.position = payload.position || defaultPosition
    state.isOpen = true
}

export const snackbarSlice = createSlice({
    name: 'snackbar',
    initialState,
    reducers: {
        showSnackbar(state, action) {
            showSnackbarHelp(state, action.payload)
        },
        showErrorSnackbar(state, action) {
            showSnackbarHelp(state, {...action.payload, severity: 'error'})
        },
        showSuccessSnackbar(state, action) {
            showSnackbarHelp(state, {...action.payload, severity: 'success'})
        },
        closeSnackbar(state) {
            state.message = ''
            state.duration = defaultDuration
            state.isOpen = false
            state.severity = defaultSeverity
            state.position = defaultPosition
        }
    }
})

export const {showSnackbar, closeSnackbar, showErrorSnackbar, showSuccessSnackbar} = snackbarSlice.actions

export default snackbarSlice.reducer