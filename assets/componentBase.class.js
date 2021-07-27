class ComponentBase {
	constructor() {
		this.json = { name: 'My Component' };

		/* The innerHTML in string form. */
		this._template = '';

		/* The class used when creating the HTML element. */
		this._htmlTag = 'SECTION';

		/* This should be a dictionary of element search terms and element oninput callbacks. */
		this._templateProperties = {};

		/* 
			Elements from the above must have a corrosponding key/value in the replacements var.
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
			const img = new Image()
			img.onload = () => {
				const vtf = new VTF([img],0,'RGBA8888',vtfArgs);
				resolve( vtf.export() );
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

	get id() {
		// Converts names like "My Item" to "MY_ITEM"
		return this.json.name.replaceAll('\x20','_').toUpperCase().match(/[A-Z0-9\_]/g).join('')
	}

	// Same as above, but lowercase.
	get idl() {return this.id.toLowerCase(); }

	/* Link all template properties to their respective inputs */
	html() {
		const el = document.createElement(this._htmlTag);
		el.innerHTML = this._template;
		Object.keys(this._templateProperties).forEach(key => {
			const inp = el.querySelector(`*[data-return="${key}"]`)

			if (inp.type == 'checkbox') {		inp.checked = this._templateReplacements[key];		}
			else {								inp.value = this._templateReplacements[key];		}

			inp.oninput = () => { this._templateProperties[key](inp) }
		})
		return el
	}

	export(appendToInfo, createFile) {
		appendToInfo(`\n\n// This text will be appended to the info.txt file!`)
	}
}