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
				"Model" { "ModelName"		"turret.3ds" }
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
				...
				}
			}
		}
		"MovementHandle"	"{ITEM_HANDLE}"
		"InvalidSurface" 	"WALL FLOOR CEILING"
		"DesiredFacing"		"DESIRES_ANYTHING"
		"CanAnchorOnGoo"	"0"
		"CanAnchorOnBarriers"	"0"
	}
	"Properties"{}
	"Inputs"
	{
{ITEM_INPUTS}
	}
	"Outputs"
	{
{ITEM_OUTPUTS}
	}

	"Exporting"
	{
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
	"TargetName"	"name"
	"Offset"	"64 64 64"
	}
}
`

const properties_template = `
"Properties" {
	"Authors" ""
	"Description" "{ITEM_DESC}"
	"Icon" "beepkg/{ITEM_ID}.png"
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
  <hr>
  <label>Item Icon VTF</label>
  <input class="pkg-input item-icon-vtf" type="file"><br>
  <label>Item Icon PNG</label>
  <input class="pkg-input item-icon-png" type="file"><br>
  <label>Item Instance</label>
  <input class="pkg-input item-inst" type="file"><br>
  <label>Item Handle</label>
  <select class="pkg-input item-handle">
    <option value="HANDLE_NONE">No Handle</option>
    <option value="HANDLE_4_DIRECTIONS">4 Directions</option>
    <option value="HANDLE_36_DIRECTIONS">36 Directions</option>
    <option value="HANDLE_6_POSITIONS">6 Positions</option>
    <option value="HANDLE_8_POSITIONS">8 Positions</option>
  </select>
  <hr>
  <button onclick="addInput(this)">Add Input</button>
  <section class="item-inputs"></section>
  <button onclick="addOutput(this)">Add Output</button>
  <section class="item-outputs"></section>
  <hr>
  <button onclick="this.parentElement.parentElement.removeChild(this.parentElement)">Delete Item</button>
`
