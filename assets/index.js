import { BeePackage } from "./BeePackage.class.js";

/*
	Index.js
*/

function q(x,p=document) { return p.querySelector(x) }

/* The below is the file in question. */
var pkg;
/* The below is the variable declaring whether or not it is a zip or a bee_pack */
var zipType = "zip";
/* The below is for downloading the file */
const btnDownload = q('#btn-download');
/* The below is for saving the project for future purposes */
const btnSave = q('#button-save');
/* The below is the button to toggle between zip and bee_pack */
const btnZipTypeToggle = q('#button-zip-type-toggle');

/* if ever find ye an explanation of the following, please inform me. -IMyself*/
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
			if (zipType == "zip") {

				saveAs(x, `ucp_${pkg.idl}.zip`);
			}
			else if (zipType == "bee")
			{
				saveAs(x, `ucp_${pkg.idl}.bee_pack`);
			};

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

var needsSave = true;

btnSave.onclick = function() {
	if (!needsSave) { return }
	this.classList.remove('needs-save');
	btnSave.innerText = 'Changes Saved';
	localStorage.setItem( 'beepkg-autosave', pkg.compress() );
	needsSave = false;
}

btnZipTypeToggle.onclick = function ()
{
	if (zipType == "zip") {
		zipType = "bee";
		btnZipTypeToggle.innerHTML = "to .zip"
	}
	else if (zipType == "bee") {
		zipType = "zip";
		btnZipTypeToggle.innerHTML = "to .bee_pack"
	};
}

function beginAutosaveLoop() {

	q('#pkg-container').addEventListener('input',()=>{
		btnSave.classList.add('needs-save');
		btnSave.innerText = 'Save Now';
		needsSave = true;
	})

	setInterval( ()=>{
		if (!needsSave) { return }
		btnSave.classList.remove('needs-save');
		btnSave.innerText = 'Changes Saved';
		localStorage.setItem( 'beepkg-autosave', pkg.compress() )
		needsSave = false;
	}, 1000*30 )
}

setupPackage(restoreSave())
beginAutosaveLoop()
