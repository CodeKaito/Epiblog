const badRequestHandler = (req, res, err, next) => {
	if (err.status === 400) {
		res.status(400).send({
			success: false,
			message: err.message,
			errorList: err.errorList ? err.errorList.map((e) => e.msg) : []
		});
	} else {
		next(err);
	}
};

const unauthorizedHandler = (req, res, err, next) => {
	if (err.status === 401) {
		res.status(401).send({
			success: false,
			message: err.message,
			errorList: err.errorList ? err.errorList.map((e) => e.msg) : []
		});
	} else {
		next(err);
	}
};

const notFoundHandler = (req, res, err, next) => {
	if (err.status === 404) {
		res.status(404).send({
			success: false,
			message: err.message,
			errorList: err.errorList ? err.errorList.map((e) => e.msg) : []
		});
	} else {
		next(err);
	}
};

const genericErrorHandler = (req, res, err, next) => {
	if (err.status === 500) {
		res.status(500).send({
			success: false,
			message: "There's a problem with the server. Please try again later.",
			errorList: err.errorList ? err.errorList.map((e) => e.msg) : []
		});
	} else {
		next(err);
	}
};

module.exports = { badRequestHandler, unauthorizedHandler, notFoundHandler, genericErrorHandler };
