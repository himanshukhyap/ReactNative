import axios from "axios";
import { GetDataAction } from "../../Store/Action/Action";

//used this way ..................................
// const [state, dispatch] = useReducer(Reducer, 0);
// console.log(state)
// return (
//   <ButtonCom ButtonText="Get data" onPress={() => getapi('https://dummyjson.com/products/1',dispatch)} />
// )
// .................
export const getapi =  (url,dispatch) => {
      axios.get(url)
        .then(function (response) {
            dispatch(GetDataAction(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });

    // axios.get('/user?ID=12345')
    //     .then(function (response) {
    //         console.log(response);
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });

    // // Optionally the request above could also be done as
    // axios.get('/user', {
    //     params: {
    //         ID: 12345
    //     }
    // })
    //     .then(function (response) {
    //         console.log(response);
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });

    //     axios.get('/user/12345')
    //   .then(function(response) {
    //     console.log(response.data);
    //     console.log(response.status);
    //     console.log(response.statusText);
    //     console.log(response.headers);
    //     console.log(response.config);
    // });

}