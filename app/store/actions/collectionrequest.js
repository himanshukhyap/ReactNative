import { getApiResponse } from '../core/apiCaller';

export const SET_COLLECTIONREQUEST_DATA = 'SET_COLLECTIONREQUEST_DATA';
export const SET_COLLECTIONREQUEST_LIST = 'SET_COLLECTIONREQUEST_LIST';

export const getData = (id = 0, vendor_id = 0, logistic_user_id = 0, assigned_to = 0, warehouse_manager_id = 0,
	state_id = 0, date_from = '', date_upto = '', request_status = 0, challan_status = 0) => {

	return async (dispatch, getState) => {

		const data = new FormData();
		data.append('id', id);
		data.append('request_by', vendor_id);
		data.append('logistic_user_id', logistic_user_id);
		data.append('assigned_to', assigned_to); //pda or self
		data.append('warehouse_manager_id', warehouse_manager_id);
		data.append('state_id', state_id);
		data.append('date_from', date_from);
		data.append('date_upto', date_upto);
		data.append('request_status', request_status);
		data.append('challan_status', challan_status);
		const response = await getApiResponse(data, 'collectionrequests');

		let dataList = [];
		let singleRecord = null;

		if (id > 0) {
			singleRecord = response.data.collectionrequests;
			dispatch({ type: SET_COLLECTIONREQUEST_DATA, record: singleRecord });
		} else {
			for (let i = 0; i < response.data.collectionrequests.length; i++) {
				dataList.push(response.data.collectionrequests[i]);
			}
			dispatch({ type: SET_COLLECTIONREQUEST_LIST, list: dataList });
		}

		return response.data.collectionrequests;
	};

};

export const generateChallan = (id, formValues) => {
	return async (dispatch, getState) => {
		const data = new FormData();
		data.append('id', id);
		for (let fv in formValues) {
			data.append(fv.toString(), formValues[fv].toString());
		}
		const response = await getApiResponse(data, 'collectionrequests/generateChallan');
		return response.data;
	};
}


export const getMultipleRequests = (ids = "") => {
	return async (dispatch, getState) => {
		const data = new FormData();
		data.append('ids', ids);
		const response = await getApiResponse(data, 'collectionrequests/getMultipleRequests');
		return response.data;
	};
};


export const postData = (formValues) => {
	return async () => {
		const data = new FormData();
		for (let fv in formValues) {
			if (fv.toString() == 'gate_pass') {
				let fileExtn = formValues['gate_pass'].split('.').pop();
				data.append('gate_pass', { uri: formValues['gate_pass'], name: 'Image.' + fileExtn, type: 'image/*' });
			} else {
				data.append(fv.toString(), formValues[fv].toString());
			}
		}
		await getApiResponse(data, 'collectionrequests/submit');
	};
};

export const submitMultiple = (formValues) => {
	return async () => {
		const data = new FormData();
		for (let fv in formValues) {
			data.append(fv.toString(), formValues[fv].toString());
		}
		await getApiResponse(data, 'collectionrequests/submitMultiple');
	};
};

export const updateData = (formValues) => {
	return async () => {
		const data = new FormData();

		for (let fv in formValues) {
			if (fv.toString() == 'gate_pass' && formValues['gate_pass'] != '') {
				let fileExtn = formValues['gate_pass'].split('.').pop();
				data.append('gate_pass', { uri: formValues['gate_pass'], name: 'Image.' + fileExtn, type: 'image/*' });
			} else {
				data.append(fv.toString(), formValues[fv].toString());
			}
		}

		await getApiResponse(data, 'collectionrequests/update');
	};
};

export const deleteData = (id) => {
	return async () => {
		const data = new FormData();
		data.append('id', id);
		await getApiResponse(data, 'collectionrequests/remove');
	};
};

export const generateInstantChallan = (formValues) => {
	return async () => {
		const data = new FormData();
		for (let fv in formValues) {
			data.append(fv.toString(), formValues[fv].toString());
		}
		await getApiResponse(data, 'InstantChallans/generate');
	};
};