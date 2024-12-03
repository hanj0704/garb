var CPR_DEFAULTS = {
	controls: {
		accordion: {},
		audio: {},
		button: {},
		calendar: {
			headerButtons: ["prev", "title", "next"],
			footerVisible: false
		},
		checkbox: {},
		checkboxgroup: {
			colCount: -1,
			fixedWidth: "false",
			horizontalSpacing: 16,
			verticalSpacing: 8
		},
		combobox: {},
		linkedcombobox: {
		},
		container: {
			clipContent: true
		},
		dateinput: {
			showClearButton: false,
			headerButtons: ["prev", "title", "next"],
			footerVisible: false
		},
		dialog: {},
		embeddedapp: {},
		embeddedpage: {},
		fileinput: {
			showClearButton: false
		},
		fileupload: {
		},
		grid: {
			autoFit: "all",
			clickMode: "edit",
			collapsible: true,
			columnMovable: true,
			enabledCellAutoWidth: true,
			filterDialogButtons: ["cancel", "okay"],
			noDataMessage: "조회된 데이터가 없습니다",
			resizableColumns: "all",
			viewingMode: "button"
		},
		htmlobject: {},
		htmlsnippet: {},
		image: {},
		inputbox: {
			showClearButton: false
		},
		listbox: {},
		linkedlistbox: {
		},
		maskeditor: {
			showClearButton: false
		},
		mdifolder: {
		},
		menu: {},
		navigationbar: {},
		numbereditor: {
			showClearButton: false,
			spinButton: false
		},
		notifier: {
		},
		output: {},
		pageindexer: {
			pageIndexWidth: "40px",
			visibleFirstButton: false,
			visibleLastButton: false,
			viewPageCount: 10
		},
		progress: {},
		radiobutton: {
			colCount: -1,
			fixedWidth: "false",
			horizontalSpacing: 16,
			verticalSpacing: 8
		},
		searchinput: {
			hideClearButton: true
		},
		sidenavigation: {
			indent: 0,
			selectionHighlightType: "independent"
		},
		slider: {},
		tabfolder: {
			childCombinatorClass: "tab",
			headerArrowPosition: "right",
			headerArrowVisible: "hide",
			itemSizing: "auto",
			itemSpacing: 30,
			useItemTextEllipsis: true
		},
		textarea: {},
		tree: {
			indent: 32,
			showLines: true
		},
		treecell: {
			indent: 32,
			showLines: true
		},
		uicontrolshell: {},
		video: {},
		customscroll: {}
	},
	layouts: {
		xylayout: {
			scrollable: true
		},
		responsivexylayout: {
			scrollable: true
		},
		formlayout: {
			scrollable: false,
			topMargin: "0px",
			rightMargin: "0px",
			bottomMargin: "0px",
			leftMargin: "0px",
			horizontalSpacing: "8px",
			verticalSpacing: "4px"
		},
		verticallayout: {
			spacing: 16,
			scrollable: true
		},
		flowlayout: {
			scrollable: true,
			verticalAlign: "middle",
			horizontalSpacing: 8,
			verticalSpacing: 4
		}
	},
	environment: {
		preferNativeScroll: true,
		uuidGenMethod: "insecure"
	}
}