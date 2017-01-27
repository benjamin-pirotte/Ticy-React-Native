import ReactNative = __React;

declare namespace __MK {
    // Theme Components style interfaces
    interface ProgressStyle {
        backgroundColor?: string
        progressColor?: string
        bufferColor?: string
    }

    interface SpinnerStyle {
        strokeColor?: Array<string>
    }

    interface SliderStyle {
        lowerTrackColor?: string
        upperTrackColor?: string
    }

    interface IconToggleStyle {
        onColor?: string
        offColor?: string
        rippleColor?: string
    }

    interface SwitchStyle {
        onColor?: string
        offColor?: string
        thumbOnColor?: string
        thumbOffColor?: string
        rippleColor?: string
    }

    interface RadioStyle {
        borderOnColor?: string
        borderOffColor?: string
        fillColor?: string
        rippleColor?: string
    }

    interface CheckboxStyle {
        borderOnColor?: string
        borderOffColor?: string
        fillColor?: string
        rippleColor?: string
        inset?: number
    }

    interface CardStyle {
        backgroundColor?: string
        borderRadius?: number
        borderColor?: string
        borderWidth?: number
        shadowColor?: string
        shadowOpacity?: number
        shadowRadius?: number
        shadowOffset?: {
            height?: number
            width?: number
        }
    }

    interface CardImageStyle {
        height?: number
        resizeMode?: string
    }

    interface CardTitleStyle {
        position?: string
        top?: number
        left?: number
        backgroundColor?: string
        padding?: number
        fontSize?: number
        color?: string
        fontWeight?: string
    }

    interface CardContentStyle {
        padding?: number
        color?: string
    }
    
    interface CardActionStyle {
        borderStyle?: string
        borderTopColor?: string
        borderTopWidth?: number
        padding?: number
    }
    
    interface CardMenuStyle {
        position?: string
        top?: number
        right?: number
        backgroundColor?: string
    }

    // Theme interface

    interface Theme {
        primaryColor?: string
        primaryColorRGB?: string
        accentColor?: string
        accentColorRGB?: string
        bgPlain?: string
        bgDisabled?: string
        fontColor?: string
        fontSize?: number
        rippleColor?: string
        textfieldStyle?: {
            tintColor?: string
            highlightColor?: string
            textInputStyle?: {
                color?: string
                fontSize?: number
                paddingLeft?: number
                paddingRight?: number
            }
        }
        progressStyle?: ProgressStyle
        spinnerStyle?: SpinnerStyle
        sliderStyle?: SliderStyle
        iconToggleStyle?: IconToggleStyle
        switchStyle?: SwitchStyle
        radioStyle?: RadioStyle
        checkboxStyle?: CheckboxStyle
        cardStyle?: CardStyle
        cardImageStyle?: CardImageStyle
        cardTitleStyle?: CardTitleStyle
        cardContentStyle?: CardContentStyle
        cardActionStyle?: CardActionStyle
        cardMenuStyle?: CardMenuStyle
    }

    // Function

    function setTheme(Object:Theme):void;

    function getTheme():Theme;

    // Components

    //Label
    interface FloatingLabel {
        floatingLabelEnabled?: Boolean
        floatingLabelAniDuration?: number
        floatingLabelBottomMargin?: number
        floatingLabelFont?: number
        allowFontScaling?: Boolean
    }

    //Ripple
    interface Ripple  {
        rippleColor?: string
        rippleDuration?:string
        rippleLocation?: 'tapLocation' | 'center' | 'left' | 'right'
        maskEnabled?: Boolean
        maskColor?: string
        maskBorderRadius?: number
        maskBorderRadiusInPercent?: number
        maskDuration?: number
        shadowAniEnabled?: Boolean
    }

    //Label
    interface Tick {
        fillColor?: any
        inset?: number
    }

    //Button
    interface MKButtonProps extends ReactNative.TouchableWithoutFeedbackProperties, Ripple {
        backgroundColor?: string
        shadowRadius?: number
        shadowOffset?:{width:number, height:number}
        shadowOpacity?:number
        shadowColor?:string
    }

    interface MKButtonStatic extends React.ClassicComponentClass<MKButtonProps> {}

    export var MKButton: MKButtonStatic
    export type MKButton = MKButtonStatic

    //Text field
    interface MKTextFieldProps extends ReactNative.TextInput, FloatingLabel {
        text?: string 
        onTextChange?: Function 
        password?: Boolean 
        underlineEnabled?: Boolean
        underlineSize?: number 
        highlightColor?: string 
        tintColor?: string 
        textInputStyle?: any 
        additionalInputProps?: any
    }

    interface MKTextFieldStatic extends React.ClassicComponentClass<MKTextFieldProps> {}

    export var MKTextField: MKTextFieldStatic
    export type MKTextField = MKTextFieldStatic

    //Switch
    interface MKSwitchProps extends ReactNative.TouchableWithoutFeedbackProperties  {
        checked?: boolean
        onCheckedChange?: Function
        onColor?: string
        offColor?: string
        trackSize?: number
        trackLength?: number
        thumbRadius?: number
        thumbOnColor?: string
        thumbOffColor?: string
        thumbAniDuration?: number
        rippleColor?: string
        rippleAniDuration?: number
    }

    interface MKSwitchStatitc extends React.ClassicComponentClass<MKSwitchProps> {}

    export var MKSwitch: MKSwitchStatitc
    export type MKSwitch = MKSwitchStatitc

    //Checkbox
    interface MKCheckboxProps extends ReactNative.TouchableWithoutFeedbackProperties, Ripple, Tick  {
        borderOnColor?: string
        borderOffColor?: string
        fillColor?: string
        checked?: Boolean
        onCheckedChange?: Function
        extraRippleRadius?: Number
        editable?: Boolean
    }

    interface MKCheckboxStatitc extends React.ClassicComponentClass<MKCheckboxProps> {}

    export var MKCheckbox: MKCheckboxStatitc
    export type MKCheckbox = MKCheckboxStatitc

    //RadioButton
    interface MKRadioButtonProps extends ReactNative.TouchableWithoutFeedbackProperties, Ripple  {
        borderOnColor?: string
        borderOffColor?: string
        fillColor?: string
        checked?: Boolean
        group?: Object
        onCheckedChange?: Function
        extraRippleRadius?: number
    }

    interface MKRadioButtonStatitc extends React.ClassicComponentClass<MKRadioButtonProps> {
        Group: Function
    }

    export var MKRadioButton: MKRadioButtonStatitc
    export type MKRadioButton = MKRadioButtonStatitc

    //IconToggle
    interface MKIconToggleProps extends ReactNative.TouchableWithoutFeedbackProperties, Ripple  {
        checked?: Boolean
        onCheckedChange?: Function
    }

    interface MKIconToggleStatitc extends React.ClassicComponentClass<MKIconToggleProps> {}

    export var MKIconToggle: MKIconToggleStatitc
    export type MKIconToggle = MKIconToggleStatitc

    //MDL
    //Loading
    interface ProgressProps extends ReactNative.ViewProperties  {
        progress?: number
        buffer?: number
        progressColor?: string
        bufferColor?: string
        progressAniDuration?: number
        bufferAniDuration?: number
    }

    interface ProgressStatitc extends React.ClassicComponentClass<ProgressProps> {}

    //Spinner
    interface SpinnerProps extends ReactNative.ViewProperties  {
    }

    interface SpinnerStatitc extends React.ClassicComponentClass<SpinnerProps> {}

    //Range
    interface RangeProps extends ReactNative.ViewProperties  {
        min?: number
        max?: number
        minValue?: number
        maxValue?: number
        trackSize?: number
        thumbRadius?: number
        thumbPadding?: number
        lowerTrackColor?: string
        upperTrackColor?: string
        onStart?: Function
        onChange?: Function
        onConfirm?: Function
        step?: number
    }

    interface RangeStatitc extends React.ClassicComponentClass<RangeProps> {}

    //Slider
    interface SliderProps extends ReactNative.ViewProperties  {
        min?: number
        max?: number
        value?: number
        trackSize?: number
        thumbRadius?: number
        thumbPadding?: number
        lowerTrackColor?: string
        upperTrackColor?: string
        onChange?: Function
        onConfirm?: Function
        step?: number
    }

    interface SliderStatitc extends React.ClassicComponentClass<SliderProps> {}


    // MDL Class
    interface mdlStatic {
        Progress: ProgressStatitc
        Spinner: SpinnerStatitc
        Range: RangeStatitc
        Slider: SliderStatitc
    }

    export var mdl: mdlStatic
    export type mdl = mdlStatic
}

declare module "react-native-material-kit" {
    export = __MK;
}