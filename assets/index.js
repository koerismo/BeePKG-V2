import { BeePackage } from "./BeePackage.class.js";

/*
	Index.js
*/

function q(x,p=document) { return p.querySelector(x) }

var pkg;
const btnDownload = q('#btn-download');

function removeAllChildren(el) {
	while (el.lastChild) { el.removeChild(el.lastChild) }
}

function setupPackage(json={}) {
	pkg = new BeePackage(json);

	// Run HTML setup, append generated html to container
	
	// This isn't necessary. Packages can't be loaded by file yet.
	// removeAllChildren(q('#pkg-container'));
	q('#pkg-container').appendChild(pkg.html());

	btnDownload.onclick = () => {
		btnDownload.disabled = true;
		btnDownload.innerText = 'Processing...';

		pkg.export().then((x)=>{

			btnDownload.innerText = 'Saving...';
			saveAs( x, `ucp_${pkg.idl}.bee_pack` );

			btnDownload.disabled = false;
			btnDownload.innerText = 'Download';

		}).catch((err)=>{
			
			btnDownload.disabled = false;
			btnDownload.innerText = 'Download';

			console.warn( 'An error occurred:\n\n', err );
			alert( 'An error occurred:\n\n' + err + '\n\nDumped to console.' );

		})
	}
}

function restoreSave() {
	const stored = localStorage.getItem('beepkg-autosave');
	try {
		if (stored != null)
			return JSON.parse(LZString.decompressFromUTF16(stored));
	}
	catch {
		console.warn( 'Your package could not be recovered successfully.', stored );
		alert('Your package could not be recovered successfully. Save dumped to console.');
	}
	return {}
}

function beginAutosaveLoop() {
	setInterval( ()=>{
		localStorage.setItem( 'beepkg-autosave', pkg.compress() )
	}, 1000*60 )
}

setupPackage(restoreSave())
beginAutosaveLoop()