/*
	Index.js
*/

function q(x,p=document) { return p.querySelector(x) }

// Create package object
var pkg = new BeePackage();
q('#pkg-container').appendChild(pkg.html());

function addItem() {
	let el = new BeeItem();
	pkg.json.items.push( el );
	q('#section-items').appendChild( el.html() );
}

const btnDownload = q('#btn-download')

function tryGenerate() {
	btnDownload.disabled = true;
	pkg.export().then((x)=>{
		saveAs(x, "New_Package.bee_pack");
		btnDownload.disabled = false;
	})
}