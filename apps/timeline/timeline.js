
Vue.component('timeline-left',{
 template:`<div class="timeline-item">
   <div class="timeline-icon"></div>
   <div class="timeline-content">
     <h2> <img :src = 'imageSrc' ></h2>
     <p>{{bodytext}}</p>
   </div>
 </div>`,
 data(){
   return{
     imageSrc:'',
     bodytext:''
   }
 }
})
Vue.component('timeline-right',{
 template: `<div class="timeline-item">
       <div class="timeline-icon"></div>
       <div class="timeline-content right">
         <h2><img :src = 'imageSrc'></h2>
         <p>{{bodytext}}</p>
       </div>
     </div>`,
      data(){
        return{
          imageSrc:'',
          bodytext:''
        }
      }
})

 var timeline = new Vue({
  el: '#timeline'
})
//inner paragraphs for timelines
//timeline 1
timeline.$children[0].bodytext =
           `Royal Tank Lines was founded in 1989 by Thomas Strachan.
            Not long into starting Royal Tank Lines Tom had grown the business
            to where a new location was needed, to keep up with the growth of
            the company and moved the company to a larger facility which is our
            current location of 323 Bayview Drive Barrie,Ontario.`;
//timeline 2
timeline.$children[1].bodytext =
           `Throughout the years the vision and direction of Royal Tank
            Lines has always been achieving the great relationships we have with out
            customers and employees. Royal Tank Lines takes pride in the specialty
            products such as Chocolate and Canola Oil. Not only od we haul finished
            products we also haul raw ingredients to customers to make their finished products.`;
//timeline3
timeline.$children[2].bodytext =
            `At Royal Tank Lines we have hauled many food grade
            from water, beer, oil, chocolate, and cocoa butter. We have taken
            great care, detail, safety and innovative equipment to transport the
            different food grade products. We are dedicated in trying to achieve
            the highest quality of service for our food grade products for our customers.`;
//images for 3 timelines
//timeline 1
timeline.$children[0].imageSrc = 'shake.png';
//timeline 2
timeline.$children[1].imageSrc = 'truck.png';
//timeline 3
timeline.$children[2].imageSrc = 'water.png';
