export default (req, res) => {
  if (req.method === 'POST') {
    const { command } = req.body;
    const args = command.split(' ');
    switch (args[0].toLowerCase()) {
      case 'joincode':
      case 'joinfireteam':
      case '':
      default:
        res.status(400).json({ msg: "This command is not recognised." });
    }
  } else {
    res.status(405).json({ msg: "This route is only designed to accept post requests." });
  }
}
