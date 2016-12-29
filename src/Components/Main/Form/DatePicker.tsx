import React, { Component } from "react";
import { Platform, View, TextInput, DatePickerAndroid, DatePickerIOS, Modal, StyleSheet} from "react-native";


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
}

export default class DatePicker extends Component<Props, State> {
    constructor(props : Props) {
        super(props)
        this.state = {
            datePickerVisible: false
        }
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    onDateChange = (date:Date) => {
        this.props.onDateChange(date)
    }

    openDatePicker(){
        let state = this.state
        state.datePickerVisible = true
        this.setState(state)
    }

    closeDatePicker(){
        console.log('test')
    }

    render() {
        let date = this.props.date.getDate() + '/' + this.props.date.getMonth() +  '/' + this.props.date.getFullYear()
        let time = this.props.date.getHours() + ':' + this.props.date.getMinutes()

        let dateTime
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
                    <Modal transparent={false} visible={this.state.datePickerVisible}
                    supportedOrientations={['portrait', 'landscape']} onRequestClose={this.closeDatePicker.bind(this)} onOrientationChange={this.closeDatePicker.bind(this)}>
                        <View style={styles.container}>
                            <View style={styles.innerContainer}>
                                <DatePickerIOS date={this.props.date} onDateChange={this.onDateChange.bind(this)} maximumDate={this.props.maximumDate}
                                minimumDate={this.props.minimumDate} mode={this.props.mode}/>
                            </View>
                        </View>
                    </Modal>
                }
            </View>
        )
    }
} 

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  innerContainer: {
    borderRadius: 10,
    alignItems: 'center',
  }
})