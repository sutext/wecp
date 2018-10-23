
Component({
    properties: {
        ctstyle: {
            type: String,
            value: ''
        },
        closer: {
            type: Boolean,
            value: true
        }
    },
    data: {
        isShow: false,
    },
    methods: {
        _ignore() { },
        toggle() {
            if (this.data.isShow) {
                this.dismiss()
            } else {
                this.present()
            }
        },
        present() {
            this.setData({ isShow: true })
            this.wpani = this.wpani || wx.createAnimation({ duration: 350 })
            let wpani = this.wpani.opacity(1).step().export()
            setTimeout(() => {
                this.setData({ wpani })
            }, 100);
        },
        dismiss() {
            let wpani = this.wpani.opacity(0).step().export()
            this.setData({ wpani })
            setTimeout(() => {
                this.setData({ isShow: false })
            }, 350);
        },
    }
})