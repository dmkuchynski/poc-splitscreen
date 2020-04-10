import ACTIONS from '../constants';

export function renderMainScreen(component) {
    return {
        type: ACTIONS.RENDER_MAIN_SCREEN,
        payload: component,
    }
}

export function showAdditionalScreen(component) {
    return {
        type: ACTIONS.SHOW_ADDITIONAL_SCREEN,
        payload: component,
    }
}

export function hideAdditionalScreen() {
    return {
        type: ACTIONS.HIDE_ADDITIONAL_SCREEN,
    }
}
