const app = Vue.createApp({
    data() {
        return {
            todoList: new Array(),    // list of works
            counter:0, 
            application_mode:false,  //true == light || false == dark
            options:new Array({name:'New',id:0},{name:'All',id:1},{name:'Doing',id:2},{name:'Ended',id:3},{id:4,name:'Search'}), // user options
            selected_option:0,
            work_input:null,
            error:null,
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
     },
     check_selected_item(id){
        if(id == this.selected_option){
            return true;
        }
        return false;
     },
     change_selected_item(id){
        return this.selected_option = id;
     },
     create_item(new_data){
        this.counter++;
        if(new_data){
            this.todoList.push({id:this.counter,name:new_data,status:0,time:this.handle_time});
            return this.handle_alert('عملیات موفق','اطلاعات با موفقیت اضافه شد','success');
        }
        return this.error = 'لطفا مقداری را وارد کنید';
     },
     handle_alert(subject,text,type){
        Swal.fire(
            subject,
            text,
            type
          )
    }
    },
    computed:{
        handle_form(){
            console.log(this.todoList);
          if(!this.handle_exist){
            this.create_item(this.work_input);
            return this.handle_reset_data;
          }else{
            return this.handle_alert('خطا','این آیتم قبلا توسط شما ثبت شده است...','error');
          }
        },
        handle_input(){
            if(this.work_input){
                this.error = null;
            }
        },
        handle_time(){
            var time = new Date();
            
            return gregorian_to_jalali(time.getFullYear(),time.getMonth(),time.getDay());
        },
        handle_reset_data(){
            this.work_input = null;
            this.error = null;
            return
        },
        handle_exist(){
           const bool = this.todoList.findIndex(list=> list.name === this.work_input);
           if(bool >= 0) return true;
            if(bool < 0) return false;
            if(bool === undefined) return false ;
            if(bool === null) return false;
        }
    }
});

app.mount('#root');

