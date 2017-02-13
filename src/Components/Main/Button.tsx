import React from "react"
import {View, ViewStyle, TextStyle} from "react-native"
import {MKButton, MKButtonBuilder} from "react-native-material-kit"

//Interface
interface Props {
    onPress:Function
    text: string
    preset?:
    "plainButton" | "coloredButton" | 
    "accentColoredButton" | "flatButton" | 
    "coloredFlatButton" | "accentColoredFlatButton" |
    "plainFab" | "coloredFab" | "accentColoredFab"
    style?:ViewStyle
    styleText?:TextStyle
}
 
//Component
export default (props:Props) => {
    let Builder:MKButtonBuilder

    switch (props.preset) {
        case "coloredButton":
            Builder = MKButton.coloredButton()
            break;
        case "accentColoredButton":
            Builder = MKButton.accentColoredButton()
            break;
        case "flatButton":
            Builder = MKButton.flatButton()
            break;
        case "coloredFlatButton":
            Builder = MKButton.coloredFlatButton()
            break;
        case "accentColoredFlatButton":
            Builder = MKButton.accentColoredFlatButton()
            break;
        case "plainFab":
            Builder = MKButton.plainFab()
            break;
        case "coloredFab":
            Builder = MKButton.coloredFab()
            break;
        case "accentColoredFab":
            Builder = MKButton.accentColoredFab()
            break;
        default:
            Builder = MKButton.button()
            break;
    }
    
    let Button = Builder.withText(props.text.toUpperCase())
                        .withStyle(props.style)
                        .withTextStyle(Object.assign({}, {color:'white'}, props.styleText))
                        .build()    
    return (
        <Button onPress={() => props.onPress()}/>
    )
} 

