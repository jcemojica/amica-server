/*
1. If Amica database is existing in your MongoDB, do the ff:
	use Amica
	db.dropDatabase()

2. Run server. Stop server. Makecreate ng kusa ang Amica database

3. Populate data. 
*/

//POPULATOR FOR USER
db.users.insertMany([
	{
		email: "abcd@up.edu.ph",
		password: "abcd",
		name: "John Doe",
		about: "Professional Photographer",
		isSearchable: true,
		canAcceptRequest: true
	},
	{
		email: "efgh@up.edu.ph",
		password: "efgh",
		name: "Johnny Doe",
		about: "Professional Cartographer",
		isSearchable: true,
		canAcceptRequest: true
	},
	{
		email: "ijkl@up.edu.ph",
		password: "ijkl",
		name: "Johnathan Doe",
		about: "Professional Videographer",
		isSearchable: true,
		canAcceptRequest: true
	},
	{
		email: "mnop@up.edu.ph",
		password: "mnop",
		name: "John Doenut",
		about: "Professional Wrestler",
		isSearchable: true,
		canAcceptRequest: true
	},
	{
		email: "qrst@up.edu.ph",
		password: "qrst",
		name: "John Doenut Touch",
		about: "Professional Choreographer",
		isSearchable: true,
		canAcceptRequest: true
	}
]);
