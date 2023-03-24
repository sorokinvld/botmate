'use strict';

module.exports = {
	/**
	 * An asynchronous register function that runs before
	 * your application is initialized.
	 *
	 * This gives you an opportunity to extend code.
	 */
	register({ botmate }) {},

	/**
	 * An asynchronous bootstrap function that runs before
	 * your application gets started.
	 *
	 * This gives you an opportunity to set up your data model,
	 * run jobs, or perform some special logic.
	 */
	bootstrap({ botmate }) {},

	/**
	 * An asynchrronous destroy function that runs before
	 * your application gets shut down.
	 *
	 * This gives you an opportunity to gracefully stop services you run.
	 */
	destroy({ botmate }) {},
};
