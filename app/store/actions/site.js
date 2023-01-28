import { getApiResponse } from '../core/apiCaller';
import * as GlobalFunctions from '../../common/GlobalFunctions';

export const getData = (id = 0) => {
    return async () => {
        const data = new FormData();
		data.append('id', id);
        const response = await getApiResponse(data, 'sites');
        return response.data;
    };
};

export const postData = (formValues) => {
    return async () => {
        const data = new FormData();
        for (let fv in formValues) {
            data.append(fv.toString(), formValues[fv].toString());
        }
        await getApiResponse(data, 'sites/submit');
    };
};

export const deleteData = (id) => {
    return async () => {
        const data = new FormData();
        data.append('id', id);
        await getApiResponse(data, 'sites/remove');
    };
};

export const getCertificates = (vendor_site_id, certificate_id = 0) => {
    return async () => {
        const data = new FormData();
		data.append('vendor_site_id', vendor_site_id);
		data.append('certificate_id', certificate_id);
        const response = await getApiResponse(data, 'sites/getCertificates');
        return response.data;
    };
};

export const getLicenses = (vendor_site_id, license_id = 0) => {
    return async () => {
        const data = new FormData();
		data.append('vendor_site_id', vendor_site_id);
		data.append('license_id', license_id);
        const response = await getApiResponse(data, 'sites/getLicenses');
        return response.data;
    };
};

export const getDocs = (vendor_site_id, CorLId, CorLType) => {
    return async () => {
        const data = new FormData();
		data.append('vendor_site_id', vendor_site_id);
		data.append('CorLId', CorLId);
		data.append('CorLType', CorLType);
        const response = await getApiResponse(data, 'sites/getDocs');
        return response.data;
    };
};

export const submitDates = (formValues) => {
    return async () => {
        const data = new FormData();
		for (const fv in formValues) {
            data.append(fv.toString(), formValues[fv].toString());
        }
        const response = await getApiResponse(data, 'sites/submitDates');
        return response.data;
    };
};

export const submiDocs = (formValues) => {
    return async () => {
        const data = new FormData();
		for (const fv in formValues) {
            if (fv.toString().indexOf('file_name', 0) > -1) {    
                const fileInfo = await GlobalFunctions.getFileInfo(formValues[fv.toString()], false);
                data.append(fv.toString(), { uri: fileInfo.uri, name: 'File.' + fileInfo.extn, type: fileInfo.mime });
            } else {
                data.append(fv.toString(), formValues[fv].toString());
            }
        }

        const response = await getApiResponse(data, 'sites/submitDocs');
        return response.data;
    };
};

export const deleteDocs = (id, vendor_site_id, CorLId, CorLType) => {
    return async () => {
        const data = new FormData();
        data.append('id', id);
        data.append('vendor_site_id', vendor_site_id);
		data.append('CorLId', CorLId);
        data.append('CorLType', CorLType);
        const response = await getApiResponse(data, 'sites/removeDocs');
		return response.data;
    };
};



export const sendBookingEmail = (vendor_site_id) => {
    return async () => {
        const data = new FormData();
		data.append('vendor_site_id', vendor_site_id);
        const response = await getApiResponse(data, 'sites/sendBookingEmail');
        return response;
    };
};