import { Vtf, VtfImageResource, Frame } from "./vtflib/VtfContainer.js";

export class ComponentBase {
	constructor() {

		/* The name of the component. What component? who knows! */
		this.json = { name: 'My Component' };

		/* The innerHTML in string form. */
		this._template = '';

		/* The class used when creating the HTML element. */
		this._htmlTag = 'SECTION';

		/* This variable is set to mirror the value of .html() when run. */
		this._html = null;

		/* This should be a dictionary of element search terms and element oninput callbacks. */
		this._templateProperties = {};

		/* This acts like the above, but with onclick events. */
		this._templateClickActions = {};

		/* 
			Elements from the above may have a corrosponding key/value in the replacements var.
			The value is what the element's value is set to on creation.
		*/
		this._templateReplacements = {};
	}

	async readToText(file) {
		return new Promise((resolve,reject) => {
			const reader = new FileReader();
			reader.onload = () => { resolve(reader.result); }
			reader.onerror = (e) => { reject(e); }
			reader.readAsText(file);
		})
	}

	async readToBuffer(file) {
		return new Promise((resolve,reject) => {
			const reader = new FileReader();
			reader.onload = () => { resolve(reader.result); }
			reader.onerror = (e) => { reject(e); }
			reader.readAsArrayBuffer(file);
		})
	}

	async readToDataURL(file) {
		return new Promise((resolve,reject) => {
			const reader = new FileReader();
			reader.onload = () => { resolve(reader.result); }
			reader.onerror = (e) => { reject(e); }
			reader.readAsDataURL(file);
		})
	}

	async convertToVTF(file,vtfArgs={}) {
		return new Promise(async (resolve,reject) => {
			const url = await this.readToDataURL(file);
			const img = new Image();
			img.onload = () => {
				const res = new VtfImageResource([ new Frame(img) ]);
				const vtf = new Vtf( [256, 256], [res], 'DXT1', 1 );
				resolve( vtf.blob() );
			}
			img.onerror = (e) => { reject(e); }
			img.src = url;
		})
	}

	serialize() {
		let serialized = {...this.json};
		// Unfortunately, it's pretty difficult to serialize files. Doing this for now.
		if (serialized.files) { delete serialized.files; }
		return serialized;
	}

	/* For bee_pack files (editoritems and stuff) */
	get id() {
		// Converts names like "My Item" to "MY_ITEM"
		return this.json.name.trim().replaceAll('\x20','_').toUpperCase().match(/[A-Z0-9\_]/g).join('')
	}

	/* check BeePackage.class.js  it uses lowercase id for multiple things */
	// Same as above, but lowercase.
	get idl() {return this.id.toLowerCase(); }

	/* Link all template properties to their respective inputs */
	html() {
		const el = document.createElement(this._htmlTag);
		el.innerHTML = this._template;
		
		// Register oninput events and initial values
		Object.keys(this._templateProperties).forEach(key => {
			const inp = el.querySelector(`*[data-return="${key}"]`)

			if (this._templateReplacements[key] != undefined) {
				if (inp.type == 'checkbox') {		inp.checked = this._templateReplacements[key];		}
				else {								inp.value = this._templateReplacements[key];		}
			}

			inp.oninput = () => { this._templateProperties[key](inp) }
		})

		// Register click events
		Object.keys(this._templateClickActions).forEach(key => {
			const inp = el.querySelector(`*[data-click="${key}"]`)
			inp.onclick = () => { this._templateClickActions[key](inp) }
		})

		this._html = el;
		return el
	}

	export(appendToInfo, createFile) {
		appendToInfo(`\n// componentBase.export.sample`)
	}
}