
$("#payment-modal").hide();
$("#payment-modal i").click(function(){
  $("#payment-modal").fadeOut();
});

Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

function giveDeductedArrayNumbers(){
  var counter = 0;
  $(".deducted").each(function(){
  $(this).attr('data-saved-appointment-number',counter);
  counter++;
  });
}

setTimeout(giveDeductedArrayNumbers,1);


const days = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday"
];
const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
];
var userInputAmount = '2000' //prompt('Amount Paid');
var userInput =  '2018/04/27' //prompt('Next PayDay'); make sure its greater than current date
var dateString =  userInput;
var payDay = new Date(dateString);
var currentDate = new Date(Date.now());
currentDate = currentDate.getFullYear() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getDate() ;

const appointments = [
  {
    //always 0 in the array
    date:currentDate,
    title:'Current Day',
    id:'currentDay'

  }
];

for(var x = 0;x != 26;x++){
  //get biweekly payments for 5 paydays
  var setBiWeeklyDates = new Date(userInput);
  var biweekly = 14 * x;
  var idCounter = appointments.length;
  setBiWeeklyDates.setDate(setBiWeeklyDates.getDate() + biweekly);
  var biweeklyString = setBiWeeklyDates.getFullYear() + '/' + (setBiWeeklyDates.getMonth() + 1) +'/' + setBiWeeklyDates.getDate();

    //push biweekly pays to arraylist containg all the paydates
      appointments.push({
                date:biweeklyString,
                title: "PayDay",
                desc: "You get payed on this day :)",
                amount:userInputAmount,
                id:idCounter,
                nextPay:false
            })

      if(x===1){
        appointments[x].nextPay = true;
        console.log(appointments[x]);
      }
}
//deductions
savedAppointments = [];

if(store.get("savedAppointments") !== undefined){
  savedAppointments = store.get('savedAppointments');
  for(var x = 0;x !=savedAppointments.length;x++){
    savedAppointments[x].id = appointments.length;
    appointments.push(savedAppointments[x]);
  }
}

//decrease income based on deductions
function deductTotalFun(){
var deductedTotal = 0;
$(".deducted").each(function(){
  deductedTotal = deductedTotal + parseInt(appointments[$(this).attr("id")].amountDeducted);

});

var userAmountInteger = parseInt($("#userInputAmount").html()) - deductedTotal;
$("#userInputAmount").html(userAmountInteger);
$(".deducted-to-date").html("Deducted: <span style = 'color:red;position:relative;left:15px;' class = 'deducted-to-date-integer' >-$" + deductedTotal + "</span>");

};

setTimeout(deductTotalFun,1);


const Modal = Vue.component("Modal", {
	name: "modal",
	props: {
		event: {
			type: Object,
			required: true
		}
	},
	template: `
		<div class="fg-modal">
			<div class="modal-body">
				<i class="close fa fa-times"  @click="handleModalToggle"></i>
				<h4>{{event.client}}</h4>
				<p id = 'date-info'>Date: {{event.date}}</p>
				<p id = 'amount-info'>Pay Amount: {{event.amount}}</p>
				<p id = 'title-info'> {{event.title}}</p>
        <p id = 'reason-info'>Reason:<span style = 'text-transform:uppercase;'>{{event.titleInfo}}</span></p>
        <p id = 'deduction-info'>Deduction: $ {{event.amountDeducted}}</p>
        <div class = 'delete-deduction'>
        <p style ='color:red;' @click = 'deleteDeduction' :id = 'event.id'>Delete Deduction  <i class = 'fa fa-window-close' @click = 'deleteDeduction'></i></p>
        </div>
        <p style = 'display:none;' id = 'event-id'>{{event.id}}</p>
      </div>
		</div>
	`,
  methods:{
    deleteDeduction(e){
      var identity = $(e.target).attr('id');
      var toDelete = $("#" + identity).data('saved-appointment-number');
      toDelete = parseInt(toDelete);
      savedAppointments.remove(toDelete);
      store.set('savedAppointments',savedAppointments);
      location.reload();
    },
    handleModalToggle(){
      $(".fg-modal").hide();

        this.showDetails = false;
          $(".calendar-container").removeClass('calendar-move');



    }
  }
});
const Event = Vue.component("Event", {
	name: "event",
	data() {
		return {
			showDetails: false
		};
	},
	props: {
		event: {
			type: Object,
			required: true
		}
	},
  //titles title
  //nickzack
	template: `

		<div class="event"  :id = 'event.id' :class = 'event.class'>
			<i class="fa fa-calendar fa-fw" aria-hidden="true" @click.stop="handleModalToggle"></i>
			<span @click.stop="handleModalToggle">{{event.title}}</span>


			<transition name="modal-fade">
				<Modal v-if="showDetails" :event="event" :handleModalToggle="handleModalToggle" />
			</transition>
</div>

	`,
	methods: {
		handleModalToggle() {
      if(this.showDetails == true){
        this.showDetails = false;
          $(".calendar-container").removeClass('calendar-move');
          }
      else {
        this.showDetails = true;
          $(".calendar-container").addClass('calendar-move');
      }
		}
	},
	components: {
		Modal
	}
});

