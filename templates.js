const editoritems_template = `
"Item"
{
	"ItemClass"	"ItemBase"
	"Type"	"{ITEM_ID}"
	"Editor"
	{
		"SubType"
		{
			"Name"				"{ITEM_NAME}"
			"Model" { "ModelName"		"{ITEM_MODEL}" }
			"Palette"
			{
				"Tooltip"		"{ITEM_NAME}"
				"Image"			"palette/beepkg/{ITEM_ID}.png"
				"Position"		"4 2 0"
			}
			"Sounds"
			{
			"SOUND_CREATED"			"P2Editor.PlaceOther"
			"SOUND_EDITING_ACTIVATE"	"P2Editor.ExpandOther"
			"SOUND_EDITING_DEACTIVATE"	"P2Editor.CollapseOther"
			"SOUND_DELETED"			"P2Editor.RemoveOther"
			}
			"Animations"
			{
				"ANIM_IDLE"			"0"
				"ANIM_EDITING_ACTIVATE"		"1"
				"ANIM_EDITING_DEACTIVATE"	"2"
			}
		}
		"MovementHandle"	"{ITEM_HANDLE}"
		"InvalidSurface" 	"{ITEM_PLACEMENT}"
		"DesiredFacing"		"DESIRES_ANYTHING"
		"CanAnchorOnGoo"	"0"
		"CanAnchorOnBarriers"	"0"
	}
	"Properties"
	{
		"ConnectionCount"
		{
			"DefaultValue"	"0"
			"Index"	"1"
		}
	}

	"Exporting"
	{
		"Inputs"
		{
{ITEM_INPUTS}
		}
		"Outputs"
		{
{ITEM_OUTPUTS}
		}

		"Instances"
		{
			"0"
			{
				"Name" "instances/BEE2/beepkg/{ITEM_ID}.vmf"
				"EntityCount"	"4"
				"BrushCount"	"4" 
				"BrushSideCount"	"24"
			}
		}

{ITEM_EMBED}

		"ConnectionPoints"
		{
			// left
			"Point"
			{
				"Dir"				"1 0 0"
				"Pos"				"-1 3 0"
				"SignageOffset"		"-2 2 0"
				"Priority"  "0"
			}
			"Point"
			{
				"Dir"				"1 0 0"
				"Pos"				"-1 4 0"
				"SignageOffset"		"-2 5 0"
				"Priority"  "0"
			}

			// right
			"Point"
			{
				"Dir"				"-1 0 0"
				"Pos"				"8 3 0"
				"SignageOffset"		"9 2 0"
				"Priority"  "0"
			}
			"Point"
			{
				"Dir"				"-1 0 0"
				"Pos"				"8 4 0"
				"SignageOffset"		"9 5 0"
				"Priority"  "0"
			}

			// up
			"Point"
			{
				"Dir"				"0 1 0"
				"Pos"				"3 -1 0"
				"SignageOffset"		"2 -2 0"
				"Priority"  "0"
			}
			"Point"
			{
				"Dir"				"0 1 0"
				"Pos"				"4 -1 0"
				"SignageOffset"		"5 -2 0"
				"Priority"  "0"
			}

			// down
			"Point"
			{
				"Dir"				"0 -1 0"
				"Pos"				"3 8 0"
				"SignageOffset"		"2 9 0"
				"Priority"  "0"
			}
			"Point"
			{
				"Dir"				"0 -1 0"
				"Pos"				"4 8 0"
				"SignageOffset"		"5 9 0"
				"Priority"  "0"
			}
		}
		"TargetName"	"name"
		"Offset"	"64 64 64"
	}
}
`

const editoritems_embedded_voxel_template = `
		"OccupiedVoxels"
		{
			"Voxel"
			{
				"Pos"		"0 0 0"
				"Surface"
				{
					"Normal"	"0 0 1"
				}
			}
		}
		"EmbeddedVoxels"
		{
			"Voxel"
			{
				"Pos"		"0 0 0"
			}
		}
`

const editoritems_plain_voxel_template = '' //Adding OccupiedVoxels makes the item take up the entire surface no matter what placement handle is used.
/*`
		"OccupiedVoxels"
		{
			"Voxel"
			{
				"Pos"		"0 0 0"
			}
		}
`*/

const properties_template = `
"Properties" {
	"Authors" "{PKG_AUTHOR}"
	"Description" "{ITEM_DESC}"
	"Icon"
	{
		"0" "beepkg/{ITEM_ID}.png"
	}
}
`

const info_item_template = `
"Item"
{
	"ID"  "{ITEM_ID}"
	"Version"
	{
		"Styles"
		{
			"BEE2_CLEAN" "{ITEM_ID}"
		}
	}
}
`

const item_template = `
  <header onclick="collapse(this)">Toggle Collapse</header>

  <hr>

  <input oninput="updateItemHeader(this)" class="pkg-input item-name" placeholder="Item Name"><br>
  <input class="pkg-input item-desc" placeholder="Item Description"><br>

  <hr>

  <label>Item Handle</label>
  <select class="pkg-input item-handle">
    <option value="HANDLE_NONE">No Handle</option>
    <option value="HANDLE_4_DIRECTIONS">4 Directions</option>
    <option value="HANDLE_36_DIRECTIONS">36 Directions</option>
    <option value="HANDLE_6_POSITIONS">6 Positions</option>
    <option value="HANDLE_8_POSITIONS">8 Positions</option>
  </select><br>
  <label>Editor Model</label>
  <select class="pkg-input item-model">
    <optgroup label="——— Generic ———">
      <option value="sentry.3ds">Turret</option>
      <option value="light_strip.3ds">Light Strip</option>
    </optgroup>
    <optgroup label="——— Cubes ———">
      <option value="cube.3ds">Cube (Normal)</option>
      <option value="cubecompanion.3ds">Cube (Companion)</option>
      <option value="cubelaser.3ds">Cube (Redirection)</option>
      <option value="cubesphere.3ds">Cube (Edgeless)</option>
    </optgroup>
    <optgroup label="——— Buttons ———">
      <option value="buttonweight.3ds">Floor Button (Weighted)</option>
      <option value="buttoncube.3ds">Floor Button (Cube)</option>
      <option value="buttonball.3ds">Floor Button (Sphere)</option>
    </optgroup>
    <optgroup label="——— Custom ———">
      <option value="custom">Custom (Beta)</option>
    </optgroup>
  </select><br>

  <label>Custom Model</label><input class="item-model-custom" type="file" hidden><br>
  <label>Embed Voxel</label><input type="checkbox" class="item-embed"><br>

  <label>Allow Placement On</label>
  <section class="item-placement">
    <label>Floor</label><input checked class="item-floor" type="checkbox">
    <label>Walls</label><input checked class="item-walls" type="checkbox">
    <label>Ceiling</label><input checked class="item-ceil" type="checkbox">
  </section>
  <hr>

  <label>Item Icon (png)</label>
  <input class="pkg-input item-icon-png" type="file"><br>
  <label>Item Instance</label>
  <input class="pkg-input item-inst" type="file">

  <hr>

  <button onclick="addInput(this)">Add Input</button>
  <section class="item-inputs"></section>
  <button onclick="addOutput(this)">Add Output</button>
  <section class="item-outputs"></section>

  <hr>

  <button class="item-delete" onclick="this.parentElement.parentElement.removeChild(this.parentElement)">Delete Item</button>
`
