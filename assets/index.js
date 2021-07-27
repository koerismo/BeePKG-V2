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
	if (pkg.json.items.filter(x => {return x.json.files.icon.width > 1000 || x.json.files.icon.height > 1000}).length) {
		if (!confirm('Warning!\nAn uploaded image is abnormally large. This may cause extended processing times and possibly crash the window. To continue, press OK.')) { return; }
	}
	btnDownload.disabled = true;
	btnDownload.innerText = 'Processing...';
	pkg.export().then((x)=>{
		saveAs(x, "New_Package.bee_pack");
		btnDownload.disabled = false;
		btnDownload.innerText = 'Download';
	})
}