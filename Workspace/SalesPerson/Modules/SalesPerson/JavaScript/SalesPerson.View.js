// @module JJ.SalesPerson.SalesPerson
define('JJ.SalesPerson.SalesPerson.View'
	, [
		'jj_salesperson_salesperson.tpl'
		, 'Backbone'
	]
	, function (
		jj_salesperson_salesperson_tpl
		, Backbone
	) {
		'use strict';

		return Backbone.View.extend({

			template: jj_salesperson_salesperson_tpl

			, initialize: function (options) {
				// Receive the model that was already fetched in the EntryPoint
				this.model = options.model;
			}

			, getContext: function getContext() {
				return {
					showRepresentative: this.model && this.model.get('assigned'),
					name: this.model.get('name'),
					title: this.model.get('title'),
					comments: this.model.get('comments'),
					email: this.model.get('email'),
					phone: this.model.get('phone'),
					image: this.model.get('image'),
					meetingLink: this.model.get('meeting_link')
				};
			}
		});
	});
