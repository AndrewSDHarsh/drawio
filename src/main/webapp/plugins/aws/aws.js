/**
 * Explore plugin.
 */
Draw.loadPlugin(function(ui)
{
	const ENUM_RESOURCE_TYPES = {
		LAMBDA: 'lambda',
		DYNAMO: 'dynamo',
		API: 'api',
		S3: 's3',
		SQS: 'sqs',
	}
	
	const ENUM_FIELD_TYPES = {
		STRING: 'string',
		NUMBER: 'number',
		BOOLEAN: 'boolean',
		RAW: 'raw',
		RESOURCE: 'resource',
	}

	const LAMBDA_PROPERTIES = {
		code: ENUM_FIELD_TYPES.RAW,
		handler: ENUM_FIELD_TYPES.RAW,
		runtime: ENUM_FIELD_TYPES.RAW,
		adotInstrumentation: ENUM_FIELD_TYPES.RAW,
		allowAllOutbound: ENUM_FIELD_TYPES.RAW,
		allowPublicSubnet: ENUM_FIELD_TYPES.RAW,
		architecture: ENUM_FIELD_TYPES.RAW,
		codeSigningConfig: ENUM_FIELD_TYPES.RAW,
		currentVersionOptions: ENUM_FIELD_TYPES.RAW,
		deadLetterQueue: ENUM_FIELD_TYPES.RAW,
		deadLetterQueueEnabled: ENUM_FIELD_TYPES.RAW,
		deadLetterTopic: ENUM_FIELD_TYPES.RAW,
		description: ENUM_FIELD_TYPES.RAW,
		environment: ENUM_FIELD_TYPES.RAW,
		environmentEncryption: ENUM_FIELD_TYPES.RAW,
		ephemeralStorageSize: ENUM_FIELD_TYPES.RAW,
		events: ENUM_FIELD_TYPES.RAW,
		fileSystem: ENUM_FIELD_TYPES.RAW,
		functionName: ENUM_FIELD_TYPES.RAW,
		initialPolicy: ENUM_FIELD_TYPES.RAW,
		insightsVersion: ENUM_FIELD_TYPES.RAW,
		layers: ENUM_FIELD_TYPES.RAW,
		logRetention: ENUM_FIELD_TYPES.RAW,
		logRetentionRetryOptions: ENUM_FIELD_TYPES.RAW,
		logRetentionRole: ENUM_FIELD_TYPES.RAW,
		maxEventAge: ENUM_FIELD_TYPES.RAW,
		memorySize: ENUM_FIELD_TYPES.RAW,
		onFailure: ENUM_FIELD_TYPES.RAW,
		onSuccess: ENUM_FIELD_TYPES.RAW,
		profiling: ENUM_FIELD_TYPES.RAW,
		profilingGroup: ENUM_FIELD_TYPES.RAW,
		reservedConcurrentExecutions: ENUM_FIELD_TYPES.RAW,
		retryAttempts: ENUM_FIELD_TYPES.RAW,
		role: ENUM_FIELD_TYPES.RAW,
		runtimeManagementMode: ENUM_FIELD_TYPES.RAW,
		securityGroups: ENUM_FIELD_TYPES.RAW,
		timeout: ENUM_FIELD_TYPES.RAW,
		tracing: ENUM_FIELD_TYPES.RAW,
		vpc: ENUM_FIELD_TYPES.RAW,
		vpcSubnets: ENUM_FIELD_TYPES.RAW,
	}

	const DYNAMO_PROPERTIES = {
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

	var getResourceType = function(cell)
	{
		if (cell == null || cell.style == null) {
			return null;
		}

		console.log(mxUtils.getCurrentStyle())
		
		console.log(cell.style)
		var styles = getStylenames(cell.style)
		console.log(styles)
		switch (styles['resIcon']) {
			case 'mxgraph.aws4.lambda':
				return ENUM_RESOURCE_TYPES.LAMBDA;
			case 'mxgraph.aws4.dynamodb':
				return ENUM_RESOURCE_TYPES.DYNAMO;
			case 'mxgraph.aws4.s3':
				return ENUM_RESOURCE_TYPES.S3;
			case 'mxgraph.aws4.sqs':
				return ENUM_RESOURCE_TYPES.SQS;
			case 'mxgraph.aws4.api_gateway':
				return ENUM_RESOURCE_TYPES.API;
			default:
				return null;
		}
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
			getResourceType(cell) == null) {
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
		var count = 0;

		var id = (EditAWSDataDialog.getDisplayIdForCell != null) ?
			EditAWSDataDialog.getDisplayIdForCell(ui, cell) : null;
		
		var addRemoveButton = function(text, name)
		{
			var wrapper = document.createElement('div');
			wrapper.style.position = 'relative';
			wrapper.style.paddingRight = '20px';
			wrapper.style.boxSizing = 'border-box';
			wrapper.style.width = '100%';
			
			var removeAttr = document.createElement('a');
			var img = mxUtils.createImage(Dialog.prototype.closeImage);
			img.style.height = '9px';
			img.style.fontSize = '9px';
			img.style.marginBottom = (mxClient.IS_IE11) ? '-1px' : '5px';
			
			removeAttr.className = 'geButton';
			removeAttr.setAttribute('title', mxResources.get('delete'));
			removeAttr.style.position = 'absolute';
			removeAttr.style.top = '4px';
			removeAttr.style.right = '0px';
			removeAttr.style.margin = '0px';
			removeAttr.style.width = '9px';
			removeAttr.style.height = '9px';
			removeAttr.style.cursor = 'pointer';
			removeAttr.appendChild(img);
			
			var removeAttrFn = (function(name)
			{
				return function()
				{
					var count = 0;
					
					for (var j = 0; j < names.length; j++)
					{
						if (names[j] == name)
						{
							texts[j] = null;
							form.table.deleteRow(count + ((id != null) ? 1 : 0));
							
							break;
						}
						
						if (texts[j] != null)
						{
							count++;
						}
					}
				};
			})(name);
			
			mxEvent.addListener(removeAttr, 'click', removeAttrFn);
			
			var parent = text.parentNode;
			wrapper.appendChild(text);
			wrapper.appendChild(removeAttr);
			parent.appendChild(wrapper);
		};
		
		var addTextArea = function(index, name, value)
		{
			names[index] = name;
			texts[index] = form.addTextarea(names[count] + ':', value, 2);
			texts[index].style.width = '100%';
			
			if (value.indexOf('\n') > 0)
			{
				texts[index].setAttribute('rows', '2');
			}
			
			//addRemoveButton(texts[index], name);
			
			if (meta[name] != null && meta[name].editable == false)
			{
				texts[index].setAttribute('disabled', 'disabled');
			}
		};

		var temp = [];
		const type = getResourceType(cell)
		console.log(type)
		if (type == null) {
		}

		let data = null;
		switch (type) {
			case ENUM_RESOURCE_TYPES.LAMBDA:
				data = LAMBDA_PROPERTIES;
				break;
			case ENUM_RESOURCE_TYPES.DYNAMO:
				data = DYNAMO_PROPERTIES;
				break;
			case ENUM_RESOURCE_TYPES.S3:
				data = S3_PROPERTIES;
				break;
			case ENUM_RESOURCE_TYPES.API:
				data = REST_API_PROPERTIES;
				break;
			case ENUM_RESOURCE_TYPES.SQS:
				data = SQS_PROPERTIES;
				break;
			default:
				throw new Error('Unknown resource type ' + type);
		}

		console.log(data)
		const props = parseStringProps(attrs['props']?.nodeValue);
		console.log(props)
		console.log('------------------')
		for (let key in data) {
			if (!data.hasOwnProperty(key)) {
			  continue;
			}

			let val = "";
			for (let propKey in props) {
				if (propKey == key) {
					val = props[propKey];
					break;
				}
			}
			temp.push({name: key, value: val});
		}
		
		// Sorts by name
		temp.sort(function(a, b)
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
		
		for (var i = 0; i < temp.length; i++)
		{
			addTextArea(count, temp[i].name, temp[i].value);
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

		var addProperty = function (property)
		{
			let name = property;

			// Avoid ':' in attribute names which seems to be valid in Chrome
			if (name.length > 0 && name != 'label' && name != 'placeholders' && name.indexOf(':') < 0)
			{
				try
				{
					var idx = mxUtils.indexOf(names, name);
					
					if (idx >= 0 && texts[idx] != null)
					{
						texts[idx].focus();
					}
					else
					{
						// Checks if the name is valid
						var clone = value.cloneNode(false);
						clone.setAttribute(name, '');
						
						if (idx >= 0)
						{
							names.splice(idx, 1);
							texts.splice(idx, 1);
						}

						names.push(name);
						var text = form.addTextarea(name + ':', '', 2);
						text.style.width = '100%';
						texts.push(text);
						addRemoveButton(text, name);

						text.focus();
					}

					//addBtn.setAttribute('disabled', 'disabled');
					nameInput.value = '';
				}
				catch (e)
				{
					mxUtils.alert(e);
				}
			}
			else
			{
				mxUtils.alert(mxResources.get('invalidName'));
			}
		}
		
		// var addBtn = mxUtils.button(mxResources.get('addProperty'), function()
		// {
		// 	addProperty(nameInput.value)
		// });

		// mxEvent.addListener(nameInput, 'keypress', function(e)
		// {
		// 	if (e.keyCode == 13 )
		// 	{
		// 		addBtn.click();
		// 	}
		// });
		
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
		
		// addBtn.setAttribute('title', mxResources.get('addProperty'));
		// addBtn.setAttribute('disabled', 'disabled');
		// addBtn.style.textOverflow = 'ellipsis';
		// addBtn.style.position = 'absolute';
		// addBtn.style.overflow = 'hidden';
		// addBtn.style.width = '144px';
		// addBtn.style.right = '0px';
		// addBtn.className = 'geBtn';
		// newProp.appendChild(addBtn);

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
				for (var i = 0; i < names.length; i++)
				{
					if (texts[i] == null || 
						texts[i].value == null || 
						texts[i].value.trim() == '')
					{
						continue;
					}
					newProps += names[i] + ':' + texts[i].value + ',\n';
				}
				
				console.log(newProps);
				value.setAttribute("props", newProps);
				
				// Updates the value of the cell (undoable)
				console.log(value)
				console.log(cell)
				graph.getModel().setValue(cell, value);
				console.log(cell)
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
		
		// function updateAddBtn()
		// {
		// 	if (nameInput.value.length > 0)
		// 	{
		// 		addBtn.removeAttribute('disabled');
		// 	}
		// 	else
		// 	{
		// 		addBtn.setAttribute('disabled', 'disabled');
		// 	}
		// };

		// mxEvent.addListener(nameInput, 'keyup', updateAddBtn);
		
		// // Catches all changes that don't fire a keyup (such as paste via mouse)
		// mxEvent.addListener(nameInput, 'change', updateAddBtn);
		
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
