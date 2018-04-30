
    Vue.use(VueRouter);

    var home = Vue.component('home',{
      template:`<h1>HOME</h1>`
    })

    var notez = Vue.component('notez',{
      template:`
      <div class = 'app-wrapper notez-wrapper'>
        <h1>NoteZ App <h2 class = 'hover-info'><i class="fa fa-question"></i></h2></h1>
        <div class = 'main-app-image'>
          <img src = 'i/notezimg.png'>
        </div>
        <a href='apps/NoteZ/Notes.html' class='noteZButton launchApp'>
          <button>Launch NoteZ</button>
        </a>
      </div>`
    })

    var trello = Vue.component('trello',{
      template:`
      <div class = 'app-wrapper importance-wrapper'>
        <h1>Importance Notes App <h2 class = 'hover-info'><i class="fa fa-question"></i></h2></h1>
        <div class = 'main-app-image'>
          <img src = 'i/trelloappimg.png'>
        </div>
        <a href='apps/trello-app/Vue JS Notes.html' class='trelloButton launchApp'>
          <button>Launch Notes App</button>
        </a>
      </div>
      `
    })

    var weather = Vue.component('weather',{
      template:`
      <div class = 'app-wrapper weather-wrapper'>
        <h1>Weather App <h2 class = 'hover-info'><i class="fa fa-question"></i></h2></h1>
        <div class = 'main-app-image'>
          <img src = 'i/weatherappimg.png'>
        </div>
        <a href='apps/weather/Vue Weather.html' class='weatherButton launchApp'>
          <button>Launch Weather App</button>
        </a>
      </div>
      `
    })

    var calendar = Vue.component('calendar',{
      template:`
      <div class = 'app-wrapper calendar-wrapper'>
        <h1>Calendar App <h2 class = 'hover-info'><i class="fa fa-question"></i></h2></h1>
        <div class = 'main-app-image'>
          <img src = 'i/calendarappimg.png'>
        </div>
        <a href='apps/vuecalendar/index.html' class='calendarButton launchApp'>
          <button>Launch Calendar App</button>
        </a>
      </div>
      `
    })

    var color = Vue.component('color',{
      template:`
      <div class = 'app-wrapper color-wrapper'>
        <h1>Background-Color App <h2 class = 'hover-info'><i class="fa fa-question"></i></h2></h1>
        <div class = 'main-app-image'>
          <img src = 'i/colorappimmg.png'>
        </div>
        <a href='apps/changecolor/VUE change background color on type.html' class='colorButton launchApp'>
          <button>Launch Background-Color App</button>
        </a>
      </div>
      `
    })

    var direction = Vue.component('direction',{
      template:`
      <div class = 'app-wrapper direction-wrapper'>
        <h1>Directional Hover App <h2 class = 'hover-info'><i class="fa fa-question"></i></h2></h1>
        <div class = 'main-app-image'>
          <img src = 'i/directionalhoverappimg.png'>
        </div>
        <a href='apps/directionalhover/directional-hover.html' class='directionalButton launchApp'>
          <button>Launch Directional Hover App</button>
        </a>
      </div>
      `
    })

    var monsterslayer = Vue.component('monsterslayer',{
      template:`
      <div class = 'app-wrapper monster-slayer-wrapper'>
        <h1>Monster Slayer App <h2 class = 'hover-info'><i class="fa fa-question"></i></h2></h1>
        <div class = 'main-app-image'>
          <img src = 'i/monsterslayerappimg.png'>
        </div>
        <a href='apps/monsterslayer/VUE MONSTER SLAYER.html' class='monsterSlayerButton launchApp'>
          <button>Launch Monster Slayer App</button>
        </a>
      </div>
      `
    })

    var netflix = Vue.component('netflix',{
      template:`
      <div class = 'app-wrapper netflix-wrapper'>
        <h1>Netflix Vue App <h2 class = 'hover-info'><i class="fa fa-question"></i></h2></h1>
        <div class = 'main-app-image'>
          <img src = 'i/netflixappimg.png'>
        </div>
        <a href='apps/netflixvue/netflix vue.html' class='netflixButton launchApp'>
          <button>Launch Netflix App</button>
        </a>
      </div>
      `
    })

    var pokemon = Vue.component('pokemon',{
      template:`
      <div class = 'app-wrapper pokemon-wrapper'>
        <h1>Pokemon App <h2 class = 'hover-info'><i class="fa fa-question"></i></h2></h1>
        <div class = 'main-app-image'>
          <img src = 'i/pokemonappimg.png'>
        </div>
        <a href='apps/pokemon/pokemon API.html' class='pokemonButton launchApp'>
          <button>Launch Pokemon App</button>
        </a>
      </div>
      `
    })

    var timeline = Vue.component('timeline',{
      template:`
      <div class = 'app-wrapper timeline-wrapper'>
        <h1>Timeline App <h2 class = 'hover-info'><i class="fa fa-question"></i></h2></h1>
        <div class = 'main-app-image'>
          <img src = 'i/timelineappimg.png'>
        </div>
        <a href='apps/timeline/index.html' class='timelineButton launchApp'>
          <button>Launch Timeline App</button>
        </a>
      </div>
      `
    })

    var routes = [
      {path:'/',component:home},
      {path:'/notez',component:notez},
      {path:'/trello',component:trello},
      {path:'/weather',component:weather},
      {path:'/calendar',component:calendar},
      {path:'/color',component:color},
      {path:'/direction',component:direction},
      {path:'/monsterslayer',component:monsterslayer},
      {path:'/netflix',component:netflix},
      {path:'/pokemon',component:pokemon},
      {path:'/timeline',component:timeline}
    ]

    var router = new VueRouter({
      routes:routes
    })

      var introVue = new Vue({
        el:"#intro-vue-page",
        router:router,
          methods:{
            collapseMenu(){
              if(!$(".side-menu-wrapper").hasClass('collapsed')){
              $(".side-menu-wrapper").addClass('collapsed');
              $(".side-menu-collapse-button-wrapper").addClass("collapsedChevron");
              $(".app-wrapper").addClass("large-app-wrapper");
                }
              else {
                $(".side-menu-wrapper").removeClass('collapsed');
                $(".side-menu-collapse-button-wrapper").removeClass("collapsedChevron");
                $(".app-wrapper").removeClass("large-app-wrapper");
              }
            },
            showChevron(){
              $(".chevron-collapse").fadeIn();
            },
            hideChevron(){
              $(".chevron-collapse").fadeOut  ();
            }
          }


      })

          $(".chevron-collapse").hide();
