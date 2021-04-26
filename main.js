const items = document.getElementById('section-items')

function q(x, y=document) {
	return y.querySelector(x)
}

const els = {
	items: q('#section-items')
}

function collapse() {
	this.parentElement.classList.toggle('active')
}

function updateItemHeader() {
	q('header',this.parentElement).innerText = 'Toggle Collapse — '+this.value
}

function updateCustomMdlVis() {
	q('.item-model-custom',this.parentElement).disabled = (this.value != 'custom')
}

function handlePlacement(x) {
	return (q('.item-floor',x).checked?'':'FLOOR ')+
	 (q('.item-walls',x).checked?'':'WALL')+
	 (q('.item-ceil',x).checked?'':' CEILING')
}


async function handleModelUpload(inputObj,itemName,outputObj) {
	/* Takes a file object and uploads all model data. */
	function fileExtension(x) {return x.slice(x.indexOf('.'))} //Cuts off the very beginning of the filename ( .b.c from a.b.c )
	return await new Promise((pass,fail)=>{
	
		
		let fileNames = Array.from(inputObj.files).map((x)=>{
			let s = x.name.split('.')
			return s[s.length-1]
		})

		if (!fileNames.includes('mdl') ||
		    !fileNames.includes('vtx') ||
		    !fileNames.includes('vvd')) {
			fail('Model files missing! MDL, VTX, VVD, DX90.VTX required.')
		}
		

		let MdlFile = Array.from(inputObj.files).filter((x)=>{return x.name.endsWith('.mdl')})[0]
		let NonMdlFiles = Array.from(inputObj.files).filter((x)=>{return !x.name.endsWith('.mdl')})
		
		if (MdlFile === undefined) {fail('No mdl file attached. This should never happen!')}

		let fReader = new FileReader()

		fReader.onload = async function() {
			let MDL = new mdl_model(fReader.result)

			let MdlName = MDL.getPath().split('/')
			MdlName = MdlName[MdlName.length-1]
			
			MDL.setPath(`props_map_editor/props_beepkg/${itemName}.mdl`)
			
			// Save files
			for (let fInd = 0; fInd < NonMdlFiles.length; fInd++) {
				if (NonMdlFiles[fInd].name.endsWith('.3ds'))
					await outputObj.file(`resources/models/puzzlemaker/selection_props_beepkg/${itemName}.3ds`,readImage(NonMdlFiles[fInd])) 
				else
					await outputObj.file(`resources/models/props_map_editor/props_beepkg/${itemName}${fileExtension(NonMdlFiles[fInd].name)}`,readImage(NonMdlFiles[fInd]))
				// readImage uses arrayBuffer, so it'll work.
			}
			await outputObj.file(`resources/models/props_map_editor/props_beepkg/${itemName}.mdl`,MDL.export())
			
			// End
			pass()
		}
		fReader.readAsArrayBuffer(MdlFile)
	
	})
}

async function readText(x) {
	return await new Promise((pass,fail)=>{
		let freader = new FileReader()
		freader.onload = function(e){pass(freader.result)}
		freader.readAsText(x)
	})
}

async function readImage(x) {
	return await new Promise((pass,fail)=>{
		let freader = new FileReader()
		freader.onload = function(e){pass(freader.result)}
		freader.readAsArrayBuffer(x)
	})
}

async function pngToVtf(x) {
	return await new Promise((pass,fail)=>{
		let freader = new FileReader()
		freader.onload = async function(e){
			let out = await createVTF(freader.result)
			pass(out)
		}
		freader.readAsDataURL(x)
	})
}

function addItem() {
	let tmp = document.createElement('SECTION')
	tmp.classList.add('item')
	tmp.classList.add('active')
	tmp.innerHTML = item_template
	items.appendChild(tmp)
}

const placeholders = {
	'io-input': '',
	'io-output': ''
}

function addInput(x) {
	let tmp = document.createElement('SECTION')
	tmp.innerHTML = `
<label>Input Type</label>
<select class="input-type">
	<option value="AND">And</option>
	<option value="OR">Or</option>
</select><br>
<label>Enable Command</label> <input class="input-enable"	placeholder="mylight,TurnOn,,0,-1"><br>
<label>Disable Command</label><input class="input-disable" placeholder="mylight,TurnOff,,0,-1">
<hr>
<button onclick="this.parentElement.parentElement.removeChild(this.parentElement)">Delete Input</button>`
	q('.item-inputs',x.parentElement).appendChild(tmp)
}

function addOutput(x) {
	let tmp = document.createElement('SECTION')
	tmp.innerHTML = `
<label>Enable Command</label> <input class="output-enable"	placeholder="instance:relay_enable;onTrigger"><br>
<label>Disable Command</label><input class="output-disable" placeholder="instance:relay_disable;onTrigger">
<hr>
<button onclick="this.parentElement.parentElement.removeChild(this.parentElement)">Delete Output</button>`
	q('.item-outputs',x.parentElement).appendChild(tmp)
}


