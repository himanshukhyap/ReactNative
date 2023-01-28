import axios from 'axios';

export const postapi = (url,postdata) => {

   axios.post(url, props.postdata)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });

    // axios.post('/user', {
    //     firstName: 'Fred',
    //     lastName: 'Flintstone'
    // })
    //     .then(function (response) {
    //         console.log(response);
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });

    // axios({
    //     method: 'post',
    //     url: props.url,
    //     data: props.data
    //   });
}