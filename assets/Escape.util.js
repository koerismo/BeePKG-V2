// Escape.util.js
// This script serves as an easy way to manage general-purpose functions.


// Cleans up user input by adding in backticks before specified characters.
export function _(str,escapeChars=['"'],fmt='\\$&') {
	return str.split('').map((x)=>{
		return (escapeChars.includes(x)) ? fmt.replace('$&',x) : x;
	}).join('')
}