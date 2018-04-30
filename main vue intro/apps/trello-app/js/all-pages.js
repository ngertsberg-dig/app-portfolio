
    var todo = [];

    Array.prototype.remove = function(from, to) {
      var rest = this.slice((to || from) + 1 || this.length);
      this.length = from < 0 ? this.length + from : from;
      return this.push.apply(this, rest);
    };

    var homeComponent = Vue.component('home',{
      template:`
      <div class = 'home-wrapper'>
        <div class = 'note-container'>
          <ul>
            <li v-for = 'note in notes' class = 'individual-note'>
              <div class = 'note-title' @click = 'dropdownDesc' :style = '{borderLeft:"15px solid " + note.importance,borderTop:"2px solid " + note.importance,borderBottom:"2px solid " + note.importance,borderRight:"2px solid " + note.importance}'>
                  {{note.title}}
                        <div class = 'showDescription'><i class = 'fa fa-chevron-down' ></i></div>
                        <div class = 'deleteNote' @click = 'deleteNote'><i class="fa fa-times"></i></div>
                </div>
                <div class = 'note-description'>
                  {{note.description}}
                </div>

           </li>
          </ul>

        </div>
            <router-link to = '/add-note' class = 'notes-anchor'>
                <div class = 'anchor add-note-anchor'>Add note</div>
            </router-link>
      </div>
      `,
      data(){
        return{
          notes:todo,
          color:'red',
          mainVueColor:'#42b883'
        }
      },
      created(){
        if(store.get('notesListStorage') != undefined){
        todo = store.get('notesListStorage');
        this.notes = todo;
        }
        else{
          console.warn('nothing in local storage :/');
        }
      },
      mounted(){
          this.numberTitles();
      },
      methods:{
        numberTitles(){

          idCounter = 0;
          $(".individual-note").each(function(){
            $(this).attr('id',idCounter);
            idCounter++;

          });
        },
        notiAzar(){
            let color = this.mainVueColor;

            this.$vs.notify({
              text:'Succesfully Deleted Note',
              color:color
            })
        },
        deleteNote(e){

          swal("Are you sure you want to delete this note?", {
                buttons: {
                cancel: "No",
                defeat: "Yes",
                        },
              })
                .then((value) => {
                  switch (value) {
                    case "defeat":
                      this.notiAzar();
                      var toDelete = $(e.target).parents(".individual-note").attr('id');
                      todo.remove(toDelete);
                      store.set('notesListStorage',todo);
                }
              });
        },
        dropdownDesc(e){

          if($(e.target).hasClass('fa')){
            var noteDescriptionParent = $(e.target).parent().parent().parent().find(".note-description");
            var findChevron = $(e.target).parent().parent().parent().find(".showDescription i");
          }
          else{
          var noteDescriptionParent = $(e.target).parent().find(".note-description");
          var findChevron = $(e.target).parent().find(".showDescription i");
              }


          if($(noteDescriptionParent).attr('id') != 'activeDescription'){
                $(noteDescriptionParent).attr('id','activeDescription');
                $(findChevron).attr('class','fa fa-chevron-up');
          }
          else{
            $(noteDescriptionParent).attr('id','');
            $(findChevron).attr('class','fa fa-chevron-down');
          }
        }
      }
    })
    var noteCompontent = Vue.component('add-note',{
      template:`
      <div class = 'add-note-wrapper'>
          <div class = 'add-note-form-wrapper'>
            <form>
              <input type = 'text' placeholder = 'title' id = 'noteTitle'>
              <input type = 'textarea' placeholder = 'description' id = 'noteDescription'>
            <div class = 'importance-radio-wrapper'>
              <div class = 'importance-header'>
                <h2>Importance:</h2>
              </div>
              <div class = 'importance-text-boxes'>
                  <div class = 'importance-box' id = 'highImportance' @click = 'selectImportance' data-importance-color = 'red'></div>
                  <div class = 'importance-box' id = 'mediumImportance' @click = 'selectImportance' data-importance-color = 'orange'></div>
                  <div class = 'importance-box' id = 'lowImportance' @click = 'selectImportance' data-importance-color = 'lightblue'></div>
              </div>
            </div>
            <input type = 'submit' value = 'Add Note' id = 'submitAddNote' @click = 'submitNote'>
            </form>
          </div>
          <router-link to = '/'>
            <div class = 'anchor home-anchor'>Home</div>
          </router-link>
      </div>
      `,
      methods:{
        selectImportance(e){
          $(".importance-text-boxes .importance-box").each(function(){
            if($(this).hasClass('selected-box'))
              $(this).removeClass('selected-box')
          });
          $(e.target).addClass("selected-box");
        },
        submitNote(){
          var title = $("#noteTitle").val();
          var description = $("#noteDescription").val();
          var importanceColor = $(".selected-box").data('importance-color');
          todo.push({title:title,description:description,importance:importanceColor});
          $(".home-anchor").click();
           store.set('notesListStorage',todo);
           window.location.reload();
        }
      }
    })
    Vue.use(VueRouter);
    var routes = [
      {path:'/',component:homeComponent},
      {path:'/add-note',component:noteCompontent}

    ]
    var router = new VueRouter({
      routes:routes
    })

    var app1 = new Vue({
      el:"#app",
      router:router
    })
