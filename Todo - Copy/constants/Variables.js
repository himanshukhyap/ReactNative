export default {
	username:"",
	isuser:null,
	IsLive: false,

	ActiveRouteName: '',

	LiveApiBaseUrl: 'http://app.knparises.com/',

	LocalApiBaseUrl: 'http://192.168.1.3/arises/',

	WhatsAppNo: '9001719626',

	LoginUserId: 0,
	LoginUserType: 0,
	LocationTrackingAllowed: false,
	LastLocUpdateTime: undefined,
	LocUpdaterRunning: false,
	LastLatitude: 0,
	LastLongitude: 0,

	GatePassImageUrl: 'assets/uploads/gatepass/',
	NoGatePassAvailableUrl: 'assets/uploads/gatepass/unavailable_or_missing.png',
	NoImageAvailableUrl: 'assets/uploads/no_image_available.png',

	OfficeStartHours: 90000,	//8 hours, 00 min, 00 sec  //9 00 00
	OfficeEndHours: 200000,		//20 hours, 00 min, 00 sec //20 00 00

	ValidationErrorText: 'Please Resolve Errors',
	ValidationButtonText: 'Okay',
	ValidationToastDuration: 800,
	ValidationToastPosition: 'bottom',
	ValidationErrorClass: 'danger',

	DocumentTypes1: 'jpg,jpeg,png,doc,docx,xls,xlsx,pdf',
	DocumentTypes2: 'jpg,jpeg,png,doc,docx,xls,xlsx,pdf,ppt,pptx,pps,ppsx,txt,rtf',

	YesNoOptions: [
		{ text: 'Yes', value: '1' },
		{ text: 'No', value: '0' }
	],

	TransTypeOptions: [
		{ text: 'Inward', value: '1' },
		{ text: 'Outward', value: '2' }
	],

	NewUserTypeOptions: [
		Object({ id: 6, name: 'Marketing Manager' }),
		Object({ id: 3, name: 'Logistic Manager' }),
		Object({ id: 5, name: 'Warehouse Manager' })
	],

	OilUnit: [
		Object({ id: 1, name: 'KG' }),
		Object({ id: 2, name: 'LTR' })
	],

	ProductTypeOptions: [
		Object({ id: 1, name: 'Bio Diesel' }),
		Object({ id: 2, name: 'Used Cooking Oil' }),
		Object({ id: 3, name: 'Scrap' })
	],

	CollectionStatsOptions: [
		Object({ id: 1, name: 'By States' }),
		Object({ id: 2, name: 'By Cities' }),
		Object({ id: 3, name: 'By Vendors' })
	],

	LeadsTypeOptions: [
		Object({ id: -1, name: 'All Leads' }),
		Object({ id: 0, name: 'Direct Leads' })
	],

	LeadsCategoryOptions: [
		Object({ id: 1, name: 'Hot' }),
		Object({ id: 2, name: 'Intermediate' }),
		Object({ id: 3, name: 'Cold' })
	],

	RequestStatusOptions: [
		Object({ id: 0, name: 'All' }),
		Object({ id: 1, name: 'Pending' }),
		Object({ id: 2, name: 'In Process' }),
		Object({ id: 3, name: 'Completed' }),
		Object({ id: 4, name: 'Moved To Warehouse' }),
	],

	FollowupRemarksOptions: [
		Object({ id: 1, name: 'Not Interested' }),
		Object({ id: 2, name: 'Oil not in use' }),
		Object({ id: 3, name: '100% Consumed' }),
		Object({ id: 4, name: 'Interested, Require Followup' }),
		Object({ id: 5, name: 'Other' }),
	],
}