let modInfo = {
	name: "The Communitree! (Aarex's Upsiding)",
	id: "aarexupside",
	author: "TehAarex, the creator of NG+3 and All Dimensions",
	pointsName: "points",
	discordName: "NG+3 Server",
	discordLink: "https://discord.gg/KsjcgskgTj",
	initialStartPoints: EN (10), // Used for hard resets and new players
	
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.0",
	name: "CT v0.2.A // Aarex's Patch 1",
}

let changelog = `<h1>Changelog:</h1><br/>
	<i>(Be warned: this may contain spoilers!)</i><br/>
	<h2>v0.0</h2><br/>
		The start of Aarex's Upsiding, with a fanmade patch of v0.2.A.<br/>
`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return EN(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return hasUpgrade("jac", 101) && player.points.lt(EN.tetrate(10, "e1000000"))
}

// Calculate points/sec!
function getPointGen() {
	if(!hasUpgrade("jac", 101) && !hasUpgrade("aar", 101))
		return EN(0)

	let gain = EN(1)
	if (hasUpgrade("jac", 102)) gain = gain.mul(upgradeEffect("jac", 102))
	if (hasUpgrade("jac", 103)) gain = gain.mul(upgradeEffect("jac", 103))
	if (hasUpgrade("jac", 223)) gain = gain.mul(buyableEffect("jac", 111)).mul(buyableEffect("jac", 112))
	gain = gain.mul(buyableEffect("jac", 101))
	gain = gain.mul(buyableEffect("jac", 121))
	gain = gain.mul(buyableEffect("jac", 123).ppp)
	gain = gain.mul(buyableEffect("jac", 131))
	gain = gain.mul(buyableEffect("jac", 132))
	
	if (hasUpgrade("aar", 101)) gain = gain.mul(10)
	if (hasUpgrade("aar", 103)) gain = gain.mul(player.aar.bal.add(1))
	
	if (hasUpgrade("aar", 201)) gain = gain.mul(upgradeEffect("aar", 201))

	if (hasUpgrade("aca", 101)) gain = gain.pow(upgradeEffect("aca", 101))

	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
	theme: "aqua",
	hqTree: true
}}

// Display extra things at the top of the page
var displayThings = [
	() => `<h5 style="opacity:.5"><br/><i>(Current endgame: ${format("(10^^)^2 (10^)^3 9")} points)`,
	() => !player.isWarned ? `
		<div style="border:2px solid var(--color);margin-top:10px;padding:5px;display:inline-block">
		Important notice: Some parts of the game may contain flashing lights.<br/>
		To prevent this, turn on "Anti-Epilepsy Mode" in the settings tab.<br/>
		(the gear icon in the top-left corner)<br/>
		<button style="margin-top:10px;" onclick="player.isWarned = true">Got it!</button>
	` : ""
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte("(10^^)^2 (10^)^3 9")
}



// Less important things beyond this point!

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(1/0) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}