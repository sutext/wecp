var env = require('../index').conf
Component({
    properties: {
        src: String, //image src
        text: String, // button title
        report: Boolean,
        openType: String, //the wx button open-type
        ctstyle: String,//addition content style, usualy you need't set it. it's priority bellow color.
        theme: {
            type: String,
            value: env.button.theme,// line fill image row column
            observer: '_updateStyle'
        },
        color: {//ButtonColor对象
            type: Object,
            observer: '_updateStyle'
        },
        disColor: {//ButtonColor对象
            type: Object,
            observer: '_updateStyle'
        },
    },
    ready() {
        if (this.data.theme === env.button.theme) {
            this._updateStyle()
        }
    },
    methods: {
        _ignore() { },
        _updateStyle() {
            var color = this.data.disColor || this.data.color || env.button.color
            var textColor = color.text || "#666"
            var style = `color:${textColor};`
            switch (this.data.theme) {
                case 'fill':
                    style = `${style}background-color:${color.fill || env.theme};`
                    break;
                case 'line':
                    style = `${style};border: 1px solid ${color.line || "#dbdbdb"};`
                    break;
                default:
                    if (color.fill) {
                        style = `${style}background-color:${color.fill};`
                    }
                    break;
            }
            this.setData({ style, textColor })
        },
        _onUserInfo(e) {
            var iv = e.detail.iv
            var rawData = e.detail.encryptedData
            if (iv && rawData) {
                this.triggerEvent('login', { iv, rawData })
            }
        },
        _onClick(e) {
            var detail = {}
            var formId = e.detail.formId
            detail.formId = formId
            if (env.button.reporter && formId) {
                env.button.reporter(formId)
            }
            this.triggerEvent('click', detail)
        }
    }
})