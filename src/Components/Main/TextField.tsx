import React, { Component } from "react"
import {View, ViewStyle, TextStyle} from "react-native"
import {MKTextField, MKTextFieldBuilder, MKTextFieldProps} from "react-native-material-kit"

//Interface
interface Props extends MKTextFieldProps {}

interface State {}

//Component
export default class TextField extends Component<Props, State> {
    
    constructor(props : Props) {
        super(props)
    }

    render() {
        let style:ViewStyle = {}

        if(this.props.floatingLabelEnabled) {
            style = {
                height: 48,
                marginTop: 10
            }                
        } else {
            style = {
                height: 28,
                marginTop: 32
            }   
        }
        
        style = Object.assign({}, style, this.props.style)

        return (
            <View>
            <MKTextField
                placeholder={this.props.placeholder ? this.props.placeholder : null}
                defaultValue={this.props.defaultValue}
                password={this.props.password}
                keyboardType={this.props.keyboardType ? this.props.keyboardType : 'default'}
                onTextChange={(value) => this.props.onTextChange(value)}
                onBlur={this.props.onBlur ? () => this.props.onBlur() : null}
                onFocus={this.props.onFocus ? () => this.props.onFocus() : null}
                onKeyPress={this.props.onKeyPress ? (value) => this.props.onKeyPress(value) : null}
                floatingLabelEnabled={this.props.floatingLabelEnabled}
                style={style}
                floatingLabelFont={this.props.floatingLabelFont}
                textInputStyle={{flex: 1}}
            />
            </View>
        )
    }
} 

