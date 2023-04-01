/**
 * Explore plugin.
 */
Draw.loadPlugin(function(ui)
{
	const ENUM_FIELD_TYPES = {
		STRING: 'string',
		NUMBER: 'number',
		BOOLEAN: 'boolean',
		ENUM: 'enum',
		RAW: 'raw', // Straight up raw typescript
		RESOURCE: 'resource', // Resource in diagram
		ARN: 'arn', // Already deployed resource
		CUSTOM: 'custom', // arrays, dictionaries, etc. 
	}

	const defineSchema = (types, defaultVal, required, validationCallback) => {
		if (defaultVal == undefined) {
			defaultVal = null
		}
		if (required == undefined || required == null) {
			required = false
		}
		if (types == undefined || types == null) {
			types = [ENUM_FIELD_TYPES.RAW]
		}
		if (!Array.isArray(types)) {
			types = [types]
		}
		if (validationCallback == undefined || validationCallback == null) {
			validationCallback = (value) => { return }
		}

		return	{
			default: defaultVal,
			required: required,
			validFormats: types,
			validationCallback: validationCallback
		}
	}

	const TypeString = (defaultVal = null) => {
		const validation = (value) => {
			if (typeof value !== 'string') {
				throw new Error('Value must be a string')
			}
		}

		return defineSchema(ENUM_FIELD_TYPES.STRING, defaultVal, false, validation)
	}

	const TypeEnum = (customDefinition = null) => {
		const validation = (value) => {
			for (const val in customDefinition) {
				if (value === customDefinition[val]) {
					return
				}
			}
			throw new Error('Not a valid enum value: ' + value)
		}
			
		return defineSchema(ENUM_FIELD_TYPES.ENUM, null, false, validation)
	}

	const TypeRaw = (defaultVal = null) => {
		return defineSchema(ENUM_FIELD_TYPES.RAW, defaultVal, false, null)
	}

	const ENUM_LAMBDA_RUNTIMES = {
		".Net 6": "cdk.aws_lambda.Runtime.DOTNET_6",
		"Go v1": "cdk.aws_lambda.Runtime.GO_1_X",
		"Java 11": "cdk.aws_lambda.Runtime.JAVA_11",
		"Java 8": "cdk.aws_lambda.Runtime.JAVA_8",
		"Java 8 Corretto": "cdk.aws_lambda.Runtime.JAVA_8_CORRETTO",
		"Node.js 14": "cdk.aws_lambda.Runtime.NODEJS_14_X",
		"Node.js 16": "cdk.aws_lambda.Runtime.NODEJS_16_X",
		"Node.js 18": "cdk.aws_lambda.Runtime.NODEJS_18_X",
	}


	const LAMBDA_PROPERTIES = {
		code: defineSchema(ENUM_FIELD_TYPES.RAW, 
			`cdk.aws_lambda.Code.fromInline('exports.handler = async (event) => {\\n' +
			'  console.log(JSON.stringify(event));\\n' +
			'  return event;\\n' +
			'};`, 
			false),
		handler: TypeString('index.handler'),
		runtime: TypeEnum(ENUM_LAMBDA_RUNTIMES),
		adotInstrumentation: TypeRaw(),
		allowAllOutbound: TypeRaw(),
		allowPublicSubnet: TypeRaw(),
		architecture: TypeRaw(),
		codeSigningConfig: TypeRaw(),
		currentVersionOptions: TypeRaw(),
		deadLetterQueue: TypeRaw(),
		deadLetterQueueEnabled: TypeRaw(),
		deadLetterTopic: TypeRaw(),
		description: TypeRaw(),
		environment: TypeRaw(),
		environmentEncryption: TypeRaw(),
		ephemeralStorageSize: TypeRaw(),
		events: TypeRaw(),
		fileSystem: TypeRaw(),
		functionName: TypeRaw(),
		initialPolicy: TypeRaw(),
		insightsVersion: TypeRaw(),
		layers: TypeRaw(),
		logRetention: TypeRaw(),
		logRetentionRetryOptions: TypeRaw(),
		logRetentionRole: TypeRaw(),
		maxEventAge: TypeRaw(),
		memorySize: TypeRaw(),
		onFailure: TypeRaw(),
		onSuccess: TypeRaw(),
		profiling: TypeRaw(),
		profilingGroup: TypeRaw(),
		reservedConcurrentExecutions: TypeRaw(),
		retryAttempts: TypeRaw(),
		role: TypeRaw(),
		runtimeManagementMode: TypeRaw(),
		securityGroups: TypeRaw(),
		timeout: TypeRaw(),
		tracing: TypeRaw(),
		vpc: TypeRaw(),
		vpcSubnets: TypeRaw(),
	}

	const DYNAMODB_PROPERTIES = {
		partitionKey: ENUM_FIELD_TYPES.RAW,
		billingMode: ENUM_FIELD_TYPES.RAW,
		contributorInsightsEnabled: ENUM_FIELD_TYPES.RAW,
		deletionProtection: ENUM_FIELD_TYPES.RAW,
		encryption: ENUM_FIELD_TYPES.RAW,
		encryptionKey: ENUM_FIELD_TYPES.RAW,
		kinesisStream: ENUM_FIELD_TYPES.RAW,
		pointInTimeRecovery: ENUM_FIELD_TYPES.RAW,
		readCapacity: ENUM_FIELD_TYPES.RAW,
		removalPolicy: ENUM_FIELD_TYPES.RAW,
		replicationRegions: ENUM_FIELD_TYPES.RAW,
		replicationTimeout: ENUM_FIELD_TYPES.RAW,
		serverSideEncryption: ENUM_FIELD_TYPES.RAW,
		sortKey: ENUM_FIELD_TYPES.RAW,
		stream: ENUM_FIELD_TYPES.RAW,
		tableClass: ENUM_FIELD_TYPES.RAW,
		tableName: ENUM_FIELD_TYPES.RAW,
		timeToLiveAttribute: ENUM_FIELD_TYPES.RAW,
		waitForReplicationToFinish: ENUM_FIELD_TYPES.RAW,
		writeCapacity: ENUM_FIELD_TYPES.RAW,
	}

	const S3_PROPERTIES = {
		accessControl: ENUM_FIELD_TYPES.RAW,
		autoDeleteObjects: ENUM_FIELD_TYPES.RAW,
		blockPublicAccess: ENUM_FIELD_TYPES.RAW,
		bucketKeyEnabled: ENUM_FIELD_TYPES.RAW,
		bucketName: ENUM_FIELD_TYPES.RAW,
		cors: ENUM_FIELD_TYPES.RAW,
		encryption: ENUM_FIELD_TYPES.RAW,
		encryptionKey: ENUM_FIELD_TYPES.RAW,
		enforceSSL: ENUM_FIELD_TYPES.RAW,
		eventBridgeEnabled: ENUM_FIELD_TYPES.RAW,
		intelligentTieringConfigurations: ENUM_FIELD_TYPES.RAW,
		inventories: ENUM_FIELD_TYPES.RAW,
		lifecycleRules: ENUM_FIELD_TYPES.RAW,
		metrics: ENUM_FIELD_TYPES.RAW,
		notificationsHandlerRole: ENUM_FIELD_TYPES.RAW,
		objectLockDefaultRetention: ENUM_FIELD_TYPES.RAW,
		objectLockEnabled: ENUM_FIELD_TYPES.RAW,
		objectOwnership: ENUM_FIELD_TYPES.RAW,
		publicReadAccess: ENUM_FIELD_TYPES.RAW,
		removalPolicy: ENUM_FIELD_TYPES.RAW,
		serverAccessLogsBucket: ENUM_FIELD_TYPES.RAW,
		serverAccessLogsPrefix: ENUM_FIELD_TYPES.RAW,
		transferAcceleration: ENUM_FIELD_TYPES.RAW,
		versioned: ENUM_FIELD_TYPES.RAW,
		websiteErrorDocument: ENUM_FIELD_TYPES.RAW,
		websiteIndexDocument: ENUM_FIELD_TYPES.RAW,
		websiteRedirect: ENUM_FIELD_TYPES.RAW,
		websiteRoutingRules: ENUM_FIELD_TYPES.RAW,
	}

	const REST_API_PROPERTIES = {
		apiKeySourceType: ENUM_FIELD_TYPES.RAW,
		binaryMediaTypes: ENUM_FIELD_TYPES.RAW,
		cloneForm: ENUM_FIELD_TYPES.RAW,
		cloudWatchRole: ENUM_FIELD_TYPES.RAW,
		defaultCorsPreflightOptions: ENUM_FIELD_TYPES.RAW,
		defaultIntegration: ENUM_FIELD_TYPES.RAW,
		defaultMethodOptions: ENUM_FIELD_TYPES.RAW,
		deploy: ENUM_FIELD_TYPES.RAW,
		deployOptions: ENUM_FIELD_TYPES.RAW,
		description: ENUM_FIELD_TYPES.RAW,
		disableExecuteApiEndpoint: ENUM_FIELD_TYPES.RAW,
		domainName: ENUM_FIELD_TYPES.RAW,
		endpointConfiguration: ENUM_FIELD_TYPES.RAW,
		endpointExportName: ENUM_FIELD_TYPES.RAW,
		endpointTypes: ENUM_FIELD_TYPES.RAW,
		failOnWarnings: ENUM_FIELD_TYPES.RAW,
		minCompressionSize: ENUM_FIELD_TYPES.RAW,
		parameters: ENUM_FIELD_TYPES.RAW,
		policy: ENUM_FIELD_TYPES.RAW,
		restApiName: ENUM_FIELD_TYPES.RAW,
		retainDeployments: ENUM_FIELD_TYPES.RAW,
	}

	const SQS_PROPERTIES = {
		contentBasedDeduplication: ENUM_FIELD_TYPES.RAW,
		dataKeyReuse: ENUM_FIELD_TYPES.RAW,
		deadLetterQueue: ENUM_FIELD_TYPES.RAW,
		deduplicationScope: ENUM_FIELD_TYPES.RAW,
		deliveryDelay: ENUM_FIELD_TYPES.RAW,
		encryption: ENUM_FIELD_TYPES.RAW,
		encryptionMasterKey: ENUM_FIELD_TYPES.RAW,
		enforceSSL: ENUM_FIELD_TYPES.RAW,
		fifo: ENUM_FIELD_TYPES.RAW,
		fifoThroughputLimit: ENUM_FIELD_TYPES.RAW,
		maxMessageSizeBytes: ENUM_FIELD_TYPES.RAW,
		queueName: ENUM_FIELD_TYPES.RAW,
		receiveMessageWaitTime: ENUM_FIELD_TYPES.RAW,
		removalPolicy: ENUM_FIELD_TYPES.RAW,
		retentionPeriod: ENUM_FIELD_TYPES.RAW,
		visibilityTimeout: ENUM_FIELD_TYPES.RAW,
	}

	const RESOURCES = {
		'mxgraph.aws4.key_management_service': {},

		'mxgraph.aws4.cognito': {},
		'mxgraph.aws4.identity_and_access_management': {},
		'mxgraph.aws4.kinesis': {},
		'mxgraph.aws4.sqs': {
			name: 'SQS',
			constructorProps: SQS_PROPERTIES,
		},
		'mxgraph.aws4.group_vpc': {},

		'mxgraph.aws4.api_gateway': {
			name: 'API Gateway',
			constructorProps: REST_API_PROPERTIES,
		},
		'mxgraph.aws4.mxgraph.aws4.elastic_load_balancing': {},
		'mxgraph.aws4.ecs': {},
		'mxgraph.aws4.cloudfront': {},
		'mxgraph.aws4.dynamodb': {
			name: 'DynamoDB',
			constructorProps: DYNAMODB_PROPERTIES,
		},
		'mxgraph.aws4.ec2': {},
		'mxgraph.aws4.auto_scaling2': {},
		'mxgraph.aws4.ec2_image_builder': {},
		'mxgraph.aws4.lambda': {
			name: 'Lambda',
			constructorProps: LAMBDA_PROPERTIES,
		},
		'mxgraph.aws4.route_53': {},
		'mxgraph.aws4.s3': {
			name: 'S3',
			constructorProps: S3_PROPERTIES,
		},
		'mxgraph.aws4.sns': {},
		'mxgraph.aws4.group_security_group': {},
	}


	var multiStringSplit = function(str, sep1, sep2) {	
		var ret = {};
		if (str == null) {
			return ret;
		}
		
		let strArr = str.split(sep1);
		for (let subStr of strArr) {
			if (!subStr.indexOf(sep2)) {
				continue
			}
			
			[key, val] = subStr.split(sep2);
			if (key == null || val == null) {
				continue;
			}
			ret[key.trim()] = val.trim();
		}
		return ret
	}

	var getStylenames = function(styles) {
		return multiStringSplit(styles, ";", "=")
	}

	var parseStringProps = function(props) {
		return multiStringSplit(props, ",", ":")
	}

	var getResourceInfo = function(cell)
	{
		if (cell == null || cell.style == null) {
			return null;
		}

		var styles = getStylenames(cell.style)
		if (styles['resIcon'] == null) {
			return null;
		}

		return RESOURCES[styles['resIcon']];
	}

	// Adds resource for action
	mxResources.parse('exploreFromHere=AWS Config');

	console.log("AWS Config plugin loaded")

	var uiCreatePopupMenu = ui.menus.createPopupMenu;
	ui.menus.createPopupMenu = function(menu, cell, evt)
	{
		uiCreatePopupMenu.apply(this, arguments);
		
		var graph = ui.editor.graph;
		
		if (!graph.model.isVertex(graph.getSelectionCell()) ||
			getResourceInfo(cell) == null) {
			return;
		}

		this.addMenuItems(menu, ['-', 'exploreFromHere'], null, evt);
	};

	/**
	 * Constructs a new metadata dialog.
	 */
	var EditAWSDataDialog = function(ui, cell)
	{
		var div = document.createElement('div');
		var graph = ui.editor.graph;
		
		var value = graph.getModel().getValue(cell);
		
		// Converts the value to an XML node
		if (!mxUtils.isNode(value))
		{
			var doc = mxUtils.createXmlDocument();
			var obj = doc.createElement('object');
			obj.setAttribute('label', value || '');
			value = obj;
		}
		
		var meta = {};
		try
		{
			var temp = mxUtils.getValue(ui.editor.graph.getCurrentCellStyle(cell), 'metaData', null);
			if (temp != null)
			{
				meta = JSON.parse(temp);
			}
		}
		catch (e)
		{
			// ignore
		}
		
		// Creates the dialog contents
		var form = new mxForm('properties');
		form.table.style.width = '100%';

		var attrs = value.attributes;
		var names = [];
		var texts = [];
		var schemas = [];
		var count = 0;

		var id = (EditAWSDataDialog.getDisplayIdForCell != null) ?
			EditAWSDataDialog.getDisplayIdForCell(ui, cell) : null;
		
		var addTextArea = function(index, name, schema)
		{
			const value = schema?.default || '';
			names[index] = name;
			texts[index] = form.addTextarea(names[count] + ':', value, 2);
			texts[index].style.width = '100%';
			schemas[index] = schema;
			
			if (value.indexOf('\n') > 0)
			{
				texts[index].setAttribute('rows', '2');
			}
			
			if (meta[name] != null && meta[name].editable == false)
			{
				texts[index].setAttribute('disabled', 'disabled');
			}
		};

		const data = getResourceInfo(cell)
		if (data == null) {
			throw new Error('Unknown resource type ' + type);
		}

		// Get props and fill with default values
		const props = parseStringProps(attrs['constructorProps']?.nodeValue);
		var uiFieldsSchema = [];
		console.log(props)
		for (let key in data.constructorProps) {
			if (!data.constructorProps.hasOwnProperty(key)) {
			  continue;
			}
			
			// TODO ASH Make a copy since this directly updates the schema
			const schema = data.constructorProps[key];

			// Check if there is a value for this property in the props
			for (let propKey in props) {
				if (propKey != key) {
					continue;
				}

				if (schema.validationCallback != null) {
					schema.validationCallback(props[propKey])
					schema.default = props[propKey]
				} else {
					schema.default = props[propKey]
				}
				break;
			}

			console.log(schema)
			uiFieldsSchema.push({name: key, value: schema});
		}
		
		// Sorts by name
		uiFieldsSchema.sort(function(a, b)
		{
			if (a.name < b.name)
			{
				return -1;
			}
			else if (a.name > b.name)
			{
				return 1;
			}
			else
			{
				return 0;
			}
		});

		if (id != null)
		{	
			var text = document.createElement('div');
			text.style.width = '100%';
			text.style.fontSize = '11px';
			text.style.textAlign = 'center';
			mxUtils.write(text, id);
			
			var idInput = form.addField(mxResources.get('id') + ':', text);
			
			mxEvent.addListener(text, 'dblclick', function(evt)
			{
				var dlg = new FilenameDialog(ui, id, mxResources.get('apply'), mxUtils.bind(this, function(value)
				{
					if (value != null && value.length > 0 && value != id)
					{
						if (graph.model.isRoot(cell))
						{
							var page = ui.getPageById(id);

							if (page != null)
							{
								if (ui.getPageById(value) == null)
								{
									var index = ui.getPageIndex(page);

									if (index >= 0)
									{
										ui.removePage(page);
										page.node.setAttribute('id', value);
										id = value;
										idInput.innerHTML = mxUtils.htmlEntities(value);
										ui.insertPage(page, index);
									}
								}
								else
								{
									ui.handleError({message: mxResources.get('alreadyExst', [mxResources.get('page')])});
								}
							}
						}
						else
						{
							if (graph.getModel().getCell(value) == null)
							{
								graph.getModel().cellRemoved(cell);
								cell.setId(value);
								id = value;
								idInput.innerHTML = mxUtils.htmlEntities(value);
								graph.getModel().cellAdded(cell);
							}
							else
							{
								ui.handleError({message: mxResources.get('alreadyExst', [value])});
							}
						}
					}
				}), mxResources.get('id'), null, null, null, null, null, null, 200);
				ui.showDialog(dlg.container, 300, 80, true, true);
				dlg.init();
			});
		}
		
		for (var i = 0; i < uiFieldsSchema.length; i++)
		{
			addTextArea(count, uiFieldsSchema[i].name, uiFieldsSchema[i].value);
			count++;
		}
		
		var top = document.createElement('div');
		top.style.position = 'absolute';
		top.style.top = '30px';
		top.style.left = '30px';
		top.style.right = '30px';
		top.style.bottom = '80px';
		top.style.overflowY = 'auto';
		
		top.appendChild(form.table);

		var newProp = document.createElement('div');
		newProp.style.display = 'flex';
		newProp.style.alignItems = 'center';
		newProp.style.boxSizing = 'border-box';
		newProp.style.paddingRight = '160px';
		newProp.style.whiteSpace = 'nowrap';
		newProp.style.marginTop = '6px';
		newProp.style.width = '100%';
		
		var nameInput = document.createElement('input');
		nameInput.setAttribute('placeholder', mxResources.get('enterPropertyName'));
		nameInput.setAttribute('type', 'text');
		nameInput.setAttribute('size', (mxClient.IS_IE || mxClient.IS_IE11) ? '36' : '40');
		nameInput.style.boxSizing = 'border-box';
		nameInput.style.borderWidth = '1px';
		nameInput.style.borderStyle = 'solid';
		nameInput.style.marginLeft = '2px';
		nameInput.style.padding = '4px';
		nameInput.style.width = '100%';
		
		//newProp.appendChild(nameInput);
		top.appendChild(newProp);
		div.appendChild(top);

		
		this.init = function()
		{
			if (texts.length > 0)
			{
				texts[0].focus();
			}
			else
			{
				nameInput.focus();
			}
		};

		var cancelBtn = mxUtils.button(mxResources.get('cancel'), function()
		{
			ui.hideDialog.apply(ui, arguments);
		});
		
		cancelBtn.setAttribute('title', 'Escape');
		cancelBtn.className = 'geBtn';

		var exportBtn = mxUtils.button(mxResources.get('export'), mxUtils.bind(this, function(evt)
		{
			var result = graph.getDataForCells([cell]);

			var dlg = new EmbedDialog(ui, JSON.stringify(result, null, 2), null, null, function()
			{
				console.log(result);
				ui.alert('Written to Console (Dev Tools)');
			}, mxResources.get('export'), null, 'Console', 'data.json');
			ui.showDialog(dlg.container, 450, 240, true, true);
			dlg.init();
		}));
		
		exportBtn.setAttribute('title', mxResources.get('export'));
		exportBtn.className = 'geBtn';
		
		// Save
		var applyBtn = mxUtils.button(mxResources.get('apply'), function()
		{
			try
			{
				ui.hideDialog.apply(ui, arguments);
				
				// Clones and updates the value
				let newProps = '';
				let errors = [];
				for (var i = 0; i < names.length; i++)
				{
					if (texts[i] == null || 
						texts[i].value == null || 
						texts[i].value.trim() == '')
					{
						continue;
					}

					try {
						schemas[i].validationCallback(texts[i].value)
					}
					catch (e) {
						console.error(schemas[i])
						errors.push(e);
					}

					newProps += names[i] + ':' + texts[i].value + ',\n';
				}

				if (errors.length > 0) {
					throw errors.join('\n');
				}
				
				value.setAttribute("constructorProps", newProps);
				
				// Updates the value of the cell (undoable)
				graph.getModel().setValue(cell, value);
			}
			catch (e)
			{
				mxUtils.alert(e);
			}
		});

		applyBtn.setAttribute('title', 'Ctrl+Enter');
		applyBtn.className = 'geBtn gePrimaryBtn';

		mxEvent.addListener(div, 'keypress', function(e)
		{
			if (e.keyCode == 13 && mxEvent.isControlDown(e))
			{
				applyBtn.click();
			}
		});
		
		var buttons = document.createElement('div');
		buttons.style.cssText = 'position:absolute;left:30px;right:30px;text-align:right;bottom:30px;height:40px;'
		
		if (ui.editor.graph.getModel().isVertex(cell) || ui.editor.graph.getModel().isEdge(cell))
		{
			var replace = document.createElement('span');
			replace.style.marginRight = '10px';
			var input = document.createElement('input');
			input.setAttribute('type', 'checkbox');
			input.style.marginRight = '6px';
			
			if (value.getAttribute('placeholders') == '1')
			{
				input.setAttribute('checked', 'checked');
				input.defaultChecked = true;
			}
		
			mxEvent.addListener(input, 'click', function()
			{
				if (value.getAttribute('placeholders') == '1')
				{
					value.removeAttribute('placeholders');
				}
				else
				{
					value.setAttribute('placeholders', '1');
				}
			});
			
			replace.appendChild(input);
			mxUtils.write(replace, mxResources.get('placeholders'));
			
			if (EditAWSDataDialog.placeholderHelpLink != null)
			{
				var link = document.createElement('a');
				link.setAttribute('href', EditAWSDataDialog.placeholderHelpLink);
				link.setAttribute('title', mxResources.get('help'));
				link.setAttribute('target', '_blank');
				link.style.marginLeft = '8px';
				link.style.cursor = 'help';
				
				var icon = document.createElement('img');
				mxUtils.setOpacity(icon, 50);
				icon.style.height = '16px';
				icon.style.width = '16px';
				icon.setAttribute('border', '0');
				icon.setAttribute('valign', 'middle');
				icon.style.marginTop = (mxClient.IS_IE11) ? '0px' : '-4px';
				icon.setAttribute('src', Editor.helpImage);
				link.appendChild(icon);
				
				replace.appendChild(link);
			}
			
			buttons.appendChild(replace);
		}
		
		if (ui.editor.cancelFirst)
		{
			buttons.appendChild(cancelBtn);
		}
		
		buttons.appendChild(exportBtn);
		buttons.appendChild(applyBtn);

		if (!ui.editor.cancelFirst)
		{
			buttons.appendChild(cancelBtn);
		}

		div.appendChild(buttons);
		this.container = div;
	};

	//
	// Main function
	//
	function exploreFromHere(selectionCell)
	{
		var dlg = new EditAWSDataDialog(ui, selectionCell);
		ui.showDialog(dlg.container, 480, 420, true, false, null, false);
		dlg.init();
	};
	
	// Adds action
	ui.actions.addAction('exploreFromHere', function()
	{
		exploreFromHere(ui.editor.graph.getSelectionCell());
	});
	
	// Click handler for chromeless mode
	if (ui.editor.isChromelessView())
	{
		ui.editor.graph.click = function(me)
		{
			if (ui.editor.graph.model.isVertex(me.getCell()) &&
				ui.editor.graph.model.getEdgeCount(me.getCell()) > 0 &&
				this.getLinkForCell(me.getCell()) == null)
			{
				exploreFromHere(me.getCell());
			}
		};
	}
});




