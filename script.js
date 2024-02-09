// var roster = localStorage.getItem("roster") || [];
// if (roster.length > 0) {
	// roster = roster.split("§");
// }
var path = " "
window.onload = function() {
	path = window.location.pathname || " ";
	console.log(path);
	for (var i = 0; i < localStorage.length; i++) {
		if (localStorage.key(i).length > path.length && localStorage.key(i).substring(0,path.length).includes(path)) {
			document.getElementById(localStorage.key(i).substring(path.length)).innerHTML = localStorage.getItem(localStorage.key(i));
		}
	}
}
var nodes = Array.from(document.getElementsByClassName("starter"));
nodes = nodes.concat(Array.from(document.getElementsByClassName("bench")));
var posNodes = Array.from(document.getElementsByClassName("pos"));
var containers = document.querySelectorAll(".container");
var players = document.querySelectorAll("span");
players.forEach((player) => {
  player.addEventListener("dragstart", dragStart);
  player.addEventListener("dragend", dragEnd);
});
var people = Array.from(document.getElementsByClassName("person"));
people.forEach((e) => {
	e.addEventListener("dblclick",remPlayer);
});
containers.forEach((container) => {
  container.addEventListener("dragover", dragOver);
  container.addEventListener("drop", drop);
});

function dragStart(event) {
  event.dataTransfer.setData("draggedImageId", event.target.id);
  console.log(event.target.parentElement.innerHTML);
  setTimeout(() => event.target.classList.toggle("hidden"));
}

function dragEnd(event) {
  event.target.classList.toggle("hidden");
}

function dragOver(event) {
  event.preventDefault();
}

function drop(event) {
  const draggedImageId = event.dataTransfer.getData("draggedImageId");
  const draggedImage = document.getElementById(draggedImageId);
  const fromContainer = draggedImage.parentNode;
  const toContainer = event.currentTarget;

  if (toContainer !== fromContainer) {
    fromContainer.appendChild(toContainer.firstElementChild);
    toContainer.appendChild(draggedImage);
	setTimeout(() => {
		console.log(toContainer.outerHTML+ "\n" + fromContainer.outerHTML)
		if (toContainer.parentElement.id.length > 0 || posNodes.includes(toContainer.firstChild)) {
			localStorage.setItem(path + toContainer.id,toContainer.innerHTML);
		} else {
			localStorage.setItem(path + toContainer.id,toContainer.innerHTML);
			console.log(toContainer);
		}
		if (fromContainer.parentElement.id.length > 0 || posNodes.includes(fromContainer.firstChild)) {
			localStorage.setItem(path + fromContainer.id,fromContainer.innerHTML);
		} else {
			console.log(fromContainer);
			localStorage.setItem(path + fromContainer.id,fromContainer.innerHTML);
		}
		nodes = Array.from(document.getElementsByClassName("starter"));
		nodes = nodes.concat(Array.from(document.getElementsByClassName("bench")));
		posNodes = Array.from(document.getElementsByClassName("pos"));
		containers = document.querySelectorAll(".container");
		players = document.querySelectorAll("span");
		people = Array.from(document.getElementsByClassName("person"));
		var swapList = Array.from(containers).filter(e => (e.firstChild.childElementCount > 0 || posNodes.includes(e.firstChild) || people.includes(e.firstChild)));
		console.log(swapList);
		for (var i = 0; i < swapList.length; i++) {
			if (posNodes.includes(swapList[i]) || people.includes(swapList[i])) {
				localStorage.setItem(path + swapList[i].id,swapList[i].innerHTML);
				console.log(swapList.innerHTML);
			}
			// else {
				// localStorage.setItem(swapList[i].parentElement.id,swapList[i].innerHTML);
				// console.log("items swapped in localStorage");
			// }
		}
	},10);
  }
}

function addPlayer(name, pos) {
	roster.push(name + " " + pos);
	// localStorage.setItem("roster",roster.join("§"));
	addToScreen(name,pos);
}
function addToScreen(name,pos) {
	var elem = document.createElement("span");
	elem.className = pos+ " person";
	elem.innerText = name;
	elem.setAttribute("draggable","true");
	elem.setAttribute("id",Date.now());
	var firstOpen = nodes.filter(e => e.childElementCount ==0)[0];//e./*lastChild.*/childElementCount ==0)[0];
	console.log(firstOpen);
	firstOpen.appendChild(elem); // firstOpen.lastChild.appendChild(elem);
	localStorage.setItem(path + firstOpen.id,elem.outerHTML);
	setRos();
}
function addFromPage() {
	addToScreen(document.getElementById("plyrName").value,document.getElementById("plyrPos").value);
}
function Player(name, pos) {
	this.name = name;
	this.pos = pos;
}
function setRos() {
	nodes = Array.from(document.getElementsByClassName("starter"));
	nodes = nodes.concat(Array.from(document.getElementsByClassName("bench")));
	posNodes = Array.from(document.getElementsByClassName("pos"));
	containers = document.querySelectorAll(".container");
	players = document.querySelectorAll("span");
	people = Array.from(document.getElementsByClassName("person"));
	players.forEach((player) => {
		player.addEventListener("dragstart", dragStart);
		player.addEventListener("dragend", dragEnd);
	});
	people.forEach((e) => {
		e.addEventListener("dblclick",remPlayer);
	});
}
function remPlayer(event) {
	event.preventDefault();
	localStorage.removeItem(event.target.parentElement.id);
	event.target.outerHTML = "";
}