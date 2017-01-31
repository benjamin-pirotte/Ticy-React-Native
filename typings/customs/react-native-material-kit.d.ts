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
            height: number
            width: number
        }
    }

    interface CardImageStyle {
        height?: number
        resizeMode?: string
    }

    interface CardTitleStyle {
        position?: "absolute" | "relative"
        top?: number
        left?: number
        backgroundColor?: string
        padding?: number
        fontSize?: number
        color?: string
        fontWeight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900"
    }

    interface CardContentStyle {
        padding?: number
        color?: string
    }
    
    interface CardActionStyle {
        borderStyle?: "solid" | "dotted" | "dashed"
        borderTopColor?: string
        borderTopWidth?: number
        padding?: number
    }
    
    interface CardMenuStyle {
        position?: "absolute" | "relative"
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
        floatingLabelFont?: ReactNative.TextStyle
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
    interface MKButtonProps extends ReactNative.TouchableWithoutFeedbackProperties, Ripple {}

    interface MKButtonBuilder {
        withBackgroundColor:(color:string) => MKButtonBuilder
        withShadowRadius:(radius:number) => MKButtonBuilder
        withShadowOffset:(width:number, height:number) => MKButtonBuilder
        withShadowOpacity:(opacity:number) => MKButtonBuilder
        withShadowColor:(color:string) => MKButtonBuilder
        withText:(text:String) => MKButtonBuilder
        withStyle: (Style:ReactNative.ViewStyle) => MKButtonBuilder
        withTextStyle: (Style:ReactNative.TextStyle) => MKButtonBuilder
        build: () => ReactNative.ClassicComponentClass<ReactNative.TouchableWithoutFeedbackProperties>
    }


    export interface MKButtonStatic extends React.ClassicComponentClass<MKButtonProps> {
        Builder: () => MKButtonBuilder
        button: () => MKButtonBuilder
        coloredButton: () => MKButtonBuilder
        accentColoredButton: () => MKButtonBuilder
        flatButton: () => MKButtonBuilder
        coloredFlatButton: () => MKButtonBuilder
        accentColoredFlatButton: () => MKButtonBuilder
        plainFab: () => MKButtonBuilder
        coloredFab: () => MKButtonBuilder
        accentColoredFab: () => MKButtonBuilder
    }

    export var MKButton: MKButtonStatic
    export type MKButton = MKButtonStatic

    //Text field
    interface MKTextFieldProps extends ReactNative.TextInputProperties, FloatingLabel {
        text?: string 
        onTextChange?: (value:string) => void
        password?: Boolean 
        underlineEnabled?: Boolean
        underlineSize?: number 
        highlightColor?: string 
        tintColor?: string 
        additionalInputProps?: any
        textInputStyle?: ReactNative.ViewStyle
    }
    

    interface MKTextFieldBuilder {
        withPassword: (withPassword: boolean) => MKTextFieldBuilder
        withPlaceholder: (placeholder: string) => MKTextFieldBuilder
        withDefaultValue: (placeholder: string) => MKTextFieldBuilder
        withHighlightColor: (color: string) => MKTextFieldBuilder
        withStyle: (style: React.ViewStyle) => MKTextFieldBuilder
        withFloatingLabelFont: (style: React.TextStyle) => MKTextFieldBuilder
        withKeyboardType: (type: ReactNative.KeyboardType) => MKTextFieldBuilder
        withTextInputStyle: (style: React.ViewStyle) => MKTextFieldBuilder
        withOnFocus: (onFocus:Function) => MKTextFieldBuilder
        withOnBlur: (onBlur:Function) => MKTextFieldBuilder
        withOnEndEditing: (withOnEndEditing:(event:Event) => void) => MKTextFieldBuilder
        withOnSubmitEditing: (withOnEndEditing:(event:Event) => void) => MKTextFieldBuilder
        withOnTextChange: (withOnTextChange:(value:String) => void) => MKTextFieldBuilder
        build: () => ReactNative.ClassicComponentClass<MKTextFieldProps>
    }

    interface MKTextFieldStatic extends React.ClassicComponentClass<MKTextFieldProps> {
        Builder: () => MKTextFieldBuilder
        textfield: () => MKTextFieldBuilder
        textfieldWithFloatingLabel: () => MKTextFieldBuilder
    }

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

    interface RadioGroup {
        new(): Array<MKRadioButtonStatitc>
        add: (btn:MKRadioButtonStatitc) => void
        onChecked: (btn: MKRadioButtonStatitc, checked: boolean) => void
    }

    interface MKRadioButtonStatitc extends React.ClassicComponentClass<MKRadioButtonProps> {
        Group: {
            new(): RadioGroup
        }
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

    //Progress
    interface MKProgressProps extends ReactNative.ViewProperties  {
        progress: number
        buffer?: number
        progressColor?: string
        bufferColor?: string
        progressAniDuration?: number
        bufferAniDuration?: number
    }

    interface MKProgressStatitc extends React.ClassicComponentClass<MKProgressProps> {}

    export var MKProgress: MKProgressStatitc
    export type MKProgress = MKProgressStatitc
    
    //Spinner
    interface MKSpinnerProps extends ReactNative.ViewProperties  {}

    interface MKSpinnerBuilder {
        withStyle: (Style:ReactNative.ViewStyle) => MKSpinnerBuilder
        build: () => React.ClassicComponentClass<MKSpinnerProps>
    }

    interface MKSpinnerStatitc extends React.ClassicComponentClass<MKSpinnerProps> {
        Builder: () => MKSpinnerBuilder
        spinner: () => MKSpinnerBuilder
        singleColorSpinner: () => MKSpinnerBuilder
    }

    export var MKSpinner: MKSpinnerStatitc
    export type MKSpinner = MKSpinnerStatitc

    //Slider
    interface MKSliderProps extends ReactNative.ViewProperties  {
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

    interface MKSliderStatitc extends React.ClassicComponentClass<MKSliderProps> {}

    export var MKSlider: MKSliderStatitc
    export type MKSlider = MKSliderStatitc

    //Range
    interface MKRangeSliderProps extends ReactNative.ViewProperties  {
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

    interface MKRangeSliderStatitc extends React.ClassicComponentClass<MKRangeSliderProps> {}

    export var MKRangeSlider: MKRangeSliderStatitc
    export type MKRangeSlider = MKRangeSliderStatitc
}


declare module "react-native-material-kit" {
    export = __MK;
}