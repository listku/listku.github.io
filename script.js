const scrollLeft = document.querySelector(".scroll-left");
const scrollRight = document.querySelector(".scroll-right");
const heroDiv = document.querySelector(".hero-img");
const sectionContainer = document.querySelector("section");
const bodyContainer = document.querySelector("body");
const emblemDiv = document.querySelector(".emblem");
const albumTitleSpan = document.querySelector(".album-title");
const texts = document.querySelectorAll(".text");
const albumNum = document.querySelector(".album-num");
const spotifyWidget = document.querySelector(".spotify-widget iframe");
const albums = [
	{
		album: "Roadmen",
		emblem: "Roadmen",
		"bg-color": ["#CD5D02", "#501C01"],
		"accent-color": "#C54A03",
		url: "https://cdn.discordapp.com/attachments/1107616729015783444/1110028607725785129/Snapinsta.app_340829135_1391872631576316_261882138077974832_n_1080.jpg",
		spotify:
			"https://open.spotify.com/embed/track/5bfS0fhLERRV1ecLJQlfdo?utm_source=generator"
	},
    {
		album: "Yelloween",
		emblem: "Yelloween",
		"bg-color": ["#B9A342", "#51471E"],
		"accent-color": "#A0A847",
		url:
			"https://cdn.discordapp.com/attachments/1107616729015783444/1110030050813816914/3gYGyr5-ftohd.jpg",
		spotify:
			"https://open.spotify.com/embed/track/5JgzxYvlYJ3WJYEQ4g6G7z?utm_source=generator"
	},
	{
		album: "Medusa",
		emblem: "Medusa",
		"bg-color": ["#61211A", "#230E05"],
		"accent-color": "#F4F551",
		url: "https://cdn.discordapp.com/attachments/1107616729015783444/1110031658805112952/288PwJQ8M0Uhd.jpg",
		spotify:
			"https://open.spotify.com/embed/track/63QLgTwGq1ZqUEXtyvtada?utm_source=generator"
	},
	{
		album: "Dope",
		emblem: "Dope",
		"bg-color": ["#7D7186", "#19191B"],
		"accent-color": "#576687",
		url:
			"https://media.discordapp.net/attachments/1051117160971391007/1098624945086529627/Picsart_23-04-20_21-50-28-629.jpg?width=842&height=473",
		spotify:
			"https://open.spotify.com/embed/track/4XIVnfst3WZ9T9GtA4FCNK?utm_source=generator"
	},
];

scrollLeft.addEventListener("click", () => handleClickScroll(-1));
scrollRight.addEventListener("click", () => handleClickScroll(1));
heroDiv.addEventListener("animationend", () => {
	heroDiv.classList.remove("album-transition");
	document.addEventListener("keydown", handleKeyScroll);
	scrollLeft.disabled = false;
	scrollRight.disabled = false;
	scrollLeft.classList.remove("key-press-hover-left");
	scrollRight.classList.remove("key-press-hover-right");

	for (const text of texts) text.classList.add("show-texts");
});

const handleClickScroll = (val) => {
	if (listku + val >= 0 && listku + val < albums.length) {
		updateDisplay((listku += val));
	}
};

const handleKeyScroll = (e) => {
	if (e.key == "ArrowLeft") {
		scrollLeft.classList.add("key-press-hover-left");
		handleClickScroll(-1);
	}
	if (e.key == "ArrowRight") {
		scrollRight.classList.add("key-press-hover-right");
		handleClickScroll(1);
	}
};
let listku = 0;

const updateDisplay = (listku) => {
	let DELIMITER = "";

	const album = albums[listku];

	for (const text of texts) text.classList.remove("show-texts");
	emblemDiv.innerHTML = "";
	scrollLeft.disabled = true;
	scrollRight.disabled = true;
	document.removeEventListener("keydown", handleKeyScroll);

	sectionContainer.id = `hero-${album.album.toLowerCase().replace(" ", "-")}`;
	bodyContainer.style.background = `linear-gradient(180deg, ${album["bg-color"][0]} 0%, ${album["bg-color"][1]} 100%)`;
	heroDiv.style.backgroundImage = `url(${album.url})`;
	albumTitleSpan.textContent = album.album;
	spotifyWidget.src = album.spotify;

	const number = listku + 1;
	albumNum.innerText = number >= 10 ? number + "." : `0${number}.`;
	albumNum.style.color = album["accent-color"];

	if (listku === 3) scrollRight.classList.add("hide-arrow");
	else scrollRight.classList.remove("hide-arrow");

	createEmblem(album.emblem, DELIMITER[0] || undefined).forEach((node) =>
		emblemDiv.append(node)
	);

	heroDiv.classList.add("album-transition");
};

const createEmblem = (string, delimiter = "•") => {
	const spans = [];

	string = string.trim().replaceAll(" ", delimiter) + delimiter;
	const numChars = string.length;
	const degVal = 90 / (numChars / 4);

	string.split("").forEach((char, idx) => {
		const span = document.createElement("span");
		span.innerText = char;
		span.style.transform = `rotate(${180 - degVal * idx}deg)`;
		if (char === delimiter) span.style.color = albums[listku]["accent-color"];
		spans.push(span);
	});

	return spans;
};

updateDisplay(listku);
