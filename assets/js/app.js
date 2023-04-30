const app = Vue.createApp({
    data() {
        return {
            todoList: new Array(),    // list of works
            counter:0, 
            application_mode:false,  //true == light || false == dark
            options:new Array({name:'New',id:0},{name:'All',id:1},{id:2,name:'Search'}), // user options
            selected_option:0,
            work_input:null,
            error:null,
            txt_status : false,
            search_box:null,
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
     create_item(new_data,status){
        this.counter++;
        if(new_data){
            this.todoList.push({id:this.counter,name:new_data,status:status,time:this.handle_time});
            return this.handle_alert('عملیات موفق','اطلاعات با موفقیت اضافه شد','success');
        }
        return this.error = 'لطفا مقداری را وارد کنید';
     },
     handle_alert(subject,text,type){
        Swal.fire(
            subject,
            text,
            type
          );
    },
    handle_reset_data(){
        this.work_input = '';
        this.error = '';
        this.txt_status = '';
    },
    change_status_input(){
       return this.txt_status = !this.txt_status;
    },
    change_data_status(id){
        const index = this.todoList.findIndex(item=>item.id === id);
        var status = this.todoList[index].status;
        this.todoList[index].status = !status;
        return;
    },
    delete_data(id){
        const index = this.todoList.findIndex(item=>item.id === id);
        this.todoList.splice(index,1);
        return;
    }
    },
    computed:{
        handle_form(){
          if(!this.handle_exist){
                 this.create_item(this.work_input,this.txt_status);
             return this.handle_reset_data();
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
        handle_exist(){
           const bool = this.todoList.findIndex(list=> list.name === this.work_input);
           if(bool >= 0) return true;
            if(bool < 0) return false;
            if(bool === undefined) return false ;
            if(bool === null) return false;
        },
        handle_search(){
            if(this.search_box){
                var search_items = this.todoList.filter(list=>list.name.includes(this.search_box));
              return search_items;
               
            }
        }
    }
});

app.mount('#root');

