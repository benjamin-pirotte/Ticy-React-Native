import React from "react"
import {View, ViewStyle, TextStyle} from "react-native"
import {MKTextField, MKTextFieldBuilder, MKTextFieldProps} from "react-native-material-kit"

//Interface
interface Props extends MKTextFieldProps {}

//Component
export default (props:Props) => {
        let style:ViewStyle = {}

        if(props.floatingLabelEnabled) {
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
        
        style = Object.assign({}, style, props.style)

        return ( 
            <View>
                <MKTextField
                    placeholder={props.placeholder ? props.placeholder : null}
                    defaultValue={props.defaultValue}
                    password={props.password}
                    keyboardType={props.keyboardType ? props.keyboardType : 'default'}
                    onTextChange={(value) => props.onTextChange(value)}
                    onBlur={props.onBlur ? () => props.onBlur() : null}
                    onFocus={props.onFocus ? () => props.onFocus() : null}
                    onKeyPress={props.onKeyPress ? (value) => props.onKeyPress(value) : null}
                    floatingLabelEnabled={props.floatingLabelEnabled}
                    style={style}
                    floatingLabelFont={props.floatingLabelFont}
                    textInputStyle={{flex: 1}}
                />
            </View>
        )
} 

