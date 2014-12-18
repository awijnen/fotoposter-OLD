if (Papers.find().count() === 0) {
	var papers = ['SG201', 'GL201', 'MA101', 'FA101', 'FS601', 'FT502', 'FT504', 'CM501', 'CS501', 'AV701', 'PB201', 'BF101'];
	var insertPaper = function(element, index, array) {
		var paper = {
			name: element,
			description: "Dit is een hoogwaardig papier type.",
			example_img_url: '/public/images/example.png'
		};
		Papers.insert(paper);
	};

	papers.forEach(insertPaper);
}

if (Finishes.find().count() === 0) {
	var finishes = ['Dibond', 'DiLite', 'MDF', 'Forex Zwart 3mm', 'Forex Zwart 5mm', 'Forex Wit 3mm', 'Forex Wit 5mm', 'Houten Frame 1,5cm', 'Houten Frame 4cm'];
	var insertFinish = function(element, index, array) {
		var finish = {
			name: element,
			description: "Dit is een hoogwaardig afwerkings type.",
			example_img_url: '/public/images/example.png'
		};
		Finishes.insert(finish);
	};

	finishes.forEach(insertFinish);
}

if (Suspensions.find().count() === 0) {
	var suspensions = ['Geen Ophanging', 'Aluminium Frame', 'Groeven'];
	var insertSuspension = function(element, index, array) {
		var suspension = {
			name: element,
			description: "Dit is een soort ophanging.",
			example_img_url: '/public/images/example.png'
		};
		Suspensions.insert(suspension);
	};

	suspensions.forEach(insertSuspension);
}

if (Orders.find().count() === 0) {
	// Get current time
	var now = new Date().getTime();

	// Create three users
	var anthonyId = Meteor.users.insert({
		profile: {name: 'Anthony Wijnen'}
	});
	var anthony = Meteor.users.findOne(anthonyId);

	var kristofId = Meteor.users.insert({
		profile: {name: 'Kristof Wijnen'}
	});
	var kristof = Meteor.users.findOne(kristofId);

	var erikId = Meteor.users.insert({
		profile: {name: 'Erik Wijnen'}
	});
	var erik = Meteor.users.findOne(erikId);


	// Create a couple stub orders
	var order1 = Orders.insert({
		userId: anthony._id,
		remark: "Dit is een order dat nog in de 'cart' zit omdat het status 'cart' heeft.",
		status: 'cart',
		submitted: new Date(now - 10 * 3600 * 1000),
		price: 100,
		isPaid: false,
		processingStarted: false
	}, function(err, res) {

		var SG201 = Papers.findOne({name: 'SG201'});
		var GL201 = Papers.findOne({name: 'GL201'});
		var MA101 = Papers.findOne({name: 'MA101'});

		var Dibond = Finishes.findOne({name: 'Dibond'});
		var DiLite = Finishes.findOne({name: 'DiLite'});
		var MDF = Finishes.findOne({name: 'MDF'});

		var geen_ophanging = Suspensions.findOne({name: 'Geen Ophanging'});
		var alu_frame = Suspensions.findOne({name: 'Aluminium Frame'});
		var groeven = Suspensions.findOne({name: 'Groeven'});

		var order_item1 = OrderItems.insert({
			userId: anthony._id,
			orderId: res,
			paperId: SG201._id,
			finishId: Dibond._id,
			suspensionId: groeven._id,
			laminate: true,
			width: 40,
			height: 60,
			quantity: 1,
			image: '/my_image.png',
			image_fpp: '/my_image_fpp.png',
			remark: "Dit is een order item dat bij een bepaalde order hoort.",
			submitted: new Date(now - 10 * 3600 * 1000)
		});

		var order_item2 = OrderItems.insert({
			userId: anthony._id,
			orderId: res,
			paperId: GL201._id,
			finishId: DiLite._id,
			suspensionId: geen_ophanging._id,
			laminate: false,
			width: 40,
			height: 60,
			quantity: 1,
			image: '/my_image.png',
			image_fpp: '/my_image_fpp.png',
			remark: "Dit is een order item dat bij een bepaalde order hoort.",
			submitted: new Date(now - 10 * 3600 * 1000 + 1)
		});


		var order_item3 = OrderItems.insert({
			userId: anthony._id,
			orderId: res,
			paperId: MA101._id,
			finishId: MDF._id,
			suspensionId: alu_frame._id,
			laminate: true,
			width: 40,
			height: 60,
			quantity: 1,
			image: '/my_image.png',
			image_fpp: '/my_image_fpp.png',
			remark: "Dit is een order item dat bij een bepaalde order hoort.",
			submitted: new Date(now - 10 * 3600 * 1000 + 1)
		});
	});

	Orders.insert({
		userId: anthony._id,
		remark: "Kan je er aub voor zorgen dat de kleuren er goed uitkomen?",
		status: 'submitted',
		submitted: new Date(now - 7 * 3600 *1000),
		price: 100,
		isPaid: false,
		processingStarted: false
	});

	Orders.insert({
		userId: kristof._id,
		remark: "U mag gerust mijn foto versnijden zodanig dat het formaat juist uitkomt.",
		status: 'submitted',
		submitted: new Date(now - 5 * 3600 *1000),
		price: 100,
		isPaid: false,
		processingStarted: false
	});

	Orders.insert({
		userId: erik._id,
		remark: "U mag alle prints vanachter in het tuinhok achterlaten. Ik kom ze daar wel halen.",
		status: 'submitted',
		submitted: new Date(now - 3 * 3600 *1000),
		price: 100,
		isPaid: false,
		processingStarted: false
	});
}