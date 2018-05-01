function countList(){
  var listCounter = 0;
  $(".note-list li").each(function(){
  $(this).attr('id',listCounter);
  listCounter++;
  });
}
function copyToClipboard(elementId) {
// Create a "hidden" input
var aux = document.createElement("input");
// Assign it the value of the specified element
aux.setAttribute("value", document.getElementById(elementId).innerHTML);
// Append it to the body
document.body.appendChild(aux);
// Highlight its content
aux.select();
// Copy the highlighted text
document.execCommand("copy");
// Remove it from the body
document.body.removeChild(aux);
}

Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

$(".input-code-container").hide();
$("#save-notification").hide();
      var app1 = new Vue({
        el:"#app",
        data:{
          notes:[],
            // [store.get('notes')]
          showHome:true,
          showNote:false
        },
        created(){
          if(store.get('notes') != undefined){
            this.notes = store.get('notes');
          }

        },
        methods:{
          togglePages(){
            if(this.showHome == true && this.showNote ==false){
            this.showHome = false
            this.showNote = true
            $(".input-code-container").fadeIn()
            $(".note-list").hide()

            }
            else{
              this.showHome = true
              this.showNote = false
                    $(".input-code-container").hide()
                    $(".note-list").fadeIn()
            }
          },
          submitNote(){
                this.notes.push({title:$(".title-input").val(),message:$("textarea").val(),hidden:$("textarea").val()});
                $("textarea").val("");
                $(".back-home i").click();

                setTimeout(function(){
                  countList();
                },1);
              },
              clearInputTitle(){
                $('.title-input').val('');
                $('.title-input').css({'textAlign':'left','paddingLeft':'5px'})
              },
              deleteNote(e){
                  var toDelete = $(e.target).parent().parent().parent().attr('id');
                  toDelete = parseInt(toDelete);
                  console.log(toDelete);
                  app1.notes.remove(toDelete);
              },
              save(){
                store.clear();
                store.set('notes',app1.notes);
                app1.notes = store.get('notes');
                $(".notification-logo i").attr("class","fa fa-save");
                $(".notification-text").html("<h2>Notes Saved!</h2>");
                $("#save-notification").show();
                $("#save-notification").fadeOut(1000);
              },
              copy(e){
                    var getParentID = $(e.target).parent().parent().parent().attr("id");
                    $("#" + getParentID + " small").attr('id','copy');
                    copyToClipboard("copy");
                    $("#" + getParentID + " small").attr('id','');
                    $(".notification-logo i").attr("class","fa fa-clipboard");
                    $(".notification-text").html("<h2>Copied!</h2>");
                    $("#save-notification").show();
                    $("#save-notification").fadeOut(1000);

              }
            },
            mounted:function(){
                  countList();

            }

        })
