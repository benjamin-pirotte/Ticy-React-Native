import React, { Component } from "react";
import { Platform, View, TextInput, DatePickerAndroid, DatePickerIOS, Modal, StyleSheet, ViewStyle, TouchableHighlight, Text} from "react-native";


interface Props {
    date: Date
    maximumDate?: Date
    minimumDate?: Date,
    minuteInterval?: 1 | 5 | 10 | 15 | 20 | 30 
    mode?: 'date' | 'time' | 'datetime'
    onDateChange: Function
}

interface State {  
    datePickerVisible: boolean,
    currentOrientation: string
}

export default class DatePicker extends Component<Props, State> {
    constructor(props : Props) {
        super(props)
        this.state = {
            datePickerVisible: false,
            currentOrientation: 'unknown'
        }
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    onDateChange = (date:Date) => {
        this.props.onDateChange(date)
    }

    openDatePicker() {
        let state = this.state
        state.datePickerVisible = true
        this.setState(state)
    }

    closeDatePicker() {
        let state = this.state
        state.datePickerVisible = false
        this.setState(state)
    }

    onOrientationchange(event:any) {
       let state = this.state
       state.currentOrientation =  event.nativeEvent.orientation
       this.setState(state)
    }
    
    render() {
        let date = this.props.date.getDate() + '/' + this.props.date.getMonth() +  '/' + this.props.date.getFullYear()
        let time = this.props.date.getHours() + ':' + this.props.date.getMinutes()

        let dateTime:string
        switch(this.props.mode) {
            case 'time':
                dateTime = time
                break;
            case 'datetime':
                dateTime = date + ' ' + time
                break;
            default:
                dateTime = date
        }


        return (
            <View>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    value={dateTime}
                    onFocus={() => this.openDatePicker()}
                />
                {Platform.OS && 
                    <Modal transparent={true} visible={this.state.datePickerVisible}
                    supportedOrientations={['portrait', 'landscape']} onOrientationChange={this.onOrientationchange.bind(this)}>
                        <View style={styles.container}>
                            <View style={styles.innerContainer}>
                                <DatePickerIOS date={this.props.date} onDateChange={this.onDateChange.bind(this)} maximumDate={this.props.maximumDate}
                                minimumDate={this.props.minimumDate} mode={this.props.mode}/>
                                <TouchableHighlight onPress={this.closeDatePicker.bind(this)}>
                                    <Text>Close</Text>
                                </TouchableHighlight>
                            </View>
                        </View>

                    </Modal>
                }
            </View>
        )
    }
} 


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  } as ViewStyle,
  innerContainer: {
    borderRadius: 10,
    backgroundColor: 'white', 
    padding: 20
  } as ViewStyle
})