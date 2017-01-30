import React, { Component } from "react"
import {View, ViewStyle, TextStyle} from "react-native"
import {MKButton, MKButtonBuilder} from "react-native-material-kit"

//Interface
interface Props {
    onPress:Function
    text: string
    style?:
    "plainButton" | "coloredButton" | 
    "accentColoredButton" | "flatButton" | 
    "coloredFlatButton" | "accentColoredFlatButton" |
    "plainFab" | "coloredFab" | "accentColoredFab"
    customStyle?:ViewStyle
    customStyleText?:TextStyle
}

interface State {  
}

//Component
export default class Button extends Component<Props, State> {
    constructor(props : Props) {
        super(props)
    }

    render() {
        let Builder:MKButtonBuilder

        switch (this.props.style) {
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
        
        let Button = Builder.withText(this.props.text.toUpperCase())
                            .withStyle(this.props.customStyle)
                            .withTextStyle(this.props.customStyleText)
                            .build()       

        return (
            <Button onPress={() => this.props.onPress()}/>
        )
    }
} 

