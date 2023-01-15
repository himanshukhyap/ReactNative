import { LOGIN } from '../actions/login';

const initialState = {
    UserId: 0,
    UserType: 0,
    Name: '',
    Email: '',
    Mobile: '',
    VendorId: 0,
    SeeSignups: 0
};

export default (state = initialState, action) => {
    if (action.type == LOGIN) {
        return {
            ...state,
            UserId: action.UserId,
            UserType: action.UserType,
            Name: action.Name,
            Email: action.Email,
            Mobile: action.Mobile,
            VendorId: action.VendorId,
            SeeSignups: action.SeeSignups
        }
    }
    return state;
};