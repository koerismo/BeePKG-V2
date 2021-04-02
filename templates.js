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
			"Model" { "ModelName"		"sentry.3ds" }
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
		"InvalidSurface" 	"" //"WALL FLOOR CEILING"
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
		"EmbeddedVoxels"
		{
			"Voxel"
			{
				"Pos"		"0 0 0"
			}
		}
		"EmbedFace"
		{
			"Solid"
			{
				"Center"        "64 64 128"
				"Dimensions"    "128 128 4"
				"Grid"          "Grid_Default"
			}
		}
`

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
  <input class="pkg-input item-name" placeholder="Item Name"><br>
  <input class="pkg-input item-desc" placeholder="Item Description"><br>
  <label>Item Handle</label>
  <select class="pkg-input item-handle">
    <option value="HANDLE_NONE">No Handle</option>
    <option value="HANDLE_4_DIRECTIONS">4 Directions</option>
    <option value="HANDLE_36_DIRECTIONS">36 Directions</option>
    <option value="HANDLE_6_POSITIONS">6 Positions</option>
    <option value="HANDLE_8_POSITIONS">8 Positions</option>
  </select><br>
  <label>Embed Voxel</label><input type="checkbox" class="item-embed">
  <hr>
  <label>Item Icon VTF</label>
  <input class="pkg-input item-icon-vtf" type="file"><br>
  <label>Item Icon PNG</label>
  <input class="pkg-input item-icon-png" type="file"><br>
  <label>Item Instance</label>
  <input class="pkg-input item-inst" type="file">
  <hr>
  <button onclick="addInput(this)">Add Input</button>
  <section class="item-inputs"></section>
  <button onclick="addOutput(this)">Add Output</button>
  <section class="item-outputs"></section>
  <hr>
  <button onclick="this.parentElement.parentElement.removeChild(this.parentElement)">Delete Item</button>
`