const Day = Vue.component("Day", {
	name: "Day",
	data() {
		return {
			height: 100,
			showDetails: false
		};
	},
	props: {
		day: {
			type: Object
		},
		handleDayView: {
			type: Function,
			required: true
		}
	},
	mounted() {
		this.height = this.$el.clientWidth;
	},
	components: { Event },
	template: `
		<div class="day noselect" :class="{'active': day.active}" :style="{height: height + 'px'}">
			<header @click="() => {handleDayView(day)}">
				<span class="day-name">{{day.name}}</span><span class = 'day-date' style = 'padding-left:5px;'>{{day.date ? day.date.getDate() : null}}</span>
			</header>
			<section>
				<Event v-for="appointment in day.appointments" :event="appointment"/>
        <div class = 'add-event'><i class = 'fa fa-plus'  @click = 'handleDayClicked' ><p style = 'display:none;'>{{day.date ? day.date.getDate() : null}}</p></i></div>
			</section>
		</div>
	`,
  methods:{
    handleDayClicked(e){

      // var currentDay = $(e.target).find(".day-date").html();
      var currentDay = $(e.target).text()
      var currentMonth = $("#currentMonth").html();
      var currentYear =  $("#currentYear").html();
switch(currentMonth){
    case 'January':
		currentMonth = 01;
		break;
    case 'February':
		currentMonth = 02;
		break;
	case 'March':
		currentMonth = 03;
		break;
    case 'April':
		currentMonth = 04;
		break;
	case 'May':
		currentMonth = 05;
		break;
    case 'June':
		currentMonth = 06;
		break;
	case 'July':
		currentMonth = 07;
		break;
    case 'August':
		currentMonth = 08;
		break;
	 case 'October':
		currentMonth = 09;
		break;
	case 'September':
		currentMonth = 10;
		break;
    case 'November':
		currentMonth = 11;
		break;
	case 'December':
		currentMonth = 12;
		break;

}

var currentDaySelected = currentYear +"/" + currentMonth + "/" + currentDay;

$("#payment-modal").fadeIn();

$('#payment-submit').click(function(){

if($("#payment-text").val() === '' ||  $("#payment-info").val() ==='' ){
    alert("Fill in all fields!");
}

else{
    var amountDeducting = $("#payment-text").val();
    var forWhat = $("#payment-info").val();
    savedAppointments.push({
      date:currentDaySelected,
      title:'Deduction',
      titleInfo:forWhat,
      amountDeducted:amountDeducting,
      id:'',
      class:'deducted'
      });

    store.set('savedAppointments',savedAppointments);
      $("#payment-text").val('');
      $("#payment-info").val('');
      location.reload();
    }

    });
    }
  }
});

