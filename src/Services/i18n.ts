import { EventEmitter } from 'events'
import React, { NativeModules } from 'react-native'

//i18n
import en_US from '../i18n/en_US'

//Stores
let _lang:string = 'en_US'
let _i18n:any = {
    en_US: en_US
}

function getLocaleLang () {
  if (React.Platform.OS === 'android') {
    return NativeModules.I18nManager.localeIdentifier
  } else {
    return NativeModules.SettingsManager.settings.AppleLocale
  }
}

class i18n extends EventEmitter  {
    defaultLang:string = 'en_US'

    constructor(){
        super()
        if(_i18n[getLocaleLang()]){
            _lang = getLocaleLang()
        }
    }

    switchLang = (lang:string) =>  {
        _lang = lang
    }

    getLang = () => {
        return _lang
    }

    t = (key:string) => {
        let keyArray:Array<string> = key.split('.')
        let val:any

        let getValFromKey = (lang:string) => {
            val = _i18n[lang]
            keyArray.forEach(key => {
                if(!val) return
                if(!val[key]){
                    val = null
                } else {
                    val = val[key]
                }
            })
        }

        getValFromKey(_lang)
    
        if(!val){
            getValFromKey(this.defaultLang)
        }

        if(!val){
            val = key
        }
        return val
    }
}

export default new i18n()