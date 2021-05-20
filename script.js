const File = require('./models/file');
const fs = require('fs');
const connectDB = require('./config/db');
connectDB();
async function deleteData() {
	// fetch file from database older than 24 hrs ago
	const pastDate = new Date(Date.now() - 1000 * 60 * 60 * 24); // 24 hrs before date
	const files = File.find({ createdAt: { $lt: pastDate } }); // all files recived
	if (files.length) {
		for (const file of files) {
			try {
				fs.unlinkSync(file.path);
				await file.remove();
				console.log(`sucessfully delete Data ${file.filename}`);
			} catch (err) {
				console.log('Error ocuur in deleting file  ' + err);
			}
		}
		console.log('Job Done ..... ');
	} else {
		console.log('Nothing to delete');
	}
}
deleteData().then(process.exit());
