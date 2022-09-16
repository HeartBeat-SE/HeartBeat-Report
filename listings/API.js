app.get("/", (req, res) => { 
	res.send("This is an API between users and AED locations") 
})

app.get('/users', (req, res) => { 
    let dto = []
    for(user of userModel.getAllUsers()){
        let userDto = convertToUserDto(user)
        dto.push(userDto)
    }

    res.json(dto)
})

app.post("/users", (req, res) => { 
	try {
		userModel.registerNewUser(req.body.userId, req.body.name, req.body.city) 
		res.json(userModel.getUserById(req.body.userId))
	} catch (error){
		res.status(400).json({ error });
	}	
})

app.get('/locations', (req, res) => {
    res.json(locations)
})

app.get('/locations/:id/users', (req, res) => {
    let dto = userModel
        .getAllUsers() 
        .filter(u => u.locations.includes(req.params.id)) 
        .map(convertToUserDto)
    res.json(dto)
})