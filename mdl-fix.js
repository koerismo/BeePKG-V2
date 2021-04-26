// Make imported models use a new path determined by BeePKG-V2


// Copied from vtf-conv.js
String.prototype.toBytes = function() {
  return this.split('').map((x)=>{return x.charCodeAt()})
}

class mdl_model {
	constructor(raw) {
		if (raw.length < 76) {throw('MDL file too short!')}
		// I have to manipulate data within these coordinates. If it's too short, what the fuck am I even doing???
		this.parsed = new Uint8Array(raw)
	}
	
	setPath(pathStr) {
		function fixListLength(x,le) {return x.concat(new Array(le-x.length).fill(0))}
		
		let path = pathStr.toBytes()
		if (path.length > 64) {throw('Path too long! Model will be corrupted.')}
		if (path.length < 64) {path = fixListLength(path,64)}
		
		path.forEach((x,y)=>{
			this.parsed[y+12] = x // Model path starts at 0x0000000C (byte 12)
		})
	}
	
	getPath() {
		return (new TextDecoder().decode( this.parsed.slice(12,12+64) )).split('.mdl')[0]+'.mdl' // janky but it works
	}
	
	export() {
		return this.parsed
	}
}
