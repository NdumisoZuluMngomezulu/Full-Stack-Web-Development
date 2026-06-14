const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const {name, email, password, role} = req.body;
    try {
        let user = await UserActivation.findOne({ email });
        if (user) return res.status(400).json({ msg: 'User already exists'});

        user = new User({ name, email, password, role});
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        const payload = { id: user.id, role : user.role};
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d'});
        res.json({ token, user: { id: user, name: user.name, role}});
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try{
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({msg: 'Invalid credentials'});

        const payload = { id: user.id, role: user.role};
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d'});

    } catch (err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
}
