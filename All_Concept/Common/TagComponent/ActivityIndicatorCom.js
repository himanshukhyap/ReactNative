
import { screen, screen_height, screen_width } from './DimensionCom';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import Colors from './Colors';
export const ActivityIndicatorCom = (props) => {
    return (

        <Spinner
            visible={props.Isloading}
            cancelable={false}
            color={Colors.darkGreen}
            animation='none'
            overlayColor={Colors.gray}
            size={screen.scale * 15}
            textContent="Loading...."
            textStyle={{ color: Colors.white }}
            
        />
    )
}