var Calendar = Vue.component("Calendar", {
	name: "Calendar",
	data() {
		return {
			date: new Date(),
      userInputVue:userInputAmount * 2
		};
	},
	props: {
		handleDayView: {
			type: Function,
			required: true
		}
	},
	computed: {
		appointments() {
			// Find Appointments falling in current month and sort them by time
			return appointments
				.reduce((prev, appointment) => {
					const apptDate = new Date(appointment.date);
					const monthStartDate = new Date(
						this.date.getFullYear(),
						this.date.getMonth(),
						1
					);
					const monthEndDate = new Date(
						this.date.getFullYear(),
						this.date.getMonth() + 1,
						1
					);
					if (apptDate >= monthStartDate && apptDate <= monthEndDate) {
						prev.push(appointment);
					}
					return prev;
				}, [])
				.sort((a, b) => {
					if (a.time > b.time) return 1;
					if (a.time < b.time) return -1;
					return 0;
				});
		},
		dateObject() {
			return {
				date: this.date,
				day: days[this.date.getDay()],
				month: months[this.date.getMonth()],
				year: this.date.getFullYear()
			};
		},
		daysInMonth() {
			let date = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);
			return date.getDate();
		},
		buildCalendarDays() {
			let daysArray = [];
			let week = 0;
			const firstMonthDate = new Date(
				this.date.getFullYear(),
				this.date.getMonth(),
				1
			);
			const firstMonthDay = days[firstMonthDate.getDay()];
			let monthDate = 0;
			while (week < 6) {
				days.forEach(day => daysArray.push(day));
				week += 1;
			}
			return daysArray.map(day => {
				let dayObj = {
					name: day,
					active: false
				};
				if (!monthDate && firstMonthDay === day) {
					monthDate += 1;
					const date = new Date(
						this.date.getFullYear(),
						this.date.getMonth(),
						monthDate
					);
					dayObj.date = date;
					dayObj.active = true;
					dayObj.appointments = this.appointments.reduce((prev, appt) => {
						if (new Date(appt.date).getTime() === date.getTime()) {
							prev.push(appt);
						}
						return prev;
					}, []);
				} else if (monthDate && monthDate < this.daysInMonth) {
					monthDate += 1;
					const date = new Date(
						this.date.getFullYear(),
						this.date.getMonth(),
						monthDate
					);
					dayObj.date = date;
					dayObj.active = true;
					dayObj.appointments = this.appointments.reduce((prev, appt) => {
						if (new Date(appt.date).getTime() === date.getTime()) {
							prev.push(appt);
						}
						return prev;
					}, []);
				}
				return dayObj;
			});
		}
	},
	methods:{
		handleChangeMonth(change) {
			let newDate = new Date(
				this.date.getFullYear(),
				this.date.getMonth() + change
			);
			this.date = newDate;
		}
	},
	created() {
		window.scrollTo(0, 0);
	},
	template: `
		<div class="calendar-container noselect">
			<header>
				<div class="navigation-arrow">
					<i class="fa fa-chevron-left" @click="() => {handleChangeMonth(-1)}"></i>
				</div>
				<div class="">
					<h4 id = 'currentMonth'>{{dateObject.month}}</h4>
					<p id = 'currentYear'>{{dateObject.year}}</p>
				</div>
          <h5 id = 'monthly-income'>Monthly Income : <span style = 'color:#09b709;'>$</span><div id = 'userInputAmount'>{{userInputVue}}</div><div class = 'deducted-to-date'></div> </h5>
          <div class = 'storage'>
            <div class = 'save-appointments'><i class = 'fa fa-save'></i></div>
            <div class = 'clearCache'><i class="fa fa-window-close"></i></div>
          </div>
      	<div class="navigation-arrow">
					<i class="fa fa-chevron-right" @click="() => {handleChangeMonth(1)}"></i>
				</div>
			</header>
			<div class="days">
				<Day v-for="(day, index) in this.buildCalendarDays" :handleDayView="handleDayView" :day="day" :key="index" />
			</div>
		</div>
	`,
	components: { Day }
});

const DayViewAppointment = Vue.component("DayViewAppointment", {
	name: "DayViewAppointment",
	props: {
		appointment: {
			type: Object,
			required: true
		}
	},
	computed: {
		height() {
			// Should recieve a String containing the number of minutes
			// return duration in milliseconds
			return parseInt(this.appointment.duration.split(" ")[0], 10);
		},
		price() {
			return `£${(this.appointment.price / 100).toFixed(2)}`;
		},
		startTime() {
			let date = new Date(this.appointment.date);
			let time = this.appointment.time.split(":");
			let appointmentTimestamp = new Date(
				date.getFullYear(),
				date.getMonth(),
				date.getDate(),
				time[0],
				time[1]
			);
			return appointmentTimestamp;
		},
		endTime() {
			let duration =
				parseInt(this.appointment.duration.split(" ")[0], 10) * 60 * 1000;
			let endTime = new Date(this.startTime.getTime() + duration);
			return (
				endTime.getHours() +
				":" +
				(endTime.getMinutes() < 10
					? endTime.getMinutes() + "0"
					: endTime.getMinutes())
			);
		}
	},
	template: `
		<div class="appointment" :style="'height: ' + height + 'px;'">
			<header>
			<div class="client">
				<img :src="appointment.photoURL" :alt="appointment.client" />
				<h4>{{appointment.client}}</h4>
			</div>
			<div class="times">
				<p>Start: <b>{{startTime.getHours() + ':' + (startTime.getMinutes() < 10 ? startTime.getMinutes() + '0' : startTime.getMinutes())}}</b></p>
				<p>End: <b>{{endTime}}</b></p>
			</div>
			</header>
			<p>{{appointment.treatments}}</p>
			<p>Duration: {{appointment.duration}}</p>
			<p>Price: {{price}}</p>
		</div>
	`
});

const DayView = Vue.component("DayView", {
	name: "day-view",
	data() {
		return {
			agenda: false
		};
	},
	props: {
		day: {
			type: Object,
			required: true
		},
		handleCloseDayView: {
			type: Function,
			required: true
		},
		handleChangeDay: {
			type: Function,
			reuired: true
		}
	},
	beforeEnter(el) {
		console.log(el);
	},
	computed: {
		hours() {
			let time = new Date(
				this.day.date.getFullYear(),
				this.day.date.getMonth(),
				this.day.date.getDate(),
				8,
				0
			).getTime();
			let endTime = new Date(
				this.day.date.getFullYear(),
				this.day.date.getMonth(),
				this.day.date.getDate(),
				20,
				0
			).getTime();
			const hour = 60 * 60 * 1000;
			let hours = [];
			while (time < endTime) {
				hourObj = {
					time: new Date(time),
					appointments: this.day.appointments.filter(appt => {
						appt = addUserImage(appt);
						let date = new Date(appt.date);
						let timeArray = appt.time.split(":").map(time => parseInt(time));
						let startTime = new Date(
							date.getFullYear(),
							date.getMonth(),
							date.getDate(),
							parseInt(timeArray[0]),
							parseInt(timeArray[1])
						);
						return startTime.getTime() >= time && startTime.getTime() < time + hour;
					})
				};
				hours.push(hourObj);
				time += hour;
			}
			return hours;
		}
	},
	created() {
		window.scrollTo(0, 0);
	},
	template: `
		<div class="day-view">
			<div class="close" @click="handleCloseDayView"><i class="fa fa-times"></i></div>
			<header>
				<div class="navigation-arrow">
					<i class="fa fa-chevron-left" @click="() => {handleChangeDay(-1)}"></i>
				</div>
				<div class="day-title">
					<h5>{{day.name}}</h5>
					<h4>{{day.date.getDate()}}</h4>
					<p>{{months[day.date.getMonth()]}} {{day.date.getFullYear()}}</p>
				</div>
				<div class="navigation-arrow">
					<i class="fa fa-chevron-right" @click="() => {handleChangeDay(1)}"></i>
				</div>
			</header>
			<div>
				<ul class="nav nav-tabs justify-content-center" id="myTab" role="tablist">
				  <li class="nav-item">
					 <a class="nav-link" :class="{'active': !agenda}" href="#day-view" @click.prevent="() => {agenda = !agenda}">Day View</a>
				  </li>
				  <li class="nav-item">
					 <a class="nav-link" :class="{'active': agenda}" href="#agenda" @click.prevent="() => {agenda = !agenda}">Agenda View</a>
				  </li>
				</ul>
			</div>
			<transition name="fade" mode="out-in">
				<div class="hours" key="1" v-if="!agenda">
					<div class="hour" v-for="hour in hours">
						<header>
							<span>{{hour.time.getHours()}}:{{hour.time.getMinutes() < 10 ? hour.time.getMinutes() + '0' : hour.time.getMinutes()}}</span>
						</header>
						<section>
							<day-view-appointment v-for="appointment in hour.appointments" :appointment="appointment"></day-view-appointment>
						</section>
					</div>
				</div>
				<div class="agenda" key="2" v-else>
					<day-view-appointment v-for="appointment in day.appointments" :appointment="appointment"></day-view-appointment>
					<div class="no-appointments" v-if="!day.appointments || day.appointments.length === 0">
						<div><i class="fa fa-exclamation-triangle fa-5x" aria-hidden="true"></i></div>
						<h4>No Appointments Today</h4>
					</div>
				</div>
			</transition>
		</div>
	`
});

const App = Vue.component("App", {
	name: "App",
	data() {
		return {
			day: null
		};
	},
	methods: {

		handleDayView(day) {
			if (!day) return;
			this.day = day;
		},
		handleCloseDayView() {
			this.day = null;
		},
		handleChangeDay(change) {
			// Create a new day object with day change applied
			const date = new Date(
				this.day.date.getFullYear(),
				this.day.date.getMonth(),
				this.day.date.getDate() + change
			);
			let dayObj = Object.assign(this.day, {
				date,
				name: days[date.getDay()],
				appointments: appointments.reduce((prev, appt) => {
					if (new Date(appt.date).getTime() === date.getTime()) {
						prev.push(addUserImage(appt));
					}
					return prev;
				}, [])
			});
			this.day = dayObj;
		}

  },
	template: `
		<div class="app">
			<transition name="fade" mode="out-in">
				<calendar v-if="!day" :handleDayView="handleDayView"></calendar>
				<day-view v-else :day="day" :handleCloseDayView="handleCloseDayView" :handleChangeDay="handleChangeDay"></day-view>
			</transition>
		</div>
	`,
	components: { Calendar }
});

// Helper functions
function addUserImage(appt) {
	// Add random user image
	const randomNumber = Math.round(Math.random() * 88);
	appt.photoURL = `https://randomuser.me/api/portraits/women/${randomNumber}.jpg`;
	return appt;
}

let app = new Vue({
	el: "#app",
	template: "<App />",
	components: { App }
});
