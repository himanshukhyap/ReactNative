import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';

import Colors from '../../constants/Colors';
import { ValidationType } from '../../constants/Enums';

const MyDateTimePickerDialog = props => {

    const [inputValue, setInputValue] = useState(props.initialValue);
    const [inputError, setInputError] = useState('');
    const [inputRef, setInputRef] = useState();
    
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDateTime, setSelectedDateTime] = useState(new Date());

    const setControlRef = ref => {
        setInputRef(ref);
        if (props.refs) {
            props.refs[props.name] = ref;
        }
    }

    useEffect(() => {
        if (props.initialValue != undefined && props.initialValue != '') {
            setInputValue(props.initialValue);
            props.value[props.name] = props.initialValue;
        }

        if ((props.mode == "date" || props.mode == "datetime") && inputValue) {
            setSelectedDateTime(new Date(inputValue));
        } else if (props.mode == "time" && inputValue) {
            setSelectedDateTime(new Date(2020, 1, 1, inputValue.split(':')[0], inputValue.split(':')[1], 0));
        } else {
            setSelectedDateTime(new Date());
        }

        if (props.submitting) {
            validateInput(inputValue);
        }
        if (props.resetting) {
            setInputValue('');
            props.value[props.name] = '';
        }
    }, [props])


    const validateInput = enteredText => {
        if (props.validationType == ValidationType.Required) {
            if (enteredText == '' || enteredText == undefined) {
                setInputError('This field is required');
                props.error[props.name] = 'This field is required';
            } else {
                setInputError('');
                props.error[props.name] = '';
            }
        }
    }


    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        hideDatePicker();
        let format = "";
        if(props.format){
            format = props.format;
        } else if (props.mode == "date") {
            format = "DD-MMM-YYYY";
        } else if (props.mode == "time") {
            format = "HH:mm";
        } else if (props.mode == "datetime") {
            format = "DD-MMM-YYYY HH:mm";
        }
        const strDate = moment(date).format(format);
        setInputValue(strDate);
        if (props.mode == "time") {
            setSelectedDateTime(new Date(2020, 1, 1, strDate.split(':')[0], strDate.split(':')[1], 0));
        } else {
            setSelectedDateTime(new Date(strDate));
        }
        props.value[props.name] = strDate;
        validateInput(strDate);

        if(props.onDateChange){
            props.onDateChange();
        }

    };

    return (
        <View style={styles.container}>
            <View style={{...styles.title_and_error, ...(props.noTopMargin ? styles.noTopMargin : styles.hasTopMargin)}}>
                <Text style={{ ...styles.label, ...(inputError == undefined || inputError == '' ? styles.labelValid : styles.labelInvalid) }}>
                    {props.label}
                </Text>
                <Text style={styles.errorMessage}>
                    {inputError}
                </Text>
            </View>
            <View style={{ ...styles.calendar, ...(inputError == undefined || inputError == '' ? styles.inputValid : styles.inputInvalid) }}
                onTouchEnd={showDatePicker}>
                <Text style={styles.dateText} ref={ref => setControlRef(ref)}>{inputValue}</Text>
                <Ionicons name="md-calendar" size={24} color={Colors.black} />
            </View>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode={props.mode.toLowerCase()}
                date={selectedDateTime}
                is24Hour={true}
                locale="en_GB"
				minimumDate={props.minimumDate ? props.minimumDate : undefined}
                cancelTextIOS="Cancel"
                confirmTextIOS="Done"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                headerTextIOS={"Select " + props.mode}
            />

        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },    
    title_and_error: {
        flexDirection: 'row',        
        justifyContent: 'space-between'
    },
    hasTopMargin:{
        marginTop: 15,
    },
    noTopMargin:{
        marginTop: 2,
    },
    label: {
        fontWeight: 'bold',
        fontFamily: 'Roboto_bold',
        fontSize: 15,
    },
    labelValid: {
        color: Colors.black2
    },
    labelInvalid: {
        color: Colors.red
    },
    errorMessage: {
        color: Colors.red,
    },
    inputValid: {
        borderColor: Colors.gray,
        borderWidth: 1
    },
    inputInvalid: {
        borderColor: Colors.red,
        borderWidth: 1
    },
    calendar: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: Colors.black,
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 4
    },
    dateText: {
        fontFamily: 'Roboto',
        fontSize: 15.5
    }
});

export default MyDateTimePickerDialog;