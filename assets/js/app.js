const app = Vue.createApp({
    data() {
        return {
            items: new Array(),
            application_mode:false   //true == light || false == dark
        }
    },
    methods: {
        change_application_mode(){
         this.application_mode = !this.application_mode;
            if(this.application_mode){
                document.body.classList.remove('bg_dark')
                return document.body.classList.add('bg-light');
            }else{
                document.body.classList.remove('bg-light')
                return document.body.classList.add('bg_dark');
            }
     }
    }
});

app.mount('#root');

