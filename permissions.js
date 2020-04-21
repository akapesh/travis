let roles = {
	admin: {
		homepage: "/user/adminhome",
		actions: [
			"can create sales executive",
			"can view both sales list & customer list",
		],
	},
	sales: {
		homepage: "/user/staffhome",
		actions: [
			"can create customer",
			"can view both sales list & customer list",
		],
	},
};
module.exports = roles;
