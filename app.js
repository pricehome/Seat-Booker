// #1 Define vars container - ticketPrice
// DOM Elements
const container = document.querySelector('.container')
const seats = document.querySelectorAll('.row .seat:not(.occupied)')
const count = document.getElementById('count')
const total = document.getElementById('total')
const movieSelect = document.getElementById('movie')

//  #10 Populate UI
populateUI()

// ticketPrice must be "let" because it will change in the select field
let ticketPrice = +movieSelect.value

// #10 Save Selected movie and price - Function for local storage movieSelect
function setMovieData(movieIndex, moviePrice) {
	localStorage.setItem('selectedMovieIndex', movieIndex)
	localStorage.setItem('selectedMoviePrice', moviePrice)
}

//  #3 Update Total and Count
function updateSelectedCount() {
	const selectedSeats = document.querySelectorAll('.row .seat.selected')

	// #4 Get Length of Node List to show how many seats purchased
	const selectedSeatsCount = selectedSeats.length

	// #7 Copy selected seats into arr (since it returns a nodeList)
	// Map through Arr
	// return a new arr indexes (.map will return an array. forEach would just loop through)
	const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat))

	// #8 Local Storage for selectedSeats
	localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))

	//  #5 Show total tickets and amount spent
	count.innerText = selectedSeatsCount
	total.innerText = selectedSeatsCount * ticketPrice
}

// #11 Function to populate the UI
// Get data from local storage for UI
function populateUI() {
	const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))

	// #11a
	if (selectedSeats !== null && selectedSeats.length > 0) {
		seats.forEach((seat, index) => {
			if (selectedSeats.indexOf(index) > -1) {
				seat.classList.add('selected')
			}
		})
	}

	// 11b
	const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')
	if (selectedMovieIndex !== null) {
		movieSelect.selectedIndex = selectedMovieIndex
	}

	console.log(selectedSeats)
}

// #6 Add new event listener for changes in the Movie select Event
movieSelect.addEventListener('change', e => {
	ticketPrice = +e.target.value

	// #9 Local Storage for movieSelect
	setMovieData(e.target.selectedIndex, e.target.value)

	// #6 part of 6
	updateSelectedCount()
})

// #2 Event Listener 1
container.addEventListener('click', e => {
	if (
		e.target.classList.contains('seat') &&
		!e.target.classList.contains('occupied')
	) {
		e.target.classList.toggle('selected')

		updateSelectedCount()
	}
})
//  #12 Initial count and total set
updateSelectedCount()
