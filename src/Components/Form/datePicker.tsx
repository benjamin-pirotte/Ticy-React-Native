import React, { Component } from "react";
import { Platform, View, DatePickerAndroid, DatePickerIOS} from "react-native";


interface Props {
}

interface State {  

}

export default class datePicker extends Component<Props, State> {
    constructor(props : Props) {
        super(props)
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        let datePicker:any
        if(Platform.OS === 'ios') {
            datePicker = DatePickerIOS
        } else {
            datePicker = DatePickerAndroid
        }

        return (
            <View>
                {datePicker}
            </View>
        )
    }
} 