const dropDownMenu = () => {
	/**
	 * Adds the label menu items to the given menu and parent.
	 */
	StyleFormatPanel.prototype.addEditOps = function(div)
	{
		var ss = this.editorUi.getSelectionState();

		if (ss.cells.length == 1)
		{
			var editSelect = document.createElement('select');
			editSelect.style.width = '210px';
			editSelect.style.textAlign = 'center';
			editSelect.style.marginBottom = '2px';
			
			var ops = ['edit', 'editLink', 'editShape', 'editImage', 'editData',
				'copyData', 'pasteData', 'editConnectionPoints', 'editGeometry',
				'editTooltip', 'editStyle'];
			
			for (var i = 0; i < ops.length; i++)
			{
				var action = this.editorUi.actions.get(ops[i]);

				if (action == null || action.enabled)
				{
					var editOption = document.createElement('option');
					editOption.setAttribute('value', ops[i]);
					var title = mxResources.get(ops[i]);
					mxUtils.write(editOption, title + ((ops[i] == 'edit') ? '' : '...'));

					if (action != null && action.shortcut != null)
					{
						title += ' (' + action.shortcut + ')';
					}

					editOption.setAttribute('title', title);
					editSelect.appendChild(editOption);
				}
			}

			if (editSelect.children.length > 1)
			{
				div.appendChild(editSelect);

				mxEvent.addListener(editSelect, 'change', mxUtils.bind(this, function(evt)
				{
					var action = this.editorUi.actions.get(editSelect.value);
					editSelect.value = 'edit';

					if (action != null)
					{
						action.funct();
					}
				}));
				
				if (ss.image && ss.cells.length > 0)
				{
					var graph = this.editorUi.editor.graph;
					var state = graph.view.getState(graph.getSelectionCell());

					if (state != null && mxUtils.getValue(state.style, mxConstants.STYLE_IMAGE, null) != null)
					{
						var btn = mxUtils.button(mxResources.get('crop') + '...',
							mxUtils.bind(this, function(evt)
						{
							this.editorUi.actions.get('crop').funct();
						}));

						btn.setAttribute('title', mxResources.get('crop'));
						editSelect.style.width = '104px';
						btn.style.width = '104px';
						btn.style.marginLeft = '2px';
						btn.style.marginBottom = '2px';

						div.appendChild(btn);
					}
				}
			}
		}

		return div;
	};
}