function doInputs(x) {
	let inputs = Array.from(q('.item-inputs',x).children)
	let out = ''
	for (let y = 0; y < inputs.length; y++) {
		out += `
			"BEE2"
			{
				"Type"	"${q('.input-type',x).value}"
				"Enable_cmd" "${q('.input-enable',inputs[y]).value}"
				"Disable_cmd" "${q('.input-disable',inputs[y]).value}"
			}`
	}
	return out
}

function doOutputs(x) {
	let outputs = Array.from(q('.item-outputs',x).children)
	let out = ''
	for (let y = 0; y < outputs.length; y++) {
		out += `
			"BEE2"
			{
				"out_activate" "${q('.output-enable',outputs[y]).value}"
				"out_deactivate" "${q('.output-disable',outputs[y]).value}"
			}`
	}
	return out
}

function nameToId(x) {
	return 'ITEM_'+x.toLowerCase().split('').filter((x)=>{return 'abcdefghijklmnopqrstuvwxyz 0123456789_'.includes(x)}).join('').toUpperCase().replaceAll(' ','_')
}

async function generate() {
	var zip = new JSZip()
	let pkgprops = {
		'name': q('#pkg-name').value,
		'desc': q('#pkg-desc').value,
		'id': nameToId(q('#pkg-name').value),
		'author': q('#pkg-author').value
	}
	// INFO.TXT BASICS
	let info = `
// Created with BEE2PKG V2
"ID" "${pkgprops.id}"
"Name" "${pkgprops.name}"
"Description" "${pkgprops.desc}"
`
	// GEN ITEMS
	async function doItem(x){
		let itemprops = {
			'name': q('.item-name',x).value,
			'desc': q('.item-desc',x).value,
			'id': nameToId(q('.item-name',x).value),
			
			'handle': q('.item-handle',x).value,
			'model': q('.item-model',x).value,
			'model_custom': q('.item-model-custom',x).files,
			'embed':	q('.item-embed',x).checked,
			'placement': handlePlacement(q('.item-placement',x)),
			
			'inst': q('.item-inst',x),
			'icon_png': q('.item-icon-png',x)
		}
		
		if (itemprops.model === 'custom') {
			itemprops.model = `props_beepkg/${itemprops.name}.3ds`
		}
		
		// APPEND TO INFO.TXT
		info += info_item_template.replaceAll('{ITEM_ID}',itemprops.id)
		// GEN PROPERTIES.TXT
		let propsfile = properties_template
			.replaceAll('{ITEM_NAME}',itemprops.name)
			.replaceAll('{ITEM_ID}',itemprops.id)
			.replaceAll('{ITEM_DESC}',itemprops.desc)
			.replaceAll('{PKG_AUTHOR}',pkgprops.author)
		// GEN EDITORITEMS.TXT
		let editoritems = editoritems_template
			.replaceAll('{ITEM_NAME}',itemprops.name)
			.replaceAll('{ITEM_ID}',itemprops.id)
			.replaceAll('{ITEM_DESC}',itemprops.desc)
			.replace('{ITEM_INPUTS}',doInputs(x))
			.replace('{ITEM_OUTPUTS}',doOutputs(x))
			.replace('{ITEM_HANDLE}',itemprops.handle)
			.replace('{ITEM_MODEL}',itemprops.model)
			.replace('{ITEM_PLACEMENT}',itemprops.placement)
			.replace('{ITEM_EMBED}',itemprops.embed?editoritems_embedded_voxel_template:editoritems_plain_voxel_template) // template if true, nothing if not
		
		
		
		await zip.file(`items/${itemprops.id}/properties.txt`,propsfile)
		await zip.file(`items/${itemprops.id}/editoritems.txt`,editoritems)
		
		// VTF
		let vtf_read = await pngToVtf(itemprops.icon_png.files[0])
		await zip.file(`resources/materials/models/props_map_editor/palette/beepkg/${itemprops.id}.vtf`,vtf_read)
		
		// PNG
		let png_read = await readImage(itemprops.icon_png.files[0])
		await zip.file(`resources/BEE2/items/beepkg/${itemprops.id.toLowerCase()}.png`,png_read)
		
		// VMF
		let inst_read = await readText(itemprops.inst.files[0])
		await zip.file(`resources/instances/beepkg/${itemprops.id}.vmf`,inst_read)
		
		// MODELS
		await handleModelUpload(itemprops.model_custom,itemprops.name,zip)

	}
	
	let item_els = Array.from(q('#section-items').children)
	
	// haha fuck you forced sync
	for (let E = 0; E < item_els.length; E++) {
		await doItem(item_els[E])
	}
	
	await zip.file(`info.txt`,info)
	// SAVE
	zip.generateAsync({type:"blob"})
		.then((x)=>{
	saveAs(x, "New_Package.bee_pack");
	});
	console.log('Package compilation finished.')
}

async function tryGenerate() {
	try {
		await generate()
	}
	catch(e)
	{
		console.warn(e)
		alert('An error has occurred!\n'+e)
	}
}
