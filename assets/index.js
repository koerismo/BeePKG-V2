import { BeePackage } from "./BeePackage.class.js";

/*
	Index.js
*/

function q(x,p=document) { return p.querySelector(x) }

// Create package object
var pkg = new BeePackage();
// Make public ( for development only!! )
window.pkg = pkg;

// Run HTML setup, append generated html to container
q('#pkg-container').appendChild(pkg.html());

const btnDownload = q('#btn-download')

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

		console.warn( 'An error occurred:\n\n' + err );
		alert( 'An error occurred:\n\n' + err );

	})
}

