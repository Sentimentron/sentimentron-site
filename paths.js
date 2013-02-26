var availabilityTestFiles = [
	"samples/available.json",
	"samples/delayed.json"
];

var submitQueryTestFiles = [
	"samples/submit_success.json",
	"samples/submit_validation.json"
];

var apiBase = "http://localhost:5000";
var resultsBase = "http://localhost:8000/results.html"

var waitOnQueryTestFiles = [
	"samples/wait_normal.json",
	"samples/wait_fulfilled.json"
] 

function generateRPCURL(from_url) {
	return "samples/" + from_url;
}

function checkAvailability() {
	return apiBase;
}

function submitQuery() {
	return apiBase+"/submit";
	//return chooseRandomElem(submitQueryTestFiles);
}

function submitEmail() {
	return apiBase + "/add_email"
}

function waitForQuery() {
	return apiBase+"/status";
}