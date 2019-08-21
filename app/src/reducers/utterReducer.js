export default (state, action) => {
    switch (action.type) {
        case "CREATE_NEW_UTTER":
            return { ...state, current_utter: { ...action.new_utter }, old_utter: { ...action.new_utter } }

        case "SET_UTTER_NAME":
            return {
                ...state,
                helper_text: action.helper_text,
                current_utter: {
                    ...state.current_utter,
                    nameUtter: action.utter_name
                }
            };

        case "SET_UTTER_TEXT":
            let new_utters_text = [...state.current_utter.utters];
            new_utters_text[action.utter_position].utterText[action.text_position].text = action.text

            return {
                ...state,
                current_utter: {
                    ...state.current_utter,
                    utters: [...new_utters_text]
                }
            };

        case "ADD_UTTER_TEXT":
            let new_utters = [...state.current_utter.utters];
            new_utters.push(action.text);

            return {
                ...state,
                old_utter_texts: [...state.current_utter.utters],
                current_utter: {
                    ...state.current_utter,
                    utters: [...new_utters]
                }
            };

        case "REMOVE_UTTER_TEXT":
            let utters_text = [...state.current_utter.utters];
            let old_utter_history = [...utters_text];

            if (utters_text.length !== 1) {
                utters_text.splice(action.text_position, 1);
            }

            return {
                ...state,
                old_utter_texts: old_utter_history,
                current_utter: {
                    ...state.current_utter,
                    utters: utters_text
                }
            };

        case 'UNDO_TEXT_REMOVAL':
            return {
                ...state,
                current_utter: {
                    ...state.current_utter,
                    utters: [...state.old_utter_texts]
                }
            }

        case "SUCESS_ACTION_UTTER":
            return { ...state, text: action.text };

        case "GET_UTTERS":
            return { ...state, utters: [...action.utters], filtered_utters: [...action.utters] };

        case "SELECT_ITEM": {
            let utter_selected = state.utters.find((utter) => utter._id === action.utter_id);
            
            let utters_text = [...utter_selected.utters.map((utter) => {
                return {
                    ...utter,
                    utterText: utter.utterText.map((utter_text) => {
                        return { ...utter_text }
                    })
                }
            })]

            return {
                ...state,
                utter_submit_button_enable: false,
                current_utter: { ...utter_selected },
                old_utter: { ...utter_selected, utters: utters_text },
                button_background_color:(action.button_background_color)
            };
        }

        case "IS_ENABLE_BUTTON": {
            let is_text_changed = (JSON.stringify(state.current_utter) !== JSON.stringify(state.old_utter));
            let color="red"
            if(action.utter_submit_button && is_text_changed){
                color = "secondary"
            }
            return {
                ...state,
                utter_submit_button_enable: (action.utter_submit_button && is_text_changed),
                button_background_color: color
            }
        }

        case "SAVE_DATA":
            return {
                ...state,
                helper_text: action.helper_text
            }

        default:
            return state;
    }
};
