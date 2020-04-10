import ACTIONS from '../constants';

const initialState = {
    mainScreenComponent: null,
    additionalScreenComponent: null,
}

function app(state = initialState, action) {
    switch (action.type) {
        case ACTIONS.RENDER_MAIN_SCREEN:
            return {
                ...state,
                mainScreenComponent: action.payload,
            }
        case ACTIONS.SHOW_ADDITIONAL_SCREEN:
            return {
                ...state,
                additionalScreenComponent: action.payload,
            };
        case ACTIONS.HIDE_ADDITIONAL_SCREEN:
            return {
                ...state,
                additionalScreenComponent: null,
            };
        default:
            return state;
    }
}

export default app;
