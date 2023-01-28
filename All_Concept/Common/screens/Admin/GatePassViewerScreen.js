import React, { useState, useEffect } from 'react';
import { View } from 'react-native';

import MyImageViewer from '../../components/MyImageViewer';
import * as GlobalFunctions from '../../common/GlobalFunctions';
import GS from '../../common/GlobalStyles';
import Variables from '../../constants/Variables';

const GatePassViewerScreen = props => {

	const { params } = props.route;
	const [gatePassName, setGatePassName] = useState('');

	useEffect(() => {
		props.navigation.setOptions({ title: 'Gate Pass' });
		if (params && params.gate_pass) {
			setGatePassName(params.gate_pass);
		}
	}, [props]);

	return (
		<View style={GS.f1}>
			<MyImageViewer
				showLoader={true}
				imageUri={GlobalFunctions.getGatePassImageUri(gatePassName)}
				noImageUri={GlobalFunctions.getImageUri(Variables.NoGatePassAvailableUrl)}
			/>
		</View>
	)

}

export default GatePassViewerScreen